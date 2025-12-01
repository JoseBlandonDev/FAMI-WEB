"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Upload, Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const initialServices = [
  {
    id: 1,
    title: "Salud Ocupacional",
    image: "/images/services/salud-ocupacional.png",
    link: "/salud-ocupacional"
  },
  {
    id: 2,
    title: "Apoyos pedagógicos",
    image: "/images/services/apoyos-pedagogicos.png",
    link: "/apoyos-pedagogicos"
  },
  {
    id: 3,
    title: "Servicios de la IPS",
    image: "/images/services/servicios-ips.png",
    link: "/servicios-ips"
  }
];

export default function AdminServices() {
  const [services, setServices] = useState(initialServices);

  const handleImageUpload = (serviceId, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setServices(services.map(service =>
          service.id === serviceId ? { ...service, image: reader.result } : service
        ));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (serviceId, field, value) => {
    setServices(services.map(service =>
      service.id === serviceId ? { ...service, [field]: value } : service
    ));
  };

  const saveChanges = () => {
    alert('Cambios guardados correctamente');
    console.log('Saving services:', services);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="text-gray-500 hover:text-gray-700">
            <ArrowLeft size={24} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Servicios</h1>
            <p className="text-gray-600 text-sm">Administra las imágenes de los servicios circulares</p>
          </div>
        </div>
        <button
          onClick={saveChanges}
          className="flex items-center gap-2 px-4 py-2 bg-fami-blue text-white rounded-lg hover:bg-fami-blue/90 transition-colors"
        >
          <Save size={20} />
          Guardar Cambios
        </button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6">
              {/* Image Preview */}
              <div className="flex justify-center mb-6">
                <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-gray-100 bg-gray-50">
                  {service.image && (
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-contain"
                    />
                  )}
                  <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer bg-black/50 opacity-0 hover:opacity-100 transition-opacity rounded-full">
                    <Upload size={24} className="text-white mb-1" />
                    <span className="text-white text-xs">Cambiar</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageUpload(service.id, e)}
                    />
                  </label>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Título
                  </label>
                  <input
                    type="text"
                    value={service.title}
                    onChange={(e) => handleInputChange(service.id, 'title', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fami-blue"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Link
                  </label>
                  <input
                    type="text"
                    value={service.link}
                    onChange={(e) => handleInputChange(service.id, 'link', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fami-blue"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="text-sm text-gray-500 mt-4">
        * Las imágenes deben ser cuadradas (preferiblemente 400x400px) con fondo transparente para mejor visualización
      </p>
    </div>
  );
}
