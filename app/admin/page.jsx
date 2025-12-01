"use client";

import React from 'react';
import Link from 'next/link';
import { Image, Newspaper, Video, Award, ArrowRight } from 'lucide-react';

const sections = [
  {
    name: 'Hero / Slider',
    description: 'Administra las imágenes y contenido del slider principal',
    icon: Image,
    href: '/admin/hero',
    color: 'bg-blue-500'
  },
  {
    name: 'Servicios',
    description: 'Gestiona las imágenes de los servicios circulares',
    icon: Image,
    href: '/admin/servicios',
    color: 'bg-orange-500'
  },
  {
    name: 'Certificaciones',
    description: 'Actualiza las imágenes de certificados y reconocimientos',
    icon: Award,
    href: '/admin/certificaciones',
    color: 'bg-amber-500'
  },
  {
    name: 'Noticias',
    description: 'Administra las noticias y sus imágenes',
    icon: Newspaper,
    href: '/admin/noticias',
    color: 'bg-green-500'
  },
  {
    name: 'Videos',
    description: 'Gestiona los videos y sus miniaturas',
    icon: Video,
    href: '/admin/videos',
    color: 'bg-purple-500'
  }
];

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Panel de Administración</h1>
        <p className="text-gray-600 mt-1">Gestiona el contenido de tu sitio web</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="text-3xl font-bold text-fami-blue">5</div>
          <div className="text-gray-600 text-sm">Slides en Hero</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="text-3xl font-bold text-fami-orange">3</div>
          <div className="text-gray-600 text-sm">Servicios</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="text-3xl font-bold text-amber-500">3</div>
          <div className="text-gray-600 text-sm">Certificaciones</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="text-3xl font-bold text-green-500">4</div>
          <div className="text-gray-600 text-sm">Noticias</div>
        </div>
      </div>

      {/* Section Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section) => (
          <Link
            key={section.name}
            href={section.href}
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow group"
          >
            <div className={`w-12 h-12 ${section.color} rounded-lg flex items-center justify-center mb-4`}>
              <section.icon size={24} className="text-white" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2 group-hover:text-fami-blue transition-colors">
              {section.name}
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              {section.description}
            </p>
            <div className="flex items-center gap-2 text-fami-blue text-sm font-medium">
              Administrar
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>

      {/* Instructions */}
      <div className="mt-8 bg-blue-50 rounded-xl p-6">
        <h3 className="font-bold text-fami-blue mb-2">Instrucciones</h3>
        <ul className="text-gray-600 text-sm space-y-2">
          <li>• Selecciona una sección para administrar sus imágenes</li>
          <li>• Puedes subir nuevas imágenes o cambiar las existentes</li>
          <li>• Las imágenes se guardarán en la carpeta <code className="bg-white px-2 py-1 rounded">public/images/</code></li>
          <li>• Los cambios se reflejarán inmediatamente en el sitio</li>
        </ul>
      </div>
    </div>
  );
}
