"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Stethoscope } from 'lucide-react';

const ServicesCards = ({ services = [] }) => {
  if (!services || services.length === 0) return null;

  return (
    <section className="relative -mt-20 z-20 pb-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-6 md:gap-12">
          {services.map((service) => (
            <Link
              key={service.id}
              href={service.link || '#'}
              className="group"
            >
              <div className="flex flex-col items-center">
                {/* Circular Card */}
                <div className={`w-36 h-36 md:w-44 md:h-44 rounded-full bg-white shadow-lg flex items-center justify-center overflow-hidden border-4 border-white group-hover:shadow-xl transition-all group-hover:scale-105`}>
                  <div className="relative w-24 h-24 md:w-32 md:h-32">
                    {/* Image */}
                    {service.image ? (
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-contain p-2"
                        unoptimized
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Stethoscope size={48} className="text-gray-300" />
                      </div>
                    )}
                  </div>
                </div>
                {/* Title */}
                <h3 className="mt-4 text-center text-fami-blue font-semibold text-sm md:text-base group-hover:text-fami-secondary transition-colors max-w-[180px]">
                  {service.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesCards;
