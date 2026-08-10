import { menuService } from "@/services/menu.service";
import { Container } from "@/components/layout/container";
import Link from "next/link";
import type { IMenuItem } from "@/models/menu.model";

export async function PublicFooter() {
  const menu = await menuService.findByLocation("footer");
  const items = menu?.items?.filter((i) => i.isEnabled) || [];

  return (
    <footer className="border-t bg-muted/50 mt-auto">
      <Container className="py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} School CMS. All rights reserved.
          </p>
          <nav className="flex items-center gap-4">
            {items.map((item: IMenuItem, i: number) => (
              <Link
                key={i}
                href={item.url || "#"}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </Container>
    </footer>
  );
}
