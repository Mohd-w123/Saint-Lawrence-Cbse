import { menuService } from "@/services/menu.service";
import { siteSettingService } from "@/services/settings.service";
import { Container } from "@/components/layout/container";
import Link from "next/link";
import { Phone, Mail, MapPin, ArrowRight, Globe, Share2 } from "lucide-react";
import type { IMenuItem } from "@/models/menu.model";

export async function PublicFooter() {
  const footerMenu = await menuService.findByLocation("footer");
  const secondaryMenu = await menuService.findByLocation("secondary");
  const footerItems = footerMenu?.items?.filter((i) => i.isEnabled) || [];
  const secondaryItems = secondaryMenu?.items?.filter((i) => i.isEnabled) || [];
  const settings = await siteSettingService.getPublicSettings();

  const siteName = (settings.site_name as string) || "St. Lawrence School";
  const tagline = (settings.tagline as string) || "Nurturing Minds, Building Futures";
  const address = (settings.address as string) || "";
  const phone = (settings.phone as string) || "";
  const email = (settings.email as string) || "";
  const facebook = (settings.facebook as string) || "";
  const twitter = (settings.twitter as string) || "";
  const instagram = (settings.instagram as string) || "";
  const youtube = (settings.youtube as string) || "";

  return (
    <footer className="bg-[#002a54] text-white mt-auto">
      {/* Main Footer */}
      <div className="border-b border-white/10">
        <Container className="py-12">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Column 1: School Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-[#ffb300] flex items-center justify-center text-[#002a54] font-bold text-xl">
                  {siteName.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{siteName}</h3>
                  <p className="text-xs text-white/60 uppercase tracking-wider">CBSE Affiliated</p>
                </div>
              </div>
              <p className="text-sm text-white/70 leading-relaxed">{tagline}</p>
              <div className="flex gap-3">
                {facebook && <a href={facebook} target="_blank" rel="noopener" className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#ffb300] hover:text-[#002a54] transition-all"><Globe className="h-4 w-4" /></a>}
                {twitter && <a href={twitter} target="_blank" rel="noopener" className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#ffb300] hover:text-[#002a54] transition-all"><Share2 className="h-4 w-4" /></a>}
                {instagram && <a href={instagram} target="_blank" rel="noopener" className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#ffb300] hover:text-[#002a54] transition-all"><Globe className="h-4 w-4" /></a>}
                {youtube && <a href={youtube} target="_blank" rel="noopener" className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#ffb300] hover:text-[#002a54] transition-all"><Share2 className="h-4 w-4" /></a>}
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h4 className="font-semibold mb-4 text-[#ffb300]">Quick Links</h4>
              <ul className="space-y-2">
                {footerItems.slice(0, 8).map((item: IMenuItem, i: number) => (
                  <li key={i}>
                    <Link href={item.url || "#"} target={item.target}
                      className="text-sm text-white/70 hover:text-white hover:pl-1 transition-all inline-flex items-center gap-1.5">
                      <ArrowRight className="h-3 w-3 opacity-0 -ml-4 group-hover:opacity-100" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Important Links */}
            <div>
              <h4 className="font-semibold mb-4 text-[#ffb300]">Important Links</h4>
              <ul className="space-y-2">
                {secondaryItems.slice(0, 8).map((item: IMenuItem, i: number) => (
                  <li key={i}>
                    <Link href={item.url || "#"} target={item.target}
                      className="text-sm text-white/70 hover:text-white hover:pl-1 transition-all">
                      {item.label}
                    </Link>
                  </li>
                ))}
                {secondaryItems.length === 0 && (
                  <>
                    <li><Link href="/mandatory-disclosure" className="text-sm text-white/70 hover:text-white hover:pl-1 transition-all">Mandatory Disclosure</Link></li>
                    <li><Link href="/results" className="text-sm text-white/70 hover:text-white hover:pl-1 transition-all">Results</Link></li>
                    <li><Link href="/tc-tracker" className="text-sm text-white/70 hover:text-white hover:pl-1 transition-all">TC Tracker</Link></li>
                    <li><Link href="/gallery" className="text-sm text-white/70 hover:text-white hover:pl-1 transition-all">Gallery</Link></li>
                  </>
                )}
              </ul>
            </div>

            {/* Column 4: Contact */}
            <div>
              <h4 className="font-semibold mb-4 text-[#ffb300]">Contact Us</h4>
              <div className="space-y-3">
                {address && (
                  <div className="flex items-start gap-2.5">
                    <MapPin className="h-4 w-4 mt-0.5 text-[#ffb300] shrink-0" />
                    <p className="text-sm text-white/70 leading-relaxed">{address}</p>
                  </div>
                )}
                {phone && (
                  <div className="flex items-center gap-2.5">
                    <Phone className="h-4 w-4 text-[#ffb300] shrink-0" />
                    <a href={`tel:${phone}`} className="text-sm text-white/70 hover:text-white transition-colors">{phone}</a>
                  </div>
                )}
                {email && (
                  <div className="flex items-center gap-2.5">
                    <Mail className="h-4 w-4 text-[#ffb300] shrink-0" />
                    <a href={`mailto:${email}`} className="text-sm text-white/70 hover:text-white transition-colors">{email}</a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Copyright Bar */}
      <div className="py-4">
        <Container className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} {siteName}. All rights reserved.
          </p>
          <p className="text-xs text-white/40">
            Designed with ❤️ for quality education
          </p>
        </Container>
      </div>
    </footer>
  );
}
