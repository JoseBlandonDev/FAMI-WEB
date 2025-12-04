"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, MapPin, Phone, Instagram, Facebook, Youtube, Linkedin, Twitter } from 'lucide-react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { name: 'Especialidades', href: '/especialidades' },
    { name: 'Servicios / Programas', href: '/servicios' },
    { name: 'Noticias', href: '/noticias' },
    { name: 'Nosotros', href: '/nosotros' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top Bar */}
      <div className="bg-fami-blue text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center py-2 text-sm gap-2 sm:gap-0">
            {/* Left: Contact Links */}
            <div className="flex items-center gap-6">
              <Link href="/localizacion" className="flex items-center gap-2 hover:text-fami-secondary transition-colors">
                <MapPin size={16} />
                <span>Localización</span>
              </Link>
              <Link href="/contacto" className="flex items-center gap-2 hover:text-fami-secondary transition-colors">
                <Phone size={16} />
                <span>Contáctanos</span>
              </Link>
            </div>

            {/* Right: Social Media Icons (Moved from Sidebar) */}
            <div className="flex items-center gap-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-fami-secondary transition-colors">
                <Instagram size={18} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-fami-secondary transition-colors">
                <Facebook size={18} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-fami-secondary transition-colors">
                <Youtube size={18} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-fami-secondary transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-fami-secondary transition-colors">
                <Twitter size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4">
          {/* Increased height to h-24 for thicker header */}
          <div className="flex justify-between items-center h-24">
            {/* Logo - Expanded size */}
            <div className="flex-shrink-0 py-2">
              <Link href="/" className="flex items-center">
                <div className="relative h-20 w-48">
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
            <div className="hidden xl:flex items-center space-x-2">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-3 py-2 text-base text-gray-700 hover:text-fami-blue font-medium transition-colors whitespace-nowrap"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="xl:hidden flex items-center gap-2">
              <button
                onClick={toggleMobileMenu}
                className="text-gray-700 hover:text-fami-blue focus:outline-none p-2"
              >
                {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="xl:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg z-50">
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
