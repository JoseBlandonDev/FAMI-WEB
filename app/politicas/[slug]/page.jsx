import React from 'react';
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';

async function getPolitica(slug) {
  const { data, error } = await supabase
    .from('politicas')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) {
    return null;
  }

  return data;
}

export default async function PoliticaPage({ params }) {
  const { slug } = await params;
  const politica = await getPolitica(slug);

  if (!politica) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 font-display text-fami-blue">
            {politica.titulo}
          </h1>

          <div
            className="prose-content text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: politica.contenido }}
          />
        </div>
      </div>
    </main>
  );
}
