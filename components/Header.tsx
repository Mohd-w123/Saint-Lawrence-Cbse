"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaBars, FaChevronDown, FaEnvelope, FaPhone, FaTimes } from "react-icons/fa";
import { images } from "@/lib/images";
import { navLinks } from "@/data/homepage";

type HeaderProps = {
  onApplyClick: () => void;
};

export default function Header({ onApplyClick }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="hidden bg-[#003d78] text-sm text-white lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2">
          <div className="flex items-center gap-6">
            <a href="tel:+919588841005" className="flex items-center gap-2 hover:text-[#ffb300]">
              <FaPhone className="text-[#ffb300]" />
              +91 9588841005, 9588841008
            </a>
            <a
              href="mailto:info@mayoorschooljaipur.org"
              className="flex items-center gap-2 hover:text-[#ffb300]"
            >
              <FaEnvelope className="text-[#ffb300]" />
              info@mayoorschooljaipur.org
            </a>
          </div>
          <button
            onClick={onApplyClick}
            className="rounded bg-[#ffb300] px-4 py-1.5 font-semibold text-[#003d78] transition hover:bg-[#ffcc02]"
          >
            Apply Now
          </button>
        </div>
      </div>

      <nav
        className={`transition-all duration-300 ${
          scrolled ? "bg-white shadow-md" : "bg-white/95 backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Link href="/" className="relative h-12 w-44 md:h-14 md:w-52">
            <Image
              src={images.logo}
              alt="Mayoor School Jaipur"
              fill
              className="object-contain object-left"
              priority
            />
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <li key={link.label} className="group relative">
                {link.children ? (
                  <>
                    <button className="flex items-center gap-1 rounded px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-[#0b5699]/5 hover:text-[#0b5699]">
                      {link.label}
                      <FaChevronDown className="text-xs" />
                    </button>
                    <div className="invisible absolute left-0 top-full z-10 min-w-[200px] rounded-lg border bg-white py-2 opacity-0 shadow-lg transition-all group-hover:visible group-hover:opacity-100">
                      {link.children.map((child) => (
                        <Link
                          key={child}
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-600 hover:bg-[#0b5699]/5 hover:text-[#0b5699]"
                        >
                          {child}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={link.href}
                    className="block rounded px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-[#0b5699]/5 hover:text-[#0b5699]"
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <button
              onClick={onApplyClick}
              className="hidden rounded bg-[#0b5699] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#003d78] sm:block"
            >
              Apply Now
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="rounded p-2 text-[#0b5699] lg:hidden"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="border-t bg-white px-4 py-4 lg:hidden">
            {navLinks.map((link) => (
              <div key={link.label} className="border-b border-gray-100 py-2">
                {link.children ? (
                  <>
                    <button
                      onClick={() =>
                        setOpenDropdown(openDropdown === link.label ? null : link.label)
                      }
                      className="flex w-full items-center justify-between py-2 font-medium text-gray-800"
                    >
                      {link.label}
                      <FaChevronDown
                        className={`text-xs transition ${openDropdown === link.label ? "rotate-180" : ""}`}
                      />
                    </button>
                    {openDropdown === link.label && (
                      <div className="pb-2 pl-4">
                        {link.children.map((child) => (
                          <Link
                            key={child}
                            href="#"
                            className="block py-1.5 text-sm text-gray-600"
                            onClick={() => setMobileOpen(false)}
                          >
                            {child}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={link.href}
                    className="block py-2 font-medium text-gray-800"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
            <button
              onClick={() => {
                onApplyClick();
                setMobileOpen(false);
              }}
              className="mt-4 w-full rounded bg-[#0b5699] py-3 font-semibold text-white"
            >
              Apply Now
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
