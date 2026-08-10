"use server";

import { revalidatePath } from "next/cache";
import { requirePermission } from "@/lib/auth/session";
import { newsService } from "@/services/news.service";
import { createNewsSchema, updateNewsSchema } from "@/lib/validations/news";
import { parseSearchParams, type ActionState } from "@/lib/cms";

export async function getNews(searchParams: Record<string, string | string[] | undefined>) {
  await requirePermission("news.view");
  const params = parseSearchParams(searchParams);
  const category = typeof searchParams.category === "string" ? searchParams.category : undefined;
  const extraFilter: Record<string, unknown> = {};
  if (category) extraFilter.category = category;
  return newsService.findPaginated(params, extraFilter);
}

export async function getNewsById(id: string) {
  await requirePermission("news.view");
  return newsService.findById(id);
}

export async function createNews(data: unknown): Promise<ActionState & { id?: string }> {
  const session = await requirePermission("news.create");
  const parsed = createNewsSchema.safeParse(data);
  if (!parsed.success) return { error: parsed.error.errors[0]?.message ?? "Invalid data" };

  const slug = await newsService.generateUniqueSlug(parsed.data.title);
  const news = await newsService.create({
    ...parsed.data,
    slug: parsed.data.slug || slug,
    publishedAt: parsed.data.status === "published" ? new Date() : undefined,
    createdBy: session.user.id,
    updatedBy: session.user.id,
  } as never);

  revalidatePath("/admin/news");
  revalidatePath("/news");
  return { success: "News created", id: news._id.toString() };
}

export async function updateNews(data: unknown): Promise<ActionState> {
  const session = await requirePermission("news.update");
  const parsed = updateNewsSchema.safeParse(data);
  if (!parsed.success) return { error: parsed.error.errors[0]?.message ?? "Invalid data" };

  const { id, ...updateData } = parsed.data;
  await newsService.update(id, { ...updateData, updatedBy: session.user.id } as never);
  revalidatePath("/admin/news");
  revalidatePath("/news");
  return { success: "News updated" };
}

export async function publishNews(id: string): Promise<ActionState> {
  const session = await requirePermission("news.publish");
  await newsService.publish(id, session.user.id);
  revalidatePath("/admin/news");
  revalidatePath("/news");
  return { success: "News published" };
}

export async function unpublishNews(id: string): Promise<ActionState> {
  const session = await requirePermission("news.publish");
  await newsService.unpublish(id, session.user.id);
  revalidatePath("/admin/news");
  revalidatePath("/news");
  return { success: "News unpublished" };
}

export async function deleteNews(id: string): Promise<ActionState> {
  const session = await requirePermission("news.delete");
  await newsService.softDelete(id, session.user.id);
  revalidatePath("/admin/news");
  revalidatePath("/news");
  return { success: "News deleted" };
}

export async function bulkDeleteNews(ids: string[]): Promise<ActionState> {
  const session = await requirePermission("news.delete");
  await newsService.bulkDelete(ids, session.user.id);
  revalidatePath("/admin/news");
  return { success: `${ids.length} article(s) deleted` };
}
