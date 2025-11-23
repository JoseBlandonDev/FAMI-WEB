import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-fami-blue text-white pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Column 1: Info & Brand */}
          <div className="space-y-6">
            <div className="relative h-16 w-48">
              {/* White version logo placeholder */}
              <Image
                src="/logos/fami-logo.png" 
                alt="FAMI Fundación"
                fill
                className="object-contain brightness-0 invert"
              />
              <span className="sr-only">FAMI Logo</span>
            </div>
            <p className="text-white/90 leading-relaxed">
              Transformando vidas a través de servicios de salud humanizados y de alta calidad.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <Mail className="w-5 h-5 text-fami-orange flex-shrink-0" />
              <a href="mailto:contacto@famiserviciosdesalud.org" className="text-sm hover:text-fami-orange transition-colors">
                contacto@famiserviciosdesalud.org
              </a>
            </div>
          </div>

          {/* Column 2: Sede Santander */}
          <div>
            <h3 className="text-lg font-bold mb-6 border-b border-fami-cyan/30 pb-2 inline-block">
              Sede Santander de Quilichao
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-fami-orange mt-1 flex-shrink-0" />
                <span className="text-sm lg:text-base">
                  Cra. 9 No. 2-31, <br/>Barrio Centro
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-fami-orange flex-shrink-0" />
                <span className="text-sm lg:text-base">
                  321 739 7280 <br/> 312 291 7838
                </span>
              </li>
            </ul>
          </div>

          {/* Column 3: Sede Cali */}
          <div>
            <h3 className="text-lg font-bold mb-6 border-b border-fami-cyan/30 pb-2 inline-block">
              Sede Cali
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-fami-orange mt-1 flex-shrink-0" />
                <span className="text-sm lg:text-base">
                  Cra 60a # 11 - 10, <br/>Barrio Santa Anita
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-fami-orange flex-shrink-0" />
                <span className="text-sm lg:text-base">
                  321 822 7123
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Links & Legal */}
          <div>
            <h3 className="text-lg font-bold mb-6 border-b border-fami-cyan/30 pb-2 inline-block">
              Información Legal
            </h3>
            <ul className="space-y-4">
              <li>
                <Link href="#" className="hover:text-fami-orange transition-colors flex items-center gap-2">
                  Política de Tratamiento de Datos
                </Link>
              </li>
              <li>
                <a 
                  href="https://wa.me/573218227123" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-fami-orange transition-colors flex items-center gap-2"
                >
                  <ExternalLink size={16} />
                  Contacto WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 pt-8 mt-8 text-center text-sm text-white/70">
          <p>© 2025 FAMI Fundación. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
