"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Nosotros', href: '/nosotros' },
    { name: 'Servicios IPS', href: '/servicios-ips' },
    { name: 'Salud Ocupacional', href: '/salud-ocupacional' },
    { name: 'Apoyos Pedagógicos', href: '/apoyos-pedagogicos' },
    { name: 'Contacto', href: '/contacto' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <div className="relative h-12 w-40">
                {/* Placeholder SVG logic if image is missing, but using Image component as requested */}
                <Image
                  src="/logos/fami-logo.png"
                  alt="FAMI Logo"
                  fill
                  className="object-contain"
                  priority
                />
                {/* Fallback text if image fails to load (visual only if image missing in dev) */}
                <span className="sr-only">FAMI Fundación</span>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-fami-text hover:text-fami-blue font-sans font-medium transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center">
            <Button variant="primary">
              Pide tu Cita
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="text-fami-text hover:text-fami-blue focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <X size={28} />
              ) : (
                <Menu size={28} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block px-3 py-2 text-base font-medium text-fami-text hover:text-fami-blue hover:bg-gray-50 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4">
              <Button variant="primary" className="w-full justify-center">
                Pide tu Cita
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

