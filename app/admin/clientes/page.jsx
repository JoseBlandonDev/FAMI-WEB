"use client";

import React, { useState } from 'react';
import { Search, Filter, Eye, Trash2, RefreshCw, Users, TrendingUp, UserCheck, DollarSign } from 'lucide-react';

// Datos de ejemplo de clientes
const initialClients = [
  { id: 1, name: 'Lina Villegas Lopez', email: 'linavillegas171@gmail.com', phone: '+573103931530', location: 'Chinchiná, Caldas', totalSpent: 662490, orders: 3, frequency: 'Muy frecuente (semanal)', lastPurchase: '29 de nov de 2025', status: 'active' },
  { id: 2, name: 'Carlos Lopez', email: 'haripieles.carlos@hotmail.com', phone: '+573206945004', location: 'Envigado, Antioquia', totalSpent: 392790, orders: 2, frequency: 'Muy frecuente (semanal)', lastPurchase: '28 de nov de 2025', status: 'active' },
  { id: 3, name: 'Gloria Monsalve', email: 'intruenobujias@hotmail.com', phone: '+573168786961', location: 'Medellín, Antioquia', totalSpent: 376710, orders: 1, frequency: 'Cliente nuevo', lastPurchase: '27 de nov de 2025', status: 'new' },
  { id: 4, name: 'Javier Leonardo Navarro', email: 'javiernavarro_f@hotmail.com', phone: '+573043550848', location: 'San Jacinto, Bolívar', totalSpent: 364800, orders: 3, frequency: 'Muy frecuente (semanal)', lastPurchase: '29 de nov de 2025', status: 'active' },
  { id: 5, name: 'Rocío Cayon Zambrano', email: 'rochy20@hotmail.com', phone: '+573007902465', location: 'Santa Marta, Magdalena', totalSpent: 277790, orders: 1, frequency: 'Cliente nuevo', lastPurchase: '28 de nov de 2025', status: 'new' },
  { id: 6, name: 'María García Pérez', email: 'maria.garcia@gmail.com', phone: '+573156789012', location: 'Bogotá, Cundinamarca', totalSpent: 520000, orders: 4, frequency: 'Frecuente (mensual)', lastPurchase: '25 de nov de 2025', status: 'active' },
  { id: 7, name: 'Pedro Sánchez', email: 'pedro.sanchez@email.com', phone: '+573112345678', location: 'Cali, Valle del Cauca', totalSpent: 180000, orders: 1, frequency: 'Cliente nuevo', lastPurchase: '20 de nov de 2025', status: 'new' },
];

const stats = [
  { name: 'Total Clientes', value: '77', icon: Users, color: 'bg-blue-500' },
  { name: 'Clientes Activos (30d)', value: '48', icon: TrendingUp, color: 'bg-green-500' },
  { name: 'Clientes Recurrentes', value: '3', icon: UserCheck, color: 'bg-purple-500' },
  { name: 'Valor Promedio', value: '$192.636', icon: DollarSign, color: 'bg-orange-500' },
];

export default function AdminClientes() {
  const [clients, setClients] = useState(initialClients);
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [cityFilter, setCityFilter] = useState('');

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         client.phone.includes(searchQuery);
    return matchesSearch;
  });

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(value);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Clientes</h1>
          <p className="text-gray-500 mt-1">Administra la base de clientes registrados</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          <RefreshCw size={18} />
          Actualizar
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon size={20} className="text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Gestión de Clientes</h2>
          <p className="text-sm text-gray-500">Administra la base de clientes del sitio</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Search */}
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nombre, email o teléfono..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fami-blue focus:border-transparent"
            />
          </div>

          {/* Department Filter */}
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fami-blue focus:border-transparent"
          >
            <option value="">Todos los departamentos</option>
            <option value="antioquia">Antioquia</option>
            <option value="cundinamarca">Cundinamarca</option>
            <option value="valle">Valle del Cauca</option>
            <option value="caldas">Caldas</option>
          </select>

          {/* City Filter */}
          <select
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fami-blue focus:border-transparent"
          >
            <option value="">Todas las ciudades</option>
            <option value="medellin">Medellín</option>
            <option value="bogota">Bogotá</option>
            <option value="cali">Cali</option>
          </select>
        </div>

        <p className="text-sm text-gray-500 mb-4">Mostrando {filteredClients.length} clientes</p>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Cliente</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Ubicación</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Total Gastado</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Pedidos</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Frecuencia</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Última Compra</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium text-gray-900">{client.name}</p>
                      <p className="text-sm text-gray-500">{client.email}</p>
                      <p className="text-sm text-gray-400">{client.phone}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-start gap-1">
                      <span className="text-gray-400">📍</span>
                      <div>
                        <p className="text-sm text-gray-900">{client.location.split(',')[0]}</p>
                        <p className="text-xs text-gray-500">{client.location.split(',')[1]}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-semibold text-green-600">{formatCurrency(client.totalSpent)}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="flex items-center gap-1 text-gray-600">
                      📦 {client.orders}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                      client.status === 'new'
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-green-100 text-green-600'
                    }`}>
                      {client.frequency}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-gray-500">{client.lastPurchase}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-gray-400 hover:text-fami-blue hover:bg-fami-blue/10 rounded-lg transition-colors">
                        <Eye size={18} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
