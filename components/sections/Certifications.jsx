"use client";

import React from 'react';
import Image from 'next/image';
import { Award } from 'lucide-react';

const Certifications = ({ certifications = [] }) => {
  if (!certifications || certifications.length === 0) return null;

  return (
    <section className="py-16 bg-fami-gray">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-fami-blue text-center mb-12">
          CERTIFICACIONES Y RECONOCIMIENTOS
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {certifications.map((cert) => (
            <div key={cert.id} className="flex flex-col items-center">
              {/* Certificate Card */}
              <div className="relative w-full aspect-[3/4] max-w-[250px] bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-shadow">
                {/* Certificate Image */}
                <div className="relative w-full h-full">
                  {cert.image ? (
                    <Image
                      src={cert.image}
                      alt={cert.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-amber-50 to-amber-100">
                      <div className="text-center p-4">
                        <Award size={64} className="text-amber-400 mx-auto mb-4" />
                        <div className="text-amber-600 font-serif text-lg italic">Certificado</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/* Name */}
              <p className="mt-4 text-center text-gray-600 text-sm font-medium">
                {cert.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
