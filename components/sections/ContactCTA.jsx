"use client";

import React from 'react';
import Link from 'next/link';

const ContactCTA = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background with curved shapes */}
      <div className="absolute inset-0 bg-gradient-to-br from-fami-blue via-fami-cyan to-fami-blue">
        {/* Decorative circles */}
        <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-white/5" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-white/5" />
        <div className="absolute top-1/2 left-1/4 w-40 h-40 rounded-full bg-white/5" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            Escucharte nos<br />ayuda a crecer
          </h2>
          <p className="text-white/80 text-lg md:text-xl mb-10">
            Haz clic en el link y completa el formulario
          </p>
          <Link
            href="/contacto"
            className="inline-block px-10 py-4 bg-fami-orange text-white text-lg font-bold rounded-full hover:bg-orange-600 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform"
          >
            Contáctanos
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
