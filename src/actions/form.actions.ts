"use server";

import { revalidatePath } from "next/cache";
import { requirePermission } from "@/lib/auth/session";
import { formService } from "@/services/form.service";
import { createFormSchema, updateFormSchema } from "@/lib/validations/forms";
import { parseSearchParams, type ActionState } from "@/lib/cms";

export async function getForms(searchParams: Record<string, string | string[] | undefined>) {
  await requirePermission("forms.view");
  return formService.findPaginated(parseSearchParams(searchParams));
}

export async function getFormById(id: string) {
  await requirePermission("forms.view");
  return formService.findById(id);
}

export async function createForm(data: unknown): Promise<ActionState & { id?: string }> {
  const session = await requirePermission("forms.create");
  const parsed = createFormSchema.safeParse(data);
  if (!parsed.success) return { error: parsed.error.errors[0]?.message ?? "Invalid form structure" };
  const slug = await formService.generateUniqueSlug(parsed.data.title);
  const doc = await formService.create({
    ...parsed.data,
    slug: parsed.data.slug || slug,
    createdBy: session.user.id,
    updatedBy: session.user.id,
  } as never);

  revalidatePath("/admin/forms");
  return { success: "Form created successfully", id: doc._id.toString() };
}

export async function updateForm(data: unknown): Promise<ActionState> {
  const session = await requirePermission("forms.update");
  const parsed = updateFormSchema.safeParse(data);
  if (!parsed.success) return { error: parsed.error.errors[0]?.message ?? "Invalid form structure" };
  const { id, ...updateData } = parsed.data;
  await formService.update(id, { ...updateData, updatedBy: session.user.id } as never);
  revalidatePath("/admin/forms");
  return { success: "Form updated successfully" };
}

export async function publishForm(id: string): Promise<ActionState> {
  const session = await requirePermission("forms.update");
  await formService.publish(id, session.user.id);
  revalidatePath("/admin/forms");
  return { success: "Form published" };
}

export async function deleteForm(id: string): Promise<ActionState> {
  const session = await requirePermission("forms.delete");
  await formService.softDelete(id, session.user.id);
  revalidatePath("/admin/forms");
  return { success: "Form deleted" };
}

export async function getFormSubmissions(formId: string, page = 1) {
  await requirePermission("forms.submissions");
  return formService.getSubmissions(formId, page);
}
