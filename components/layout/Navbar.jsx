"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, MapPin, Phone, User } from 'lucide-react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { name: 'Especialidades', href: '/especialidades' },
    { name: 'Servicios / Programas', href: '/servicios' },
    { name: 'Paquetes / Visitantes', href: '/paquetes' },
    { name: 'Noticias', href: '/noticias' },
    { name: 'Eventos', href: '/eventos' },
    { name: 'Nosotros', href: '/nosotros' },
    { name: 'Aliados / Cooperantes', href: '/aliados' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top Bar */}
      <div className="bg-fami-blue text-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-2 text-sm">
            <div className="flex items-center gap-6">
              <Link href="/localizacion" className="flex items-center gap-2 hover:text-fami-orange transition-colors">
                <MapPin size={16} />
                <span>Localización</span>
              </Link>
              <Link href="/contacto" className="flex items-center gap-2 hover:text-fami-orange transition-colors">
                <Phone size={16} />
                <span>Contáctanos</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <div className="relative h-12 w-32">
                  <Image
                    src="/logos/fami-logo.png"
                    alt="FAMI Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-1">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-3 py-2 text-sm text-gray-700 hover:text-fami-blue font-medium transition-colors whitespace-nowrap"
                >
                  {item.name}
                </Link>
              ))}
              {/* User Login Icon */}
              <Link
                href="/admin/login"
                className="ml-4 p-2 text-gray-600 hover:text-fami-blue hover:bg-fami-blue/10 rounded-full transition-all"
                title="Iniciar sesión"
              >
                <User size={22} />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-2">
              <Link
                href="/admin/login"
                className="p-2 text-gray-600 hover:text-fami-blue hover:bg-fami-blue/10 rounded-full transition-all"
                title="Iniciar sesión"
              >
                <User size={22} />
              </Link>
              <button
                onClick={toggleMobileMenu}
                className="text-gray-700 hover:text-fami-blue focus:outline-none p-2"
              >
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg">
            <div className="px-4 py-4 space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-fami-blue hover:bg-gray-50 rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
