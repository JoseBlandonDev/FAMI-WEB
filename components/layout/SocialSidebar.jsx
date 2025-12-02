"use client";

import React, { useState, useEffect } from 'react';
import { Facebook, Instagram, Linkedin, Youtube, Globe } from 'lucide-react';
import { supabase } from '@/lib/supabase';

// TikTok icon component (not available in lucide-react)
const TikTokIcon = ({ size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const SocialSidebar = () => {
  const [socialLinks, setSocialLinks] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSocialLinks();
  }, []);

  const fetchSocialLinks = async () => {
    try {
      const { data, error } = await supabase
        .from('social_media')
        .select('*')
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching social links:', error);
      }

      if (data) {
        setSocialLinks(data);
      }
    } catch (error) {
      console.error('Error fetching social links:', error);
    } finally {
      setLoading(false);
    }
  };

  // Define available social networks with their icons
  const socialNetworks = [
    { key: 'instagram', icon: Instagram, label: 'Instagram' },
    { key: 'facebook', icon: Facebook, label: 'Facebook' },
    { key: 'tiktok', icon: TikTokIcon, label: 'TikTok' },
    { key: 'youtube', icon: Youtube, label: 'YouTube' },
    { key: 'linkedin', icon: Linkedin, label: 'LinkedIn' },
  ];

  // Filter only networks that have a link configured
  const activeSocialLinks = socialLinks
    ? socialNetworks.filter(network => socialLinks[network.key])
    : [];

  if (loading || activeSocialLinks.length === 0) {
    return null;
  }

  return (
    <div className="fixed left-0 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-1">
      {activeSocialLinks.map((social) => {
        const Icon = social.icon;
        return (
          <a
            key={social.key}
            href={socialLinks[social.key]}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 flex items-center justify-center text-white rounded-r-lg shadow-md hover:w-14 transition-all duration-200"
            style={{ backgroundColor: '#354093' }}
            aria-label={social.label}
          >
            <Icon size={22} />
          </a>
        );
      })}
    </div>
  );
};

export default SocialSidebar;
