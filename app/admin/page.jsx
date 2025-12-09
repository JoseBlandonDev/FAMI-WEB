"use client";

import React from 'react';
import Link from 'next/link';
import {
  Image,
  Newspaper,
  Video,
  Award,
  FileText,
  Calendar,
  MessageSquare
} from 'lucide-react';

const quickLinks = [
  { name: 'Gestionar Noticias', href: '/admin/noticias', icon: Newspaper, color: 'bg-fami-primary' },
  { name: 'Gestionar Blog', href: '/admin/blog', icon: FileText, color: 'bg-fami-secondary' },
  // Removed: { name: 'Encuestas', href: '/admin/encuestas', icon: MessageSquare, color: 'bg-fami-lavender' },
  { name: 'Editar Hero', href: '/admin/hero', icon: Image, color: 'bg-fami-accent' },
  { name: 'Videos', href: '/admin/videos', icon: Video, color: 'bg-fami-primary' },
  { name: 'Certificaciones', href: '/admin/certificaciones', icon: Award, color: 'bg-fami-secondary' },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bienvenido al Panel de Administración</h1>
          <p className="text-gray-500 mt-1">Selecciona una opción para comenzar a editar el contenido.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Calendar size={16} />
          <span>{new Date().toLocaleDateString('es-CO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {quickLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="flex flex-col items-center p-6 rounded-xl border border-gray-200 bg-white hover:border-fami-blue hover:shadow-md transition-all group"
          >
            <div className={`w-14 h-14 ${link.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm`}>
              <link.icon size={28} className="text-white" />
            </div>
            <span className="text-base font-semibold text-gray-700 group-hover:text-fami-blue text-center">{link.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
