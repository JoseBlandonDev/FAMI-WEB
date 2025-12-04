import React from 'react';
import { MapPin, Phone, Clock, Navigation } from 'lucide-react';

export default function LocalizacionPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-fami-blue py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Localización
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Visítanos en nuestra sede principal
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Información de contacto */}
            <div className="space-y-6">
              {/* Card de ubicación */}
              <div className="bg-fami-blue rounded-2xl p-8 text-white relative overflow-hidden">
                {/* Decorative circle */}
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-cyan-400/30 rounded-full blur-2xl"></div>
                <div className="absolute -left-10 bottom-0 w-32 h-32 bg-cyan-400/20 rounded-full blur-xl"></div>

                <div className="relative z-10 space-y-6">
                  {/* Dirección */}
                  <div className="text-center">
                    <p className="text-xl md:text-2xl font-medium mb-2">
                      Cra. 9 No. 2-31
                    </p>
                    <p className="text-xl md:text-2xl font-medium mb-2">
                      321 7397280 - 312 2917838
                    </p>
                    <p className="text-lg text-white/90 mb-4">
                      Barrio Centro
                    </p>

                    {/* Badge de ciudad */}
                    <div className="inline-block bg-fami-secondary text-white px-6 py-3 rounded-full font-bold text-lg">
                      SANTANDER DE QUILICHAO - CAUCA
                    </div>
                  </div>
                </div>
              </div>

              {/* Horarios */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Clock className="text-fami-secondary" size={24} />
                  Horario de Atención
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex justify-between py-2 border-b border-gray-100">
                    <span>Lunes - Viernes</span>
                    <span className="font-semibold text-gray-900">7:00 AM - 6:00 PM</span>
                  </li>
                  <li className="flex justify-between py-2">
                    <span>Sábados</span>
                    <span className="font-semibold text-gray-900">8:00 AM - 12:00 PM</span>
                  </li>
                </ul>
              </div>

              {/* Botones de acción */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://wa.me/573217397280?text=Hola, me gustaría obtener información sobre los servicios de FAMI."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white py-4 px-6 rounded-xl font-semibold hover:bg-[#128C7E] transition-colors"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp
                </a>
                <a
                  href="https://www.google.com/maps/place/Cra.+9+%232-31,+Santander+de+Quilichao,+Cauca,+Colombia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-fami-blue text-white py-4 px-6 rounded-xl font-semibold hover:bg-fami-blue/90 transition-colors"
                >
                  <Navigation size={20} />
                  Cómo llegar
                </a>
              </div>
            </div>

            {/* Mapa de Google Maps */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-[500px] lg:h-auto">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.6395!2d-76.4833!3d3.0097!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3a0d3f5f0f5f5f%3A0x5f5f5f5f5f5f5f5f!2sCra.%209%20%232-31%2C%20Santander%20de%20Quilichao%2C%20Cauca%2C%20Colombia!5e0!3m2!1ses!2sco!4v1701700000000!5m2!1ses!2sco"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '500px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación FAMI - Santander de Quilichao"
              ></iframe>
            </div>
          </div>

          {/* Información adicional */}
          <div className="mt-12 bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-fami-blue mb-6 text-center">
              ¿Cómo encontrarnos?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <div className="w-16 h-16 bg-fami-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="text-fami-blue" size={32} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Dirección</h3>
                <p className="text-gray-600">Carrera 9 No. 2-31, Barrio Centro</p>
              </div>
              <div className="text-center p-4">
                <div className="w-16 h-16 bg-fami-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="text-fami-blue" size={32} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Teléfonos</h3>
                <p className="text-gray-600">321 7397280</p>
                <p className="text-gray-600">312 2917838</p>
              </div>
              <div className="text-center p-4">
                <div className="w-16 h-16 bg-fami-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Navigation className="text-fami-blue" size={32} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Ciudad</h3>
                <p className="text-gray-600">Santander de Quilichao, Cauca</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
