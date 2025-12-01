"use client";

import React from 'react';
import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';

const SocialSidebar = () => {
  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/fami', label: 'Facebook' },
    { icon: Instagram, href: 'https://instagram.com/fami', label: 'Instagram' },
    { icon: Linkedin, href: 'https://linkedin.com/company/fami', label: 'LinkedIn' },
    { icon: Youtube, href: 'https://youtube.com/fami', label: 'YouTube' },
  ];

  return (
    <div className="fixed left-0 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col">
      {socialLinks.map((social, index) => (
        <a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-10 h-10 flex items-center justify-center text-white transition-all hover:w-12 ${
            index % 2 === 0 ? 'bg-fami-blue hover:bg-fami-blue/90' : 'bg-fami-cyan hover:bg-fami-cyan/90'
          }`}
          aria-label={social.label}
        >
          <social.icon size={20} />
        </a>
      ))}
    </div>
  );
};

export default SocialSidebar;
