"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, MapPin, Phone, Instagram, Facebook, Youtube, Linkedin, Twitter, MessageCircle, Globe } from 'lucide-react';
import { supabase } from '@/lib/supabase';

// TikTok icon component
const TikTokIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const socialIconMap = {
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
  linkedin: Linkedin,
  twitter: Twitter,
  whatsapp: MessageCircle,
  tiktok: TikTokIcon,
  website: Globe,
};

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [socialLinks, setSocialLinks] = useState({});

  const menuItems = [
    { name: 'Especialidades', href: '/especialidades' },
    { name: 'Servicios / Programas', href: '/servicios' },
    { name: 'Noticias', href: '/noticias' },
    { name: 'Nosotros', href: '/nosotros' },
  ];

  useEffect(() => {
    const fetchSocialLinks = async () => {
      try {
        const { data, error } = await supabase
          .from('social_media')
          .select('*')
          .single();

        if (data && !error) {
          setSocialLinks(data);
        }
      } catch (error) {
        console.error('Error fetching social links:', error);
      }
    };

    fetchSocialLinks();
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Filter social networks that have links
  const activeSocialLinks = Object.entries(socialLinks)
    .filter(([key, value]) => value && key !== 'id' && key !== 'created_at' && key !== 'updated_at')
    .map(([key, value]) => ({
      key,
      href: value,
      icon: socialIconMap[key],
      label: key.charAt(0).toUpperCase() + key.slice(1),
    }));

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
              <a href="https://wa.me/573218227123?text=Hola, me gustaría obtener más información sobre los servicios de FAMI." target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-fami-secondary transition-colors">
                <Phone size={16} />
                <span>Contáctanos</span>
              </a>
            </div>

            {/* Right: Social Media Icons from database */}
            <div className="flex items-center gap-4">
              {activeSocialLinks.map((social) => {
                const Icon = social.icon;
                if (!Icon) return null;
                return (
                  <a
                    key={social.key}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-fami-secondary transition-colors"
                    aria-label={social.label}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
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
