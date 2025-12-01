"use client";

import React, { useState } from 'react';
import { Search } from 'lucide-react';

const ServiceSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle search
    console.log('Searching for:', searchQuery);
  };

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-fami-blue text-center mb-8">
            BUSCADOR DE SERVICIOS
          </h2>

          <form onSubmit={handleSubmit} className="relative">
            <input
              type="text"
              placeholder="Escriba aquí el nombre de los servicios..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 pr-14 text-gray-700 bg-white border-2 border-gray-200 rounded-full focus:outline-none focus:border-fami-blue text-base md:text-lg"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-fami-blue text-white rounded-full hover:bg-fami-blue/90 transition-colors"
              aria-label="Buscar"
            >
              <Search size={20} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ServiceSearch;
