import { requireAuth } from "@/lib/auth/session";

export const metadata = {
  title: "Dashboard | School CMS",
};

export default async function AdminDashboardPage() {
  const session = await requireAuth();

  return (
    <div className="flex-1 p-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-2 text-muted-foreground">
        Welcome back, {session.user.name}
      </p>
    </div>
  );
}
