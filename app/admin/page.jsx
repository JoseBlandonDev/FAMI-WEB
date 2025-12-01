"use client";

import React from 'react';
import Link from 'next/link';
import {
  Users,
  Newspaper,
  FileText,
  Image,
  TrendingUp,
  Eye,
  ArrowRight,
  Calendar,
  Clock
} from 'lucide-react';

// Datos de ejemplo
const stats = [
  {
    name: 'Total Clientes',
    value: '156',
    icon: Users,
    change: '+12%',
    changeType: 'positive',
    color: 'bg-blue-500'
  },
  {
    name: 'Noticias Publicadas',
    value: '24',
    icon: Newspaper,
    change: '+3 este mes',
    changeType: 'positive',
    color: 'bg-green-500'
  },
  {
    name: 'Artículos de Blog',
    value: '18',
    icon: FileText,
    change: '+2 este mes',
    changeType: 'positive',
    color: 'bg-purple-500'
  },
  {
    name: 'Visitas al Sitio',
    value: '3,842',
    icon: Eye,
    change: '+18%',
    changeType: 'positive',
    color: 'bg-orange-500'
  },
];

const recentClients = [
  { id: 1, name: 'María García', email: 'maria@email.com', date: '29 nov 2025', status: 'Activo' },
  { id: 2, name: 'Carlos López', email: 'carlos@email.com', date: '28 nov 2025', status: 'Activo' },
  { id: 3, name: 'Ana Rodríguez', email: 'ana@email.com', date: '27 nov 2025', status: 'Pendiente' },
  { id: 4, name: 'Juan Martínez', email: 'juan@email.com', date: '26 nov 2025', status: 'Activo' },
];

const recentNews = [
  { id: 1, title: 'Nueva campaña de vacunación', date: '29 nov 2025', views: 234 },
  { id: 2, title: 'Apertura de nueva sede', date: '25 nov 2025', views: 567 },
  { id: 3, title: 'Reconocimiento internacional', date: '20 nov 2025', views: 891 },
];

const quickLinks = [
  { name: 'Crear Noticia', href: '/admin/noticias', icon: Newspaper, color: 'bg-green-500' },
  { name: 'Nuevo Blog', href: '/admin/blog', icon: FileText, color: 'bg-purple-500' },
  { name: 'Ver Clientes', href: '/admin/clientes', icon: Users, color: 'bg-blue-500' },
  { name: 'Editar Hero', href: '/admin/hero', icon: Image, color: 'bg-orange-500' },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Bienvenido al panel de administración de FAMI</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Calendar size={16} />
          <span>{new Date().toLocaleDateString('es-CO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.name}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon size={24} className="text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1">
              <TrendingUp size={16} className="text-green-500" />
              <span className="text-sm text-green-500">{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Acciones Rápidas</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="flex flex-col items-center p-4 rounded-xl border-2 border-dashed border-gray-200 hover:border-fami-blue hover:bg-fami-blue/5 transition-colors group"
            >
              <div className={`w-12 h-12 ${link.color} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                <link.icon size={24} className="text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-fami-blue">{link.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Clients */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Clientes Recientes</h2>
            <Link href="/admin/clientes" className="text-fami-blue text-sm hover:underline flex items-center gap-1">
              Ver todos <ArrowRight size={16} />
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {recentClients.map((client) => (
              <div key={client.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-fami-blue/10 text-fami-blue flex items-center justify-center font-semibold">
                      {client.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{client.name}</p>
                      <p className="text-sm text-gray-500">{client.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                      client.status === 'Activo' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                    }`}>
                      {client.status}
                    </span>
                    <p className="text-xs text-gray-400 mt-1">{client.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent News */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Noticias Recientes</h2>
            <Link href="/admin/noticias" className="text-fami-blue text-sm hover:underline flex items-center gap-1">
              Ver todas <ArrowRight size={16} />
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {recentNews.map((news) => (
              <div key={news.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{news.title}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-sm text-gray-500 flex items-center gap-1">
                        <Calendar size={14} />
                        {news.date}
                      </span>
                      <span className="text-sm text-gray-500 flex items-center gap-1">
                        <Eye size={14} />
                        {news.views} vistas
                      </span>
                    </div>
                  </div>
                  <button className="text-fami-blue hover:bg-fami-blue/10 p-2 rounded-lg transition-colors">
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity Log */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Actividad Reciente</h2>
        <div className="space-y-4">
          {[
            { action: 'Nueva noticia publicada', user: 'Admin', time: 'Hace 2 horas' },
            { action: 'Cliente registrado', user: 'Sistema', time: 'Hace 5 horas' },
            { action: 'Imagen del hero actualizada', user: 'Admin', time: 'Hace 1 día' },
            { action: 'Blog publicado', user: 'Admin', time: 'Hace 2 días' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-fami-blue" />
              <div className="flex-1">
                <p className="text-sm text-gray-900">{activity.action}</p>
                <p className="text-xs text-gray-400">por {activity.user}</p>
              </div>
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <Clock size={12} />
                {activity.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
