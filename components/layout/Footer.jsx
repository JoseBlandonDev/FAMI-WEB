import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Facebook, Linkedin, MessageCircle } from 'lucide-react';

const legalLinks = [
  { name: 'Términos legales y derechos de uso', href: '#' },
  { name: 'Aviso de Privacidad', href: '#' },
  { name: 'Política de Cookies', href: '#' },
  { name: 'Mapa Web', href: '#' },
];

const institutionalLinks = [
  { name: 'Transparencia', href: '#' },
  { name: 'Reporte a Joint Commission International', href: '#' },
  { name: 'Correo electrónico corporativo', href: '#' },
  { name: 'Campus Virtual', href: '#' },
  { name: 'Atención al usuario', href: '#' },
  { name: 'Canal de denuncias', href: '#' },
];

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com/fami', label: 'Instagram' },
  { icon: Facebook, href: 'https://facebook.com/fami', label: 'Facebook' },
  { icon: Linkedin, href: 'https://linkedin.com/company/fami', label: 'LinkedIn' },
  { icon: MessageCircle, href: 'https://wa.me/573218227123', label: 'WhatsApp' },
];

const Footer = () => {
  return (
    <footer className="bg-fami-blue text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-start">
          {/* Logo */}
          <div className="flex justify-center md:justify-start">
            <div className="relative w-32 h-20">
              <Image
                src="/logos/fami-logo.png"
                alt="FAMI Fundación"
                fill
                className="object-contain brightness-0 invert"
              />
            </div>
          </div>

          {/* Legal Links */}
          <div className="text-center md:text-left">
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/80 hover:text-fami-secondary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Institutional Links */}
          <div className="text-center md:text-left">
            <ul className="space-y-2">
              {institutionalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/80 hover:text-fami-secondary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="flex justify-center md:justify-end items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border-2 border-white/50 flex items-center justify-center text-white hover:bg-white hover:text-fami-blue transition-colors"
                aria-label={social.label}
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-white/20">
        <div className="container mx-auto px-4 py-4">
          <p className="text-center text-white/60 text-sm">
            © {new Date().getFullYear()} FAMI Fundación. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
