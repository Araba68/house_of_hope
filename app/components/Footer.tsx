import { Facebook, Mail, Phone, MapPin, Heart } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 md:pt-16 pb-6 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">

        {/* Column 1 — About */}
        <section>
          <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">House of Hope</h3>
          <p className="text-xs md:text-sm leading-relaxed">
            A nurturing home for vulnerable children — providing love, education,
            shelter, and hope for a brighter future.
          </p>

          <div className="mt-4 md:mt-6 space-y-2 text-xs md:text-sm">
            <p className="flex items-start md:items-center gap-2">
              <MapPin size={16} className="text-yellow-400 flex-shrink-0 mt-0.5 md:mt-0" aria-hidden="true" /> 
              Mombasa, Kenya
            </p>

            <p className="flex items-start md:items-center gap-2">
              <Phone size={16} className="text-yellow-400 flex-shrink-0 mt-0.5 md:mt-0" aria-hidden="true" /> 
              <a href="tel:+254734037736" className="hover:text-yellow-400 transition">+254734037736</a> / <a href="tel:+254741510703" className="hover:text-yellow-400 transition">0741510703</a>
            </p>

            <p className="flex items-start md:items-center gap-2">
              <Mail size={16} className="text-yellow-400 flex-shrink-0 mt-0.5 md:mt-0" aria-hidden="true" /> 
              <a href="mailto:houseofhopechildrenshome20@gmail.com" className="hover:text-yellow-400 transition break-all">houseofhopechildrenshome20@gmail.com</a>
            </p>
          </div>
        </section>

        {/* Column 2 — Quick Links */}
        <section>
          <h4 className="text-lg md:text-xl font-semibold text-white mb-3 md:mb-4">Quick Links</h4>
          <ul className="space-y-2 md:space-y-3 text-xs md:text-sm">
            <li>
              <Link href="/" className="hover:text-yellow-400 transition">Home</Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-yellow-400 transition">About Us</Link>
            </li>
            <li>
              <Link href="/#programs" className="hover:text-yellow-400 transition">Programs</Link>
            </li>
            <li>
              <Link href="/gallery" className="hover:text-yellow-400 transition">Gallery</Link>
            </li>
            <li>
              <Link href="/kids" className="hover:text-yellow-400 transition">Sponsor</Link>
            </li>
          </ul>
        </section>

        {/* Column 3 — Programs */}
        <section>
          <h4 className="text-lg md:text-xl font-semibold text-white mb-3 md:mb-4">Our Programs</h4>
          <ul className="space-y-2 md:space-y-3 text-xs md:text-sm">
            <li>Education Support</li>
            <li>Feeding Program</li>
            <li>Healthcare & Wellness</li>
            <li>Safe Shelter</li>
            <li>Mentorship</li>
          </ul>
        </section>

        {/* Column 4 — Donate */}
        <section>
          <h4 className="text-lg md:text-xl font-semibold text-white mb-3 md:mb-4">Support Us</h4>
          <p className="text-xs md:text-sm mb-4">
            Your donation helps us provide love, shelter, food, education, and health
            support for children in need.
          </p>

          <Link
            href="#donate"
            className="inline-flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 md:px-5 py-2 md:py-3 rounded-lg md:rounded-xl shadow-lg transition text-xs md:text-sm w-full md:w-auto"
          >
            <Heart size={16} className="md:w-5 md:h-5" aria-hidden="true" /> Donate Now
          </Link>

          {/* Socials */}
          <div className="mt-4 md:mt-6 flex gap-4">
            <a href="https://www.facebook.com/share/1BomfS3GUZ/" target="_blank" rel="noopener noreferrer" aria-label="House of Hope Facebook" className="hover:text-yellow-400 transition">
              <Facebook size={20} className="md:w-6 md:h-6" />
            </a>
          </div>
        </section>
      </div>

      <div className="mt-8 md:mt-12 border-t border-gray-700 pt-4 md:pt-6 text-center">
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} House of Hope Children&apos;s Home. All rights reserved.
        </p>
        
        {/* Built by TechIT Eazy */}
        <p className="text-xs text-gray-500 mt-2 flex items-center justify-center gap-1">
          Built with <Heart size={12} className="text-red-500 inline" fill="currentColor" /> by{" "}
          <a 
            href="https://techit-eazy-svpi.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-yellow-400 hover:text-yellow-300 transition font-medium"
          >
            TechIT Eazy
          </a>
        </p>
      </div>
    </footer>
  );
}