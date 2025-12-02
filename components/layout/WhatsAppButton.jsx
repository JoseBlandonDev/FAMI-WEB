"use client";

import React, { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const WhatsAppButton = () => {
  const [whatsappLink, setWhatsappLink] = useState('');

  useEffect(() => {
    fetchWhatsappLink();
  }, []);

  const fetchWhatsappLink = async () => {
    try {
      const { data } = await supabase
        .from('social_media')
        .select('whatsapp')
        .single();

      if (data?.whatsapp) {
        setWhatsappLink(data.whatsapp);
      }
    } catch (error) {
      console.error('Error fetching WhatsApp link:', error);
    }
  };

  if (!whatsappLink) return null;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-green-500 shadow-lg flex items-center justify-center text-white hover:bg-green-600 hover:scale-110 transition-all"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle size={28} fill="white" />
    </a>
  );
};

export default WhatsAppButton;
