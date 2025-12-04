"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const ContactCTA = () => {
  return (
    <section className="relative overflow-hidden bg-white">
      <Link href="/encuesta" className="block">
        {/* Imagen para Desktop */}
        <div className="hidden md:block relative w-full">
          <Image
            src="/images/encuesta-desktop.jpg"
            alt="Escucharte nos ayuda a crecer - Contáctanos"
            width={1920}
            height={600}
            className="w-full h-auto object-contain"
            priority
            unoptimized
          />
        </div>

        {/* Imagen para Móvil */}
        <div className="block md:hidden relative w-full">
          <Image
            src="/images/encuesta-mobile.jpg"
            alt="Escucharte nos ayuda a crecer - Contáctanos"
            width={800}
            height={800}
            className="w-full h-auto object-contain"
            priority
            unoptimized
          />
        </div>
      </Link>
    </section>
  );
};

export default ContactCTA;
