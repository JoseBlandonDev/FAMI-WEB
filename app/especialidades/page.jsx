import React from 'react';
import { Heart, Activity, Microscope, Stethoscope, Smile, Brain } from 'lucide-react';

const EspecialidadesPage = () => {
  return (
    <div className="bg-gray-50 pb-20">
      {/* Hero Banner */}
      <div className="relative h-64 md:h-80 bg-fami-blue flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/medical-icons.png')]"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Especialidades</h1>
          <div className="w-24 h-1 bg-fami-orange mx-auto rounded-full"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-10">
        <div className="space-y-12">

          {/* Servicios IPS */}
          <section className="bg-white rounded-2xl shadow-lg overflow-hidden p-8 md:p-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-fami-blue/10 rounded-full flex items-center justify-center text-fami-blue">
                <Stethoscope size={28} />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-fami-blue">Servicios IPS: Atención Integral</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">
              En Fami creemos que tu bienestar merece la mejor atención, con calidez humana y el respaldo de un equipo profesional comprometido contigo. Nuestro propósito es acompañarte en cada etapa de tu vida, brindándote soluciones de salud confiables y accesibles, siempre con un trato cercano y respetuoso.
            </p>
            <p className="text-gray-700 mb-6">
              Nos especializamos en prevención, diagnóstico y tratamiento, apoyados en tecnología de calidad y profesionales altamente capacitados para ofrecerte una experiencia integral de cuidado.
            </p>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <h3 className="font-bold text-fami-blue mb-4">Nuestros servicios:</h3>
              <ul className="grid md:grid-cols-2 gap-3 text-gray-600">
                <li className="flex items-center gap-2"><span className="w-2 h-2 bg-fami-orange rounded-full"></span> Medicina general y especializada.</li>
                <li className="flex items-center gap-2"><span className="w-2 h-2 bg-fami-orange rounded-full"></span> Consulta psicológica y apoyo emocional.</li>
                <li className="flex items-center gap-2"><span className="w-2 h-2 bg-fami-orange rounded-full"></span> Valoración física y exámenes complementarios.</li>
                <li className="flex items-center gap-2"><span className="w-2 h-2 bg-fami-orange rounded-full"></span> Exámenes clínicos y de laboratorio.</li>
                <li className="flex items-center gap-2"><span className="w-2 h-2 bg-fami-orange rounded-full"></span> Asesoría en Seguridad y Salud en el Trabajo (SST).</li>
              </ul>
            </div>
            <p className="mt-6 text-fami-blue font-medium text-center italic">
              "En Fami estamos convencidos de que la salud comienza con una buena atención."
            </p>
          </section>

          {/* Odontología */}
          <section className="bg-white rounded-2xl shadow-lg overflow-hidden p-8 md:p-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-fami-blue/10 rounded-full flex items-center justify-center text-fami-blue">
                <Smile size={28} />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-fami-blue">Odontología</h2>
            </div>
            <h3 className="text-xl text-fami-orange font-semibold mb-4">Odontología General • Especializada • Higiene Oral</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              En Fami Odontología sabemos que tu sonrisa es parte esencial de tu bienestar y confianza. Por eso te ofrecemos un cuidado integral que va desde la odontología general y especializada, hasta la higiene oral preventiva, siempre con un enfoque humano y profesional.
            </p>
            <div className="bg-blue-50 p-6 rounded-xl text-center">
              <p className="text-fami-blue font-medium">
                Recuerda: una sonrisa sana comienza con una cita cumplida. Ven a Fami Odontología y cuida tu salud oral con nosotros.
              </p>
            </div>
          </section>

          {/* Apoyo Diagnóstico */}
          <section className="bg-white rounded-2xl shadow-lg overflow-hidden p-8 md:p-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-fami-blue/10 rounded-full flex items-center justify-center text-fami-blue">
                <Activity size={28} />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-fami-blue">Apoyo Diagnóstico</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">
              En FAMI ponemos a tu disposición un completo portafolio de servicios de apoyo diagnóstico, diseñados para cuidar tu salud de manera preventiva y precisa. Contamos con equipos confiables y profesionales especializados.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {['Audiometría clínica', 'Impedanciometría', 'Optometría', 'Ecografías', 'Espirometría', 'Protectores auditivos'].map((item) => (
                <div key={item} className="bg-gray-50 px-4 py-3 rounded-lg text-center text-gray-700 font-medium border border-gray-100 hover:border-fami-blue transition-colors">
                  {item}
                </div>
              ))}
            </div>
            <p className="text-fami-orange text-center font-medium">
              Detectar a tiempo es ganar la batalla antes de que comience.
            </p>
          </section>

          {/* Laboratorio Clínico */}
          <section className="bg-white rounded-2xl shadow-lg overflow-hidden p-8 md:p-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-fami-blue/10 rounded-full flex items-center justify-center text-fami-blue">
                <Microscope size={28} />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-fami-blue">Laboratorio Clínico</h2>
            </div>
            <p className="text-gray-700 mb-6">
              En FAMI cuidamos tu salud con el respaldo de un laboratorio clínico confiable, donde encontrarás pruebas oportunas y seguras que te ayudarán a prevenir, diagnosticar y dar seguimiento a tu bienestar.
            </p>
            <ul className="grid md:grid-cols-2 gap-3 text-gray-600 mb-6">
              <li className="flex items-center gap-2"><span className="w-2 h-2 bg-fami-blue rounded-full"></span> Cuadro hemático</li>
              <li className="flex items-center gap-2"><span className="w-2 h-2 bg-fami-blue rounded-full"></span> Parcial de orina</li>
              <li className="flex items-center gap-2"><span className="w-2 h-2 bg-fami-blue rounded-full"></span> Test de embarazo</li>
              <li className="flex items-center gap-2"><span className="w-2 h-2 bg-fami-blue rounded-full"></span> Tipo de sangre</li>
              <li className="flex items-center gap-2"><span className="w-2 h-2 bg-fami-blue rounded-full"></span> Exámenes especializados</li>
            </ul>
            <p className="text-center text-gray-500 text-sm">
              Cuida tu salud hoy, para no lamentar mañana. Agenda tus exámenes en FAMI.
            </p>
          </section>

          {/* Apoyo Terapéutico */}
          <section className="bg-white rounded-2xl shadow-lg overflow-hidden p-8 md:p-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-fami-blue/10 rounded-full flex items-center justify-center text-fami-blue">
                <Brain size={28} />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-fami-blue">Apoyo Terapéutico</h2>
            </div>
            <p className="text-gray-700 mb-6">
              En FAMI creemos que la recuperación y el bienestar integral van más allá del tratamiento médico. Ofrecemos un completo servicio diseñado para fortalecer tus capacidades físicas, emocionales y sociales.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2"><Heart size={14} className="text-fami-orange"/> Terapia ocupacional</div>
              <div className="flex items-center gap-2"><Heart size={14} className="text-fami-orange"/> Fonoaudiología</div>
              <div className="flex items-center gap-2"><Heart size={14} className="text-fami-orange"/> Fisioterapia</div>
              <div className="flex items-center gap-2"><Heart size={14} className="text-fami-orange"/> Nutrición</div>
              <div className="flex items-center gap-2"><Heart size={14} className="text-fami-orange"/> Psicología</div>
              <div className="flex items-center gap-2"><Heart size={14} className="text-fami-orange"/> Trabajo social</div>
              <div className="flex items-center gap-2"><Heart size={14} className="text-fami-orange"/> Acondicionamiento físico</div>
              <div className="flex items-center gap-2"><Heart size={14} className="text-fami-orange"/> Terapia de rehabilitación</div>
              <div className="flex items-center gap-2"><Heart size={14} className="text-fami-orange"/> Terapia cardiorrespiratoria</div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default EspecialidadesPage;
