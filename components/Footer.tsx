import Image from "next/image";
import Link from "next/link";
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { footerLinks } from "@/data/homepage";
import { images } from "@/lib/images";
import { school } from "@/lib/school";

export default function Footer() {
  return (
    <footer className="bg-[#003d78] text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="relative mb-4 h-14 w-48">
              <Image
                src={images.logoWhite}
                alt={school.name}
                fill
                className="object-contain object-left"
              />
            </div>
            <h3 className="text-2xl font-bold text-[#ffb300]">{school.taglineHashtag}</h3>
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
                {school.address}
              </li>
              <li className="flex items-center gap-2">
                <FaPhone className="text-[#ffb300]" />
                <a href={`tel:+91${school.phones[0]}`}>{school.phoneDisplay}</a>
              </li>
              <li className="flex items-center gap-2">
                <FaEnvelope className="text-[#ffb300]" />
                <a href={`mailto:${school.email}`}>{school.email}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/20 pt-6 text-center text-sm text-white/60">
          Copyright ©2025 {school.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
