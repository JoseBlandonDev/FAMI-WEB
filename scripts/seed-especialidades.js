// Script para insertar especialidades en Supabase
// Ejecutar con: node scripts/seed-especialidades.js

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const especialidades = [
  {
    nombre: "Salud Ocupacional",
    descripcion_corta: "Servicio integral para el bienestar de colaboradores y productividad empresarial",
    descripcion: `<p>En FAMI entendemos que la salud ocupacional es clave para garantizar el bienestar de los colaboradores y la productividad de las empresas. Por eso ofrecemos un servicio integral que combina experiencia, calidad humana y tecnología confiable, pensado para cuidar a las personas en cada etapa de su vida laboral.</p>

<h3>Nuestros servicios incluyen:</h3>
<ul>
<li>Evaluaciones ocupacionales de ingreso, periódicas y de egreso, con historia clínica, fisioterapia y psicología.</li>
<li>Examen médico laboral, realizado por profesionales especializados en medicina del trabajo.</li>
<li>Pruebas diagnósticas especializadas: audiometría, espirometría, visiometría, optometría y valoración psicosensométrica.</li>
<li>Asesoría en Seguridad y Salud en el Trabajo (SST) para fortalecer la prevención y el cumplimiento normativo en tu empresa.</li>
</ul>

<p><strong>COPI:</strong> En FAMI realizamos pruebas funcionales, clínicas y complementarias adaptadas a los riesgos específicos de cada puesto de trabajo, considerando la susceptibilidad del trabajador y el nivel de exposición.</p>

<p><em>En FAMI trabajamos contigo para que cada evaluación sea una inversión en bienestar, seguridad y confianza.</em></p>`,
    imagen: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
    servicios: "Evaluaciones ocupacionales de ingreso, Evaluaciones periódicas, Evaluaciones de egreso, Examen médico laboral, Audiometría, Espirometría, Visiometría, Optometría, Valoración psicosensométrica, Asesoría SST",
    activo: true
  },
  {
    nombre: "Plan de Bienestar Empresarial",
    descripcion_corta: "Fortalece el bienestar físico, emocional y social de tu equipo de trabajo",
    descripcion: `<p>En FAMI sabemos que una empresa saludable comienza con colaboradores felices, motivados y en equilibrio. Nuestro Plan de Bienestar Empresarial va más allá de la prevención: está diseñado para fortalecer el bienestar físico, emocional y social de tu equipo, creando un entorno laboral productivo y humano.</p>

<h3>¿Qué incluye?</h3>
<ul>
<li>Exámenes de salud ocupacional para garantizar seguridad y confianza.</li>
<li>Inteligencia emocional y descargas emocionales, que promueven equilibrio y resiliencia.</li>
<li>Prevención de riesgos mecánicos, cuidando la integridad de tu equipo.</li>
<li>Pausas activas, que revitalizan cuerpo y mente.</li>
<li>Beneficios extendidos para la familia, porque el bienestar también empieza en casa.</li>
</ul>

<p>Invierte en el recurso más valioso de tu empresa: <strong>tu gente</strong>. Con FAMI, el bienestar laboral se transforma en crecimiento organizacional.</p>

<p><em>El verdadero éxito empresarial comienza con el cuidado del talento humano. Cuando las metas se alinean con el bienestar y desarrollo de los colaboradores, se fortalece la cultura interna, los valores corporativos y se impulsa un entorno laboral sano, motivador y productivo.</em></p>`,
    imagen: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    servicios: "Exámenes de salud ocupacional, Inteligencia emocional, Descargas emocionales, Prevención de riesgos mecánicos, Pausas activas, Beneficios para la familia",
    activo: true
  },
  {
    nombre: "Apoyos Pedagógicos",
    descripcion_corta: "Acompañamiento integral para el desarrollo de la infancia",
    descripcion: `<p>En FAMI creemos que cuidar a los niños es una tarea de grandes. El desarrollo integral de la infancia requiere amor, conciencia y acompañamiento, por eso nos convertimos en el aliado que camina junto a las familias en cada etapa del crecimiento.</p>

<p>Nuestro equipo pedagógico trabaja con compromiso y sensibilidad para fortalecer las habilidades, la autonomía y la felicidad de los niños, mientras apoya a padres y cuidadores en su importante labor.</p>

<h3>Nuestros servicios clave:</h3>
<ul>
<li>Orientación y asesoría pedagógica personalizada, adaptada a las necesidades de cada niño.</li>
<li>Actividades de estimulación y desarrollo, diseñadas según su etapa evolutiva.</li>
<li>Espacios de formación para padres y cuidadores, que fortalecen el vínculo familiar y la crianza consciente.</li>
</ul>

<p><em>En FAMI acompañamos a tu familia para que cada etapa de la infancia sea una oportunidad de crecer, aprender y sonreír juntos.</em></p>`,
    imagen: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
    servicios: "Orientación pedagógica personalizada, Asesoría pedagógica, Actividades de estimulación, Desarrollo infantil, Formación para padres, Formación para cuidadores, Crianza consciente",
    activo: true
  },
  {
    nombre: "Paquete Escolar",
    descripcion_corta: "Exámenes integrales para la salud y bienestar de los estudiantes",
    descripcion: `<p>En FAMI pensamos en la salud y bienestar de los estudiantes, por eso diseñamos un <strong>Paquete Escolar Integral</strong> que reúne los exámenes más importantes para garantizar su desarrollo seguro y saludable.</p>

<p>Ideal para grupos de mínimo 20 alumnos, este plan ofrece atención confiable, ágil y con la calidez que nos caracteriza.</p>

<h3>Incluye:</h3>
<ul>
<li>Certificado médico</li>
<li>Certificado odontológico</li>
<li>Coprológico</li>
<li>Audiometría</li>
<li>Visiometría</li>
</ul>

<p><strong>Tarifas flexibles y negociables</strong>, de acuerdo con el número de estudiantes.</p>

<p><em>Con FAMI, cuidar la salud de tus alumnos es más fácil, accesible y seguro.</em></p>`,
    imagen: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80",
    servicios: "Certificado médico, Certificado odontológico, Coprológico, Audiometría, Visiometría",
    activo: true
  },
  {
    nombre: "Servicios Adicionales",
    descripcion_corta: "Amplia gama de servicios complementarios para la salud integral",
    descripcion: `<p>En FAMI ofrecemos una amplia gama de servicios complementarios diseñados para cuidar la salud integral y apoyar el desarrollo de cada persona. Nuestro equipo de profesionales está listo para acompañarte con calidez y compromiso en cada proceso.</p>

<h3>Valoraciones y exámenes:</h3>
<ul>
<li>Valoración médica</li>
<li>Valoración odontológica</li>
<li>Coprológico</li>
<li>Visiometría</li>
<li>Audiometría</li>
<li>Valoración en fonoaudiología</li>
<li>Valoración en psicología</li>
<li>Test de drogas (x2)</li>
</ul>

<h3>Apoyo en dificultades de aprendizaje:</h3>
<ul>
<li>Apoyo terapéutico especializado</li>
<li>Terapia de fonoaudiología</li>
<li>Terapia de psicología</li>
<li>Terapia ocupacional</li>
</ul>

<p><em>En FAMI cuidamos la salud física, emocional y cognitiva, ofreciendo soluciones integrales para que cada persona alcance su máximo potencial.</em></p>`,
    imagen: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&q=80",
    servicios: "Valoración médica, Valoración odontológica, Coprológico, Visiometría, Audiometría, Fonoaudiología, Psicología, Test de drogas, Apoyo terapéutico, Terapia ocupacional",
    activo: true
  },
  {
    nombre: "Servicios IPS - Atención Integral",
    descripcion_corta: "Atención integral al paciente con calidez humana y profesionalismo",
    descripcion: `<p>En Fami creemos que tu bienestar merece la mejor atención, con calidez humana y el respaldo de un equipo profesional comprometido contigo. Nuestro propósito es acompañarte en cada etapa de tu vida, brindándote soluciones de salud confiables y accesibles, siempre con un trato cercano y respetuoso.</p>

<p>Nos especializamos en prevención, diagnóstico y tratamiento, apoyados en tecnología de calidad y profesionales altamente capacitados para ofrecerte una experiencia integral de cuidado.</p>

<h3>Nuestros servicios:</h3>
<ul>
<li>Medicina general y especializada.</li>
<li>Consulta psicológica y apoyo emocional.</li>
<li>Valoración física y exámenes complementarios.</li>
<li>Exámenes clínicos y de laboratorio según riesgos ocupacionales.</li>
<li>Asesoría en Seguridad y Salud en el Trabajo (SST).</li>
</ul>

<p><em>En Fami estamos convencidos de que la salud comienza con una buena atención. Ven y descubre un lugar donde tú y tu familia se sentirán acompañados desde el primer momento.</em></p>`,
    imagen: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80",
    servicios: "Medicina general, Medicina especializada, Consulta psicológica, Apoyo emocional, Valoración física, Exámenes complementarios, Exámenes de laboratorio, Asesoría SST",
    activo: true
  },
  {
    nombre: "Odontología",
    descripcion_corta: "Odontología General, Especializada e Higiene Oral",
    descripcion: `<p>En Fami Odontología sabemos que tu sonrisa es parte esencial de tu bienestar y confianza. Por eso te ofrecemos un cuidado integral que va desde la <strong>odontología general y especializada</strong>, hasta la <strong>higiene oral preventiva</strong>, siempre con un enfoque humano y profesional.</p>

<p>Nuestro equipo está comprometido en brindarte una atención cálida, cercana y respaldada por la experiencia, para que disfrutes de una boca sana y una sonrisa radiante en cada etapa de tu vida.</p>

<p><em>Recuerda: una sonrisa sana comienza con una cita cumplida. Ven a Fami Odontología y cuida tu salud oral con nosotros.</em></p>`,
    imagen: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&q=80",
    servicios: "Odontología general, Odontología especializada, Higiene oral preventiva, Limpieza dental, Blanqueamiento, Ortodoncia, Endodoncia",
    activo: true
  },
  {
    nombre: "Apoyo Diagnóstico",
    descripcion_corta: "Servicios de diagnóstico preventivo y preciso con equipos confiables",
    descripcion: `<p>En FAMI ponemos a tu disposición un completo portafolio de servicios de apoyo diagnóstico, diseñados para cuidar tu salud de manera preventiva y precisa.</p>

<p>Contamos con equipos confiables y profesionales especializados que te acompañan en cada examen, asegurando resultados claros y oportunos para tu bienestar.</p>

<h3>Nuestros servicios de apoyo diagnóstico:</h3>
<ul>
<li>Audiometría clínica</li>
<li>Impedanciometría</li>
<li>Optometría</li>
<li>Ecografías</li>
<li>Espirometría</li>
<li>Protectores auditivos</li>
<li>Visiometría</li>
<li>Electrocardiograma</li>
</ul>

<p><em>Detectar a tiempo es ganar la batalla antes de que comience.</em></p>`,
    imagen: "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=800&q=80",
    servicios: "Audiometría clínica, Impedanciometría, Optometría, Ecografías, Espirometría, Protectores auditivos, Visiometría, Electrocardiograma",
    activo: true
  }
];

async function seedEspecialidades() {
  console.log('Iniciando inserción de especialidades...\n');

  for (const esp of especialidades) {
    try {
      const { data, error } = await supabase
        .from('especialidades')
        .insert([esp])
        .select();

      if (error) {
        console.error(`Error al insertar "${esp.nombre}":`, error.message);
      } else {
        console.log(`✓ Creada: ${esp.nombre}`);
      }
    } catch (err) {
      console.error(`Error inesperado con "${esp.nombre}":`, err.message);
    }
  }

  console.log('\n¡Proceso completado!');
}

seedEspecialidades();
