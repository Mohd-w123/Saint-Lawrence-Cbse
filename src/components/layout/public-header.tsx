import { menuService } from "@/services/menu.service";
import { siteSettingService } from "@/services/settings.service";
import { Container } from "@/components/layout/container";
import Link from "next/link";
import { Phone, Mail, ChevronDown } from "lucide-react";
import type { IMenuItem } from "@/models/menu.model";

export async function PublicHeader() {
  const menu = await menuService.findByLocation("header");
  const items = menu?.items?.filter((i) => i.isEnabled) || [];
  const settings = await siteSettingService.getPublicSettings();

  const siteName = (settings.site_name as string) || "St. Lawrence School";
  const phone = (settings.phone as string) || "";
  const email = (settings.email as string) || "";

  return (
    <header className="sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-[#002a54] text-white/90 text-xs py-1.5 hidden md:block">
        <Container className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {phone && <a href={`tel:${phone}`} className="flex items-center gap-1.5 hover:text-white transition-colors"><Phone className="h-3 w-3" />{phone}</a>}
            {email && <a href={`mailto:${email}`} className="flex items-center gap-1.5 hover:text-white transition-colors"><Mail className="h-3 w-3" />{email}</a>}
          </div>
          <div className="flex items-center gap-3">
            <Link href="/admissions" className="px-3 py-1 rounded bg-[#ffb300] text-[#002a54] font-semibold hover:bg-[#ffa000] transition-colors">Apply Now</Link>
          </div>
        </Container>
      </div>

      {/* Main Nav */}
      <nav className="bg-[#003d78] shadow-lg">
        <Container className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-white font-bold text-lg border border-white/20">
              {siteName.charAt(0)}
            </div>
            <div className="text-white">
              <div className="font-bold text-base leading-tight">{siteName}</div>
              <div className="text-[10px] text-white/60 uppercase tracking-wider">CBSE Affiliated</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {items.map((item: IMenuItem, i: number) => {
              const hasChildren = item.children && item.children.length > 0;
              return (
                <div key={i} className="relative group">
                  <Link
                    href={item.url || "#"}
                    target={item.target}
                    className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-white/85 hover:text-white rounded-md hover:bg-white/10 transition-all"
                  >
                    {item.label}
                    {hasChildren && <ChevronDown className="h-3.5 w-3.5 opacity-60 group-hover:opacity-100 transition-all group-hover:rotate-180" />}
                  </Link>
                  {hasChildren && (
                    <div className="absolute top-full left-0 pt-1 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-2 group-hover:translate-y-0 z-50">
                      <div className="bg-white rounded-lg shadow-xl border min-w-[200px] py-1.5 overflow-hidden">
                        {item.children.filter((c: IMenuItem) => c.isEnabled).map((child: IMenuItem, ci: number) => (
                          <Link key={ci} href={child.url || "#"} target={child.target}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#003d78]/5 hover:text-[#003d78] transition-colors">
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile Menu Toggle */}
          <MobileMenuToggle items={items} />
        </Container>
      </nav>
    </header>
  );
}

function MobileMenuToggle({ items }: { items: IMenuItem[] }) {
  return (
    <div className="lg:hidden">
      <details className="group">
        <summary className="list-none cursor-pointer p-2 text-white hover:bg-white/10 rounded-md transition-colors">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </summary>
        <div className="absolute left-0 right-0 top-full bg-[#003d78] shadow-lg border-t border-white/10 z-50">
          <Container className="py-4">
            <div className="space-y-1">
              {items.map((item: IMenuItem, i: number) => (
                <div key={i}>
                  <Link href={item.url || "#"} target={item.target}
                    className="block px-3 py-2.5 text-sm text-white/85 hover:text-white hover:bg-white/10 rounded-md transition-colors">
                    {item.label}
                  </Link>
                  {item.children?.filter((c: IMenuItem) => c.isEnabled).map((child: IMenuItem, ci: number) => (
                    <Link key={ci} href={child.url || "#"} target={child.target}
                      className="block px-6 py-2 text-sm text-white/60 hover:text-white hover:bg-white/10 rounded-md transition-colors">
                      {child.label}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </Container>
        </div>
      </details>
    </div>
  );
}
