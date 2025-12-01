"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Stethoscope, BookOpen, HeartPulse } from 'lucide-react';

const services = [
  {
    id: 1,
    title: "Salud Ocupacional",
    icon: Stethoscope,
    image: "/images/services/salud-ocupacional.png",
    link: "/salud-ocupacional",
    color: "fami-blue"
  },
  {
    id: 2,
    title: "Apoyos pedagógicos",
    icon: BookOpen,
    image: "/images/services/apoyos-pedagogicos.png",
    link: "/apoyos-pedagogicos",
    color: "fami-orange"
  },
  {
    id: 3,
    title: "Servicios de la IPS",
    icon: HeartPulse,
    image: "/images/services/servicios-ips.png",
    link: "/servicios-ips",
    color: "fami-cyan"
  }
];

const ServicesCards = () => {
  return (
    <section className="relative -mt-20 z-20 pb-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-6 md:gap-12">
          {services.map((service) => (
            <Link
              key={service.id}
              href={service.link}
              className="group"
            >
              <div className="flex flex-col items-center">
                {/* Circular Card */}
                <div className={`w-36 h-36 md:w-44 md:h-44 rounded-full bg-white shadow-lg flex items-center justify-center overflow-hidden border-4 border-white group-hover:shadow-xl transition-all group-hover:scale-105`}>
                  <div className="relative w-24 h-24 md:w-32 md:h-32">
                    {/* Fallback Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <service.icon
                        size={64}
                        className={`text-${service.color} opacity-30`}
                      />
                    </div>
                    {/* Image */}
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-contain"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                </div>
                {/* Title */}
                <h3 className="mt-4 text-center text-fami-blue font-semibold text-sm md:text-base group-hover:text-fami-orange transition-colors">
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
