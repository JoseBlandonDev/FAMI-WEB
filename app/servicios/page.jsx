import React from 'react';
import { Briefcase, Heart, Users, BookOpen, ShieldCheck, CheckCircle, Package, PlusCircle } from 'lucide-react';

const ServiciosPage = () => {
  return (
    <div className="bg-gray-50 pb-20">
      {/* Hero Banner */}
      <div className="relative h-24 md:h-32 bg-fami-blue-light flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/medical-icons.png')]"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Servicios y Programas</h1>
          <div className="w-24 h-1 bg-fami-orange mx-auto rounded-full"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-10">
        <div className="space-y-12">

          {/* Salud Ocupacional */}
          <section className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-fami-blue p-8 text-white">
              <div className="flex items-center gap-4">
                <Briefcase size={32} />
                <h2 className="text-3xl font-bold">SALUD OCUPACIONAL</h2>
              </div>
            </div>
            <div className="p-8 md:p-12">
              <p className="text-gray-700 leading-relaxed mb-8 text-lg">
                En FAMI entendemos que la salud ocupacional es clave para garantizar el bienestar de los colaboradores y la productividad de las empresas. Ofrecemos un servicio integral que combina experiencia, calidad humana y tecnología confiable.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="font-bold text-fami-blue mb-4 text-lg">Nuestros servicios incluyen:</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2"><CheckCircle size={18} className="text-fami-orange mt-1 flex-shrink-0"/> Evaluaciones ocupacionales (ingreso, periódicas, egreso).</li>
                    <li className="flex items-start gap-2"><CheckCircle size={18} className="text-fami-orange mt-1 flex-shrink-0"/> Examen médico laboral especializado.</li>
                    <li className="flex items-start gap-2"><CheckCircle size={18} className="text-fami-orange mt-1 flex-shrink-0"/> Pruebas diagnósticas: audiometría, espirometría, visiometría, optometría.</li>
                    <li className="flex items-start gap-2"><CheckCircle size={18} className="text-fami-orange mt-1 flex-shrink-0"/> Asesoría en Seguridad y Salud en el Trabajo (SST).</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="font-bold text-fami-blue mb-4 text-lg">COPI</h3>
                  <p className="text-gray-700">
                    Realizamos pruebas funcionales, clínicas y complementarias adaptadas a los riesgos específicos de cada puesto de trabajo, considerando la susceptibilidad del trabajador y el nivel de exposición.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Plan de Bienestar Empresarial */}
          <section className="bg-white rounded-2xl shadow-lg overflow-hidden p-8 md:p-12 border-l-8 border-fami-orange">
            <div className="flex items-center gap-4 mb-6">
              <Heart size={32} className="text-fami-orange" />
              <h2 className="text-2xl md:text-3xl font-bold text-fami-blue">Plan de Bienestar Empresarial</h2>
            </div>
            <p className="text-gray-700 mb-6 italic">
              "Una empresa saludable comienza con colaboradores felices, motivados y en equilibrio."
            </p>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-gray-700 mb-4">
                  Nuestro plan está diseñado para fortalecer el bienestar físico, emocional y social de tu equipo, creando un entorno laboral productivo y humano.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-fami-blue rounded-full"></span> Exámenes de salud ocupacional.</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-fami-blue rounded-full"></span> Inteligencia emocional y descargas emocionales.</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-fami-blue rounded-full"></span> Prevención de riesgos mecánicos.</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-fami-blue rounded-full"></span> Pausas activas.</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-fami-blue rounded-full"></span> Beneficios extendidos para la familia.</li>
                </ul>
              </div>
              <div className="bg-fami-gray p-6 rounded-xl text-center">
                <p className="text-fami-blue font-bold text-lg mb-2">Invierte en tu recurso más valioso: tu gente.</p>
                <p className="text-gray-600 text-sm">Con FAMI, el bienestar laboral se transforma en crecimiento organizacional.</p>
              </div>
            </div>
          </section>

          {/* Apoyos Pedagógicos */}
          <section className="bg-white rounded-2xl shadow-lg overflow-hidden p-8 md:p-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600">
                <BookOpen size={28} />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-fami-blue">Apoyos Pedagógicos</h2>
            </div>
            <p className="text-gray-700 mb-6">
              El desarrollo integral de la infancia requiere amor, conciencia y acompañamiento. Nuestro equipo pedagógico trabaja con compromiso para fortalecer las habilidades y la autonomía de los niños.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                <h4 className="font-bold text-fami-blue mb-2">Orientación Personalizada</h4>
                <p className="text-sm text-gray-600">Asesoría adaptada a las necesidades de cada niño.</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                <h4 className="font-bold text-fami-blue mb-2">Estimulación</h4>
                <p className="text-sm text-gray-600">Actividades diseñadas según su etapa evolutiva.</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                <h4 className="font-bold text-fami-blue mb-2">Escuela de Padres</h4>
                <p className="text-sm text-gray-600">Espacios para fortalecer el vínculo familiar.</p>
              </div>
            </div>
          </section>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Paquete Escolar */}
            <section className="bg-white rounded-2xl shadow-lg overflow-hidden p-8">
              <div className="flex items-center gap-3 mb-4">
                <Package size={24} className="text-fami-orange" />
                <h2 className="text-xl font-bold text-fami-blue">Paquete Escolar Integral</h2>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Ideal para grupos de mínimo 20 alumnos. Garantiza un desarrollo seguro y saludable.
              </p>
              <ul className="space-y-2 text-gray-700 text-sm mb-4">
                <li className="flex items-center gap-2"><ShieldCheck size={14} className="text-green-500"/> Certificado médico y odontológico</li>
                <li className="flex items-center gap-2"><ShieldCheck size={14} className="text-green-500"/> Coprológico</li>
                <li className="flex items-center gap-2"><ShieldCheck size={14} className="text-green-500"/> Audiometría y Visiometría</li>
              </ul>
              <p className="text-xs text-gray-500 mt-4 font-medium">Tarifas flexibles para grupos.</p>
            </section>

            {/* Servicios Adicionales */}
            <section className="bg-white rounded-2xl shadow-lg overflow-hidden p-8">
              <div className="flex items-center gap-3 mb-4">
                <PlusCircle size={24} className="text-fami-cyan" />
                <h2 className="text-xl font-bold text-fami-blue">Servicios Adicionales</h2>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-bold text-gray-700 mb-2">Valoraciones</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Médica y Odontológica</li>
                    <li>• Fonoaudiología</li>
                    <li>• Psicología</li>
                    <li>• Test de drogas</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-gray-700 mb-2">Dificultades de aprendizaje</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Terapia Ocupacional</li>
                    <li>• Psicología</li>
                    <li>• Fonoaudiología</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ServiciosPage;

