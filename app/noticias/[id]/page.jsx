import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, Share2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';

// Force dynamic rendering to ensure we fetch fresh data
export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getNewsItem(id) {
  console.log(`[NewsPage] Fetching news with ID: ${id}`); // Debug log

  // Validate ID is a number
  if (!id || isNaN(Number(id))) {
    console.error(`[NewsPage] Invalid ID: ${id}`);
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error(`[NewsPage] Supabase error for ID ${id}:`, error.message);
      return null;
    }

    if (!data) {
      console.warn(`[NewsPage] No data found for ID ${id}`);
      return null;
    }

    return data;
  } catch (err) {
    console.error(`[NewsPage] Unexpected error:`, err);
    return null;
  }
}

export default async function NewsDetailPage({ params }) {
  // Await params in case future Next.js versions require it, though normally direct access works in 14
  // But let's be safe with the ID extraction
  const { id } = params; 
  
  if (!id) {
    notFound();
  }

  const newsItem = await getNewsItem(id);

  if (!newsItem) {
    console.warn(`[NewsPage] Rendering 404 because newsItem is null for ID ${id}`);
    notFound();
  }

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Header Image */}
      <div className="relative w-full h-[400px] md:h-[500px] bg-gray-900">
        {newsItem.image ? (
          <Image
            src={newsItem.image}
            alt={newsItem.title}
            fill
            className="object-cover opacity-60"
            unoptimized
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-white/20">
            Sin imagen de portada
          </div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 pb-12 md:pb-20">
           <div className="max-w-4xl mx-auto">
             <Link 
               href="/#noticias" 
               className="inline-flex items-center gap-2 text-white/80 hover:text-fami-orange mb-6 transition-colors"
             >
               <ArrowLeft size={20} />
               Volver a noticias
             </Link>
             
             <div className="flex items-center gap-3 text-fami-orange font-medium mb-4">
               <Calendar size={18} />
               <span>{newsItem.date}</span>
             </div>
             
             <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight drop-shadow-lg">
               {newsItem.title}
             </h1>
           </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 -mt-10 relative z-10">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
          
          {/* Share / Actions (Optional placeholder) */}
          <div className="flex justify-end mb-8 border-b border-gray-100 pb-4">
            <button className="flex items-center gap-2 text-gray-500 hover:text-fami-blue transition-colors text-sm">
              <Share2 size={16} />
              Compartir
            </button>
          </div>

          {/* Body Text */}
          <div className="prose prose-lg max-w-none text-gray-700">
            {/* Render newlines as paragraphs */}
            {newsItem.content ? (
              newsItem.content.split('\n').map((paragraph, index) => (
                paragraph.trim() && (
                  <p key={index} className="mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                )
              ))
            ) : (
              <p>{newsItem.excerpt}</p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
