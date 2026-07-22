import Image from "next/image";
import Link from "next/link";
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { footerLinks } from "@/data/homepage";
import { images } from "@/lib/images";

export default function Footer() {
  return (
    <footer className="bg-[#003d78] text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="relative mb-4 h-14 w-48">
              <Image
                src={images.logoWhite}
                alt="Mayoor School Jaipur"
                fill
                className="object-contain object-left"
              />
            </div>
            <h3 className="text-2xl font-bold text-[#ffb300]">#BeTheLight</h3>
            <p className="mt-2 text-sm text-white/80">Let&apos;s Connect</p>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-[#ffb300]">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.quick.map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="text-sm text-white/80 transition hover:text-[#ffb300]"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-[#ffb300]">Important Links</h4>
            <ul className="space-y-2">
              {footerLinks.important.map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="text-sm text-white/80 transition hover:text-[#ffb300]"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-[#ffb300]">Contact</h4>
            <ul className="space-y-3 text-sm text-white/80">
              <li className="flex gap-2">
                <FaMapMarkerAlt className="mt-0.5 flex-shrink-0 text-[#ffb300]" />
                Mayoor School Jaipur, ITS 1, IT Park Road, EPIP, Sitapura,
                Jaipur (302022), Rajasthan, India
              </li>
              <li className="flex items-center gap-2">
                <FaPhone className="text-[#ffb300]" />
                <a href="tel:+919588841005">+91 9588841005, 9588841008</a>
              </li>
              <li className="flex items-center gap-2">
                <FaEnvelope className="text-[#ffb300]" />
                <a href="mailto:admission@mayoorschooljaipur.org">
                  admission@mayoorschooljaipur.org
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/20 pt-6 text-center text-sm text-white/60">
          Copyright ©2025 held by Global Institute of Technology Society and
          Mayoor School Jaipur
        </div>
      </div>
    </footer>
  );
}
