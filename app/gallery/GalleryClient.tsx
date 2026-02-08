"use client";

import { useState } from "react";
import Image from "next/image";

export default function GalleryClient() {
  const images = [
    "/gallery/1.JPG",
    "/gallery/2.JPG",
    "/gallery/3.JPG",
    "/gallery/4.JPG",
    "/gallery/5.JPG",
    "/gallery/6.JPG",
    "/gallery/7.JPG",
    "/gallery/8.JPG",
    "/gallery/9.JPG",
    "/gallery/10.JPG",
    "/gallery/11.JPG",
    "/gallery/12.JPG",
    "/gallery/13.JPG",
  ];

  const [active, setActive] = useState<string | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mt-8 md:mt-10">
        {images.map((src, index) => (
          <button
            key={index}
            onClick={() => setActive(src)}
            className="relative w-full h-56 sm:h-64 rounded-lg md:rounded-xl overflow-hidden shadow-md hover:shadow-lg hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label={`Open gallery image ${index + 1}`}
          >
            <Image src={src} alt={`Gallery image ${index + 1} from House of Hope`} fill className="object-cover" />
          </button>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 md:p-6"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          <div className="max-w-4xl w-full bg-white rounded-lg md:rounded-xl overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="relative w-full h-80 sm:h-96 md:h-[70vh]">
              <Image src={active} alt="Selected gallery image" fill className="object-contain" />
            </div>

            <div className="p-3 md:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 md:gap-4">
              <div className="text-xs sm:text-sm text-gray-600">Click outside or press Close to exit</div>
              <button
                onClick={() => setActive(null)}
                className="px-4 md:px-6 py-2 md:py-3 bg-blue-600 text-white rounded-md md:rounded-lg hover:bg-blue-700 transition font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 whitespace-nowrap"
                aria-label="Close image lightbox"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
