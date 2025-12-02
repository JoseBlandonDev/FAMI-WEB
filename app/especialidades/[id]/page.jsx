import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Phone, Clock, MapPin, CheckCircle, ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';

const especialidades = [
  {
    id: 1,
    nombre: 'Medicina General',
    descripcion: 'Atención primaria y diagnóstico general',
    descripcionLarga: 'La Medicina General es la especialidad médica que proporciona atención integral al paciente, abordando los problemas de salud más comunes. Nuestros médicos generales están capacitados para diagnosticar, tratar y prevenir una amplia gama de enfermedades, así como para orientar a los pacientes hacia especialistas cuando sea necesario.',
    servicios: [
      'Consulta médica general',
      'Control de enfermedades crónicas',
      'Certificados médicos',
      'Promoción y prevención de la salud',
      'Atención de urgencias menores'
    ],
    imagen: '/images/medicina-general.jpg'
  },
  {
    id: 2,
    nombre: 'Medicina Interna',
    descripcion: 'Diagnóstico y tratamiento de enfermedades en adultos',
    descripcionLarga: 'La Medicina Interna es una especialidad centrada en la atención integral del adulto, especializándose en el diagnóstico y tratamiento de enfermedades que afectan los órganos internos. Nuestros internistas son expertos en el manejo de pacientes con múltiples condiciones médicas.',
    servicios: [
      'Evaluación integral del paciente adulto',
      'Manejo de enfermedades crónicas complejas',
      'Diagnóstico de enfermedades sistémicas',
      'Seguimiento de pacientes hospitalizados',
      'Preparación prequirúrgica'
    ],
    imagen: '/images/medicina-interna.jpg'
  },
  {
    id: 3,
    nombre: 'Pediatría',
    descripcion: 'Atención médica especializada para niños',
    descripcionLarga: 'La Pediatría es la rama de la medicina dedicada al cuidado de la salud de bebés, niños y adolescentes. Nuestros pediatras están especialmente entrenados para entender las necesidades únicas de los pacientes jóvenes y sus familias.',
    servicios: [
      'Control de crecimiento y desarrollo',
      'Vacunación según esquema',
      'Atención de enfermedades infantiles',
      'Orientación nutricional pediátrica',
      'Evaluación del neurodesarrollo'
    ],
    imagen: '/images/pediatria.jpg'
  },
  {
    id: 4,
    nombre: 'Ginecología y Obstetricia',
    descripcion: 'Salud de la mujer y atención prenatal',
    descripcionLarga: 'La Ginecología y Obstetricia se especializa en la salud del sistema reproductivo femenino y el cuidado durante el embarazo. Ofrecemos atención integral para todas las etapas de la vida de la mujer.',
    servicios: [
      'Control prenatal',
      'Citología y colposcopia',
      'Planificación familiar',
      'Atención de climaterio y menopausia',
      'Ecografías obstétricas'
    ],
    imagen: '/images/ginecologia.jpg'
  },
  {
    id: 5,
    nombre: 'Cardiología',
    descripcion: 'Diagnóstico y tratamiento de enfermedades del corazón',
    descripcionLarga: 'La Cardiología es la especialidad médica dedicada al estudio, diagnóstico y tratamiento de las enfermedades del corazón y del sistema circulatorio. Contamos con tecnología avanzada para evaluaciones cardíacas completas.',
    servicios: [
      'Electrocardiograma',
      'Ecocardiograma',
      'Prueba de esfuerzo',
      'Holter de ritmo y presión',
      'Evaluación de riesgo cardiovascular'
    ],
    imagen: '/images/cardiologia.jpg'
  },
  {
    id: 6,
    nombre: 'Dermatología',
    descripcion: 'Tratamiento de enfermedades de la piel',
    descripcionLarga: 'La Dermatología se encarga del diagnóstico y tratamiento de las enfermedades de la piel, cabello y uñas. Nuestros dermatólogos ofrecen atención para condiciones tanto médicas como estéticas.',
    servicios: [
      'Diagnóstico de lesiones cutáneas',
      'Tratamiento de acné y rosácea',
      'Detección de cáncer de piel',
      'Manejo de dermatitis y alergias',
      'Procedimientos dermatológicos menores'
    ],
    imagen: '/images/dermatologia.jpg'
  },
  {
    id: 7,
    nombre: 'Oftalmología',
    descripcion: 'Cuidado y tratamiento de los ojos',
    descripcionLarga: 'La Oftalmología es la especialidad dedicada al diagnóstico y tratamiento de las enfermedades del ojo y sus anexos. Ofrecemos exámenes visuales completos y tratamiento de diversas patologías oculares.',
    servicios: [
      'Examen visual completo',
      'Fondo de ojo',
      'Tonometría (presión ocular)',
      'Tratamiento de glaucoma y cataratas',
      'Adaptación de lentes'
    ],
    imagen: '/images/oftalmologia.jpg'
  },
  {
    id: 8,
    nombre: 'Otorrinolaringología',
    descripcion: 'Oído, nariz y garganta',
    descripcionLarga: 'La Otorrinolaringología se especializa en el diagnóstico y tratamiento de enfermedades del oído, nariz, garganta y estructuras relacionadas de cabeza y cuello.',
    servicios: [
      'Evaluación auditiva',
      'Tratamiento de sinusitis',
      'Manejo de vértigo',
      'Atención de amigdalitis',
      'Procedimientos ambulatorios ORL'
    ],
    imagen: '/images/otorrino.jpg'
  },
  {
    id: 9,
    nombre: 'Traumatología y Ortopedia',
    descripcion: 'Lesiones y enfermedades del sistema musculoesquelético',
    descripcionLarga: 'La Traumatología y Ortopedia se dedica al estudio, prevención y tratamiento de las lesiones y enfermedades del aparato locomotor: huesos, músculos, articulaciones, tendones y ligamentos.',
    servicios: [
      'Atención de fracturas y luxaciones',
      'Tratamiento de lesiones deportivas',
      'Manejo de artritis y artrosis',
      'Infiltraciones articulares',
      'Rehabilitación postquirúrgica'
    ],
    imagen: '/images/traumatologia.jpg'
  },
  {
    id: 10,
    nombre: 'Neurología',
    descripcion: 'Trastornos del sistema nervioso',
    descripcionLarga: 'La Neurología es la especialidad médica dedicada al estudio del sistema nervioso central y periférico. Nuestros neurólogos diagnostican y tratan condiciones que afectan el cerebro, médula espinal y nervios.',
    servicios: [
      'Evaluación neurológica completa',
      'Electroencefalograma',
      'Tratamiento de cefaleas y migrañas',
      'Manejo de epilepsia',
      'Atención de enfermedades neurodegenerativas'
    ],
    imagen: '/images/neurologia.jpg'
  },
  {
    id: 11,
    nombre: 'Psiquiatría',
    descripcion: 'Salud mental y trastornos psiquiátricos',
    descripcionLarga: 'La Psiquiatría es la especialidad médica dedicada al estudio, diagnóstico y tratamiento de los trastornos mentales. Nuestros psiquiatras ofrecen evaluación integral y tratamiento farmacológico cuando es necesario.',
    servicios: [
      'Evaluación psiquiátrica integral',
      'Tratamiento de depresión y ansiedad',
      'Manejo de trastornos del sueño',
      'Atención de trastornos de personalidad',
      'Seguimiento farmacológico'
    ],
    imagen: '/images/psiquiatria.jpg'
  },
  {
    id: 12,
    nombre: 'Psicología',
    descripcion: 'Evaluación y terapia psicológica',
    descripcionLarga: 'El servicio de Psicología ofrece evaluación, diagnóstico y tratamiento de dificultades emocionales, conductuales y cognitivas. Nuestros psicólogos utilizan diversas técnicas terapéuticas adaptadas a cada paciente.',
    servicios: [
      'Psicoterapia individual',
      'Terapia de pareja y familia',
      'Evaluación psicológica',
      'Intervención en crisis',
      'Orientación vocacional'
    ],
    imagen: '/images/psicologia.jpg'
  },
  {
    id: 13,
    nombre: 'Nutrición y Dietética',
    descripcion: 'Planes alimenticios y nutrición clínica',
    descripcionLarga: 'El servicio de Nutrición y Dietética ofrece evaluación nutricional y planes alimentarios personalizados. Nuestros nutricionistas ayudan a prevenir y tratar enfermedades relacionadas con la alimentación.',
    servicios: [
      'Evaluación nutricional completa',
      'Planes de alimentación personalizados',
      'Nutrición deportiva',
      'Manejo de obesidad y sobrepeso',
      'Nutrición en enfermedades crónicas'
    ],
    imagen: '/images/nutricion.jpg'
  },
  {
    id: 14,
    nombre: 'Fisioterapia',
    descripcion: 'Rehabilitación física y terapia',
    descripcionLarga: 'El servicio de Fisioterapia se enfoca en la prevención, tratamiento y rehabilitación de lesiones y disfunciones del movimiento. Utilizamos técnicas manuales y tecnología para recuperar la funcionalidad.',
    servicios: [
      'Rehabilitación musculoesquelética',
      'Terapia postquirúrgica',
      'Fisioterapia respiratoria',
      'Electroterapia y ultrasonido',
      'Ejercicio terapéutico'
    ],
    imagen: '/images/fisioterapia.jpg'
  },
  {
    id: 15,
    nombre: 'Odontología',
    descripcion: 'Salud bucal y tratamientos dentales',
    descripcionLarga: 'El servicio de Odontología ofrece atención integral para la salud bucal. Nuestros odontólogos realizan procedimientos preventivos, restaurativos y estéticos para mantener una sonrisa saludable.',
    servicios: [
      'Limpieza dental profesional',
      'Tratamiento de caries',
      'Extracciones dentales',
      'Endodoncia',
      'Blanqueamiento dental'
    ],
    imagen: '/images/odontologia.jpg'
  },
  {
    id: 16,
    nombre: 'Urología',
    descripcion: 'Sistema urinario y salud masculina',
    descripcionLarga: 'La Urología se especializa en el diagnóstico y tratamiento de las enfermedades del sistema urinario en ambos sexos y del sistema reproductor masculino.',
    servicios: [
      'Evaluación prostática',
      'Tratamiento de infecciones urinarias',
      'Manejo de cálculos renales',
      'Atención de incontinencia',
      'Estudios urodinámicos'
    ],
    imagen: '/images/urologia.jpg'
  },
  {
    id: 17,
    nombre: 'Gastroenterología',
    descripcion: 'Sistema digestivo y enfermedades gastrointestinales',
    descripcionLarga: 'La Gastroenterología se dedica al estudio del aparato digestivo y sus enfermedades. Nuestros gastroenterólogos diagnostican y tratan condiciones desde el esófago hasta el colon.',
    servicios: [
      'Endoscopia digestiva',
      'Colonoscopia',
      'Tratamiento de gastritis y úlceras',
      'Manejo de colon irritable',
      'Evaluación de enfermedades hepáticas'
    ],
    imagen: '/images/gastroenterologia.jpg'
  },
  {
    id: 18,
    nombre: 'Neumología',
    descripcion: 'Enfermedades respiratorias y pulmonares',
    descripcionLarga: 'La Neumología es la especialidad dedicada al estudio y tratamiento de las enfermedades del aparato respiratorio. Ofrecemos diagnóstico y tratamiento integral de patologías pulmonares.',
    servicios: [
      'Espirometría',
      'Tratamiento de asma y EPOC',
      'Evaluación de apnea del sueño',
      'Manejo de infecciones respiratorias',
      'Rehabilitación pulmonar'
    ],
    imagen: '/images/neumologia.jpg'
  },
  {
    id: 19,
    nombre: 'Endocrinología',
    descripcion: 'Trastornos hormonales y metabólicos',
    descripcionLarga: 'La Endocrinología se especializa en el sistema endocrino y sus trastornos. Nuestros endocrinólogos tratan condiciones como diabetes, enfermedades tiroideas y trastornos metabólicos.',
    servicios: [
      'Control de diabetes',
      'Evaluación tiroidea',
      'Manejo de obesidad',
      'Tratamiento de osteoporosis',
      'Evaluación hormonal'
    ],
    imagen: '/images/endocrinologia.jpg'
  },
  {
    id: 20,
    nombre: 'Reumatología',
    descripcion: 'Enfermedades articulares y autoinmunes',
    descripcionLarga: 'La Reumatología se dedica al diagnóstico y tratamiento de las enfermedades del aparato locomotor y las enfermedades autoinmunes sistémicas.',
    servicios: [
      'Evaluación de artritis',
      'Tratamiento de lupus',
      'Manejo de fibromialgia',
      'Infiltraciones articulares',
      'Seguimiento de enfermedades autoinmunes'
    ],
    imagen: '/images/reumatologia.jpg'
  },
  {
    id: 21,
    nombre: 'Nefrología',
    descripcion: 'Enfermedades renales',
    descripcionLarga: 'La Nefrología es la especialidad dedicada al estudio de la función renal y sus enfermedades. Nuestros nefrólogos tratan desde infecciones hasta enfermedades renales crónicas.',
    servicios: [
      'Evaluación de función renal',
      'Tratamiento de enfermedad renal crónica',
      'Manejo de hipertensión secundaria',
      'Control de pacientes en diálisis',
      'Preparación para trasplante renal'
    ],
    imagen: '/images/nefrologia.jpg'
  },
  {
    id: 22,
    nombre: 'Cirugía General',
    descripcion: 'Procedimientos quirúrgicos generales',
    descripcionLarga: 'La Cirugía General abarca procedimientos quirúrgicos del abdomen, sistema digestivo, glándulas y otras estructuras. Nuestros cirujanos realizan procedimientos tanto abiertos como mínimamente invasivos.',
    servicios: [
      'Cirugía de hernias',
      'Colecistectomía',
      'Apendicectomía',
      'Cirugía laparoscópica',
      'Procedimientos ambulatorios'
    ],
    imagen: '/images/cirugia.jpg'
  },
  {
    id: 23,
    nombre: 'Medicina del Trabajo',
    descripcion: 'Salud ocupacional y prevención laboral',
    descripcionLarga: 'La Medicina del Trabajo se enfoca en la prevención y tratamiento de enfermedades relacionadas con el trabajo. Realizamos evaluaciones ocupacionales y programas de promoción de la salud laboral.',
    servicios: [
      'Exámenes médicos ocupacionales',
      'Evaluación de aptitud laboral',
      'Vigilancia epidemiológica',
      'Programas de prevención',
      'Asesoría en riesgos laborales'
    ],
    imagen: '/images/medicina-trabajo.jpg'
  },
  {
    id: 24,
    nombre: 'Medicina Familiar',
    descripcion: 'Atención integral para toda la familia',
    descripcionLarga: 'La Medicina Familiar proporciona atención continua e integral a personas de todas las edades. Nuestros médicos familiares conocen el contexto de cada paciente y su familia para ofrecer un cuidado personalizado.',
    servicios: [
      'Atención integral de la familia',
      'Promoción y prevención',
      'Manejo de enfermedades crónicas',
      'Orientación en salud',
      'Seguimiento longitudinal'
    ],
    imagen: '/images/medicina-familiar.jpg'
  },
];

function getEspecialidad(id) {
  return especialidades.find(esp => esp.id === parseInt(id)) || null;
}

function getOtrasEspecialidades(currentId) {
  return especialidades
    .filter(esp => esp.id !== parseInt(currentId))
    .slice(0, 6);
}

export default async function EspecialidadDetailPage({ params }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  if (!id) {
    notFound();
  }

  const especialidad = getEspecialidad(id);

  if (!especialidad) {
    notFound();
  }

  const otrasEspecialidades = getOtrasEspecialidades(id);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-fami-blue transition-colors">
              FAMI
            </Link>
            <ChevronRight size={14} />
            <Link href="/especialidades" className="hover:text-fami-blue transition-colors">
              Especialidades
            </Link>
            <ChevronRight size={14} />
            <span className="text-gray-700 truncate max-w-xs">{especialidad.nombre}</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <div className="bg-fami-blue py-12 md:py-16">
        <div className="container mx-auto px-4">
          <Link
            href="/especialidades"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft size={20} />
            Volver a especialidades
          </Link>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            {especialidad.nombre}
          </h1>
          <p className="text-white/80 text-lg mt-4 max-w-2xl">
            {especialidad.descripcion}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Content */}
          <div className="flex-1 lg:max-w-3xl">
            {/* Description */}
            <div className="bg-white rounded-xl p-8 shadow-sm mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Acerca de esta especialidad
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {especialidad.descripcionLarga}
              </p>
            </div>

            {/* Services */}
            <div className="bg-white rounded-xl p-8 shadow-sm mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Servicios que ofrecemos
              </h2>
              <ul className="space-y-4">
                {especialidad.servicios.map((servicio, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="text-fami-orange flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-gray-600">{servicio}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact CTA */}
            <div className="bg-gradient-to-r from-fami-blue to-fami-blue/90 rounded-xl p-8 text-white">
              <h3 className="text-xl font-bold mb-4">
                ¿Necesitas una cita en {especialidad.nombre}?
              </h3>
              <p className="text-white/80 mb-6">
                Contáctanos para agendar tu consulta con nuestros especialistas.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contacto"
                  className="inline-flex items-center gap-2 bg-white text-fami-blue px-6 py-3 rounded-lg font-semibold hover:bg-fami-orange hover:text-white transition-colors"
                >
                  <Phone size={18} />
                  Contactar
                </Link>
                <Link
                  href="/localizacion"
                  className="inline-flex items-center gap-2 bg-white/20 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/30 transition-colors"
                >
                  <MapPin size={18} />
                  Ubicación
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:w-80 flex-shrink-0">
            <div className="sticky top-24">
              {/* Schedule Info */}
              <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Clock className="text-fami-orange" size={20} />
                  Horario de atención
                </h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li className="flex justify-between">
                    <span>Lunes - Viernes</span>
                    <span className="font-medium">7:00 AM - 6:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sábados</span>
                    <span className="font-medium">8:00 AM - 12:00 PM</span>
                  </li>
                </ul>
              </div>

              {/* Other Specialties */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4 pb-3 border-b-2 border-fami-orange">
                  Otras especialidades
                </h3>
                <div className="space-y-3">
                  {otrasEspecialidades.map((esp) => (
                    <Link
                      key={esp.id}
                      href={`/especialidades/${esp.id}`}
                      className="block p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                    >
                      <span className="text-sm font-medium text-gray-700 group-hover:text-fami-blue transition-colors">
                        {esp.nombre}
                      </span>
                    </Link>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <Link
                    href="/especialidades"
                    className="text-fami-blue hover:text-fami-orange font-medium text-sm transition-colors"
                  >
                    Ver todas las especialidades →
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
