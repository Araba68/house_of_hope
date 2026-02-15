"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Programs", href: "/#programs" },
    { label: "Projects", href: "/#projects" },
    { label: "Gallery", href: "/gallery" },
    {label: "Blog", href: "/blog" },
    { label: "Contact", href: "/#donate" },
  ];

  const closeMenu = () => setOpen(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6 py-4">
        
        {/* Logo */}
        <Link href="/" className="text-xl md:text-2xl font-bold text-blue-700 flex-shrink-0">
          House of Hope
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-gray-700 hover:text-blue-600 transition text-sm lg:text-base font-medium"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Donate CTA */}
        <a
          href="#donate"
          className="hidden md:block bg-pink-500 hover:bg-pink-600 text-white px-4 lg:px-6 py-2 rounded-full shadow-md transition font-medium text-sm lg:text-base flex-shrink-0 ml-4"
        >
          Donate
        </a>

        {/* Mobile Menu Icon */}
        <button
          className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition flex-shrink-0 ml-auto"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-4 space-y-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={closeMenu}
                className="block py-3 px-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition rounded-lg text-base font-medium"
              >
                {item.label}
              </a>
            ))}

            <a
              href="#donate"
              onClick={closeMenu}
              className="block mt-2 bg-pink-500 text-white text-center py-3 px-3 rounded-lg font-medium hover:bg-pink-600 transition text-base"
            >
              Donate
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
