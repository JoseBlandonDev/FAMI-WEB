"use client";

import React, { useEffect, useState } from 'react';
import { Instagram, Facebook, MessageCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

// TikTok icon component
const TikTokIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const FloatingSocial = () => {
  const [socialLinks, setSocialLinks] = useState({
    instagram: '',
    facebook: '',
    tiktok: '',
    whatsapp: ''
  });

  useEffect(() => {
    fetchSocialLinks();
  }, []);

  const fetchSocialLinks = async () => {
    try {
      const { data } = await supabase
        .from('social_media')
        .select('*')
        .single();

      if (data) {
        setSocialLinks({
          instagram: data.instagram || '',
          facebook: data.facebook || '',
          tiktok: data.tiktok || '',
          whatsapp: data.whatsapp || ''
        });
      }
    } catch (error) {
      console.error('Error fetching social links:', error);
    }
  };

  const socialItems = [
    { key: 'instagram', icon: Instagram, color: 'hover:bg-pink-600', href: socialLinks.instagram },
    { key: 'facebook', icon: Facebook, color: 'hover:bg-blue-600', href: socialLinks.facebook },
    { key: 'tiktok', icon: TikTokIcon, color: 'hover:bg-black', href: socialLinks.tiktok },
  ].filter(item => item.href);

  if (socialItems.length === 0) return null;

  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2">
      {socialItems.map((item) => {
        const Icon = item.icon;
        return (
          <a
            key={item.key}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-10 h-10 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:text-white ${item.color} transition-all hover:scale-110`}
          >
            <Icon size={20} />
          </a>
        );
      })}
    </div>
  );
};

export default FloatingSocial;
