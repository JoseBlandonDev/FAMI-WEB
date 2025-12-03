"use client";

import React from 'react';
import Link from 'next/link';

const ContactCTA = () => {
  return (
    <section className="relative py-24 overflow-hidden bg-fami-blue">
      {/* Background without dark overlay/shadow for better white contrast */}
      <div className="absolute inset-0 bg-fami-blue">
         {/* Subtle decorative elements if needed, but keeping it clean blue */}
         <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-white/10 mix-blend-overlay" />
         <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-white/5 mix-blend-overlay" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight font-display">
            ESCUCHARTE NOS<br />AYUDA A CRECER
          </h2>
          <p className="text-white text-lg md:text-xl mb-10 font-medium">
            Haz clic en el link y completa el formulario
          </p>
          <Link
            href="/encuesta"
            className="inline-block px-10 py-4 bg-fami-orange text-white text-lg font-bold rounded-full hover:bg-orange-600 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform uppercase tracking-wide"
          >
            Llenar encuesta
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
