import { menuService } from "@/services/menu.service";
import { Container } from "@/components/layout/container";
import Link from "next/link";
import type { IMenuItem } from "@/models/menu.model";

export async function PublicHeader() {
  const menu = await menuService.findByLocation("header");
  const items = menu?.items?.filter((i) => i.isEnabled) || [];

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="text-xl font-bold text-primary">
          School CMS
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {items.map((item: IMenuItem, i: number) => (
            <Link
              key={i}
              href={item.url || "#"}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </Container>
    </header>
  );
}
