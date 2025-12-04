"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Facebook, Linkedin, MessageCircle, LogIn, Youtube, Twitter, Globe } from 'lucide-react';
import { supabase } from '@/lib/supabase';

// TikTok icon component
const TikTokIcon = ({ size = 20 }) => (
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

const legalLinks = [
  { name: 'Términos y Condiciones', href: '/politicas/terminos-y-condiciones' },
  { name: 'Política de Privacidad', href: '/politicas/politica-de-privacidad' },
  { name: 'Tratamiento de Datos', href: '/politicas/tratamiento-de-datos' },
];

const Footer = () => {
  const [socialLinks, setSocialLinks] = useState({});

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
    <footer className="bg-fami-blue text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
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
              {/* Iniciar Sesión */}
              <li>
                <Link
                  href="/admin/login"
                  className="inline-flex items-center gap-2 text-white/80 hover:text-fami-secondary transition-colors text-sm"
                >
                  <LogIn size={16} />
                  Iniciar Sesión
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links from database */}
          <div className="flex justify-center md:justify-end items-center gap-4">
            {activeSocialLinks.map((social) => {
              const Icon = social.icon;
              if (!Icon) return null;
              return (
                <a
                  key={social.key}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border-2 border-white/50 flex items-center justify-center text-white hover:bg-white hover:text-fami-blue transition-colors"
                  aria-label={social.label}
                >
                  <Icon size={20} />
                </a>
              );
            })}
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
