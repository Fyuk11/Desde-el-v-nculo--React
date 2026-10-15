import { motion } from 'framer-motion';
import { Quote, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const testimonials = [
  {
    id: 1,
    tutor: 'Carolina & Bruno',
    detail: 'Mestizo, 3 años',
    tag: 'Reactividad en Paseos',
    quote: 'Pasamos de paseos llenos de tensión y tirones a disfrutar volver a salir juntos. Entender el estrés detrás de su reactividad nos cambió la vida.',
    image: '/images/home/testimonio1.webp',
  },
  {
    id: 2,
    tutor: 'Gonzalo & Mateo',
    tag: 'Etapa Cachorro',
    detail: 'Beagle, 5 meses',
    quote: 'Evitamos los errores típicos de la mordida y los destrozos. La orientación desde el día 1 nos dio una tranquilidad enorme.',
    image: '/images/home/testimonio2.webp',
  },
  {
    id: 3,
    tutor: 'Valeria & Lola',
    tag: 'Perra Adoptada',
    detail: 'Mestiza, 2 años',
    quote: 'Lola llegó con muchos miedos del refugio. La co-regulación nos dio la paciencia y las herramientas exactas para ganarnos su confianza.',
    image: '/images/home/testimonio3.webp',
  },
];

export default function TestimonialsSection() {
  const navigate = useNavigate();

  const handleGoToDiagnostic = (e) => {
    e.preventDefault();
    navigate('/luno');
    setTimeout(() => {
      // Busca la sección por ID (asegúrate de que en LunoPage sea 'diagnostic' o 'diagnostico')
      const target = document.getElementById('diagnostic') || document.getElementById('diagnostico');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 150);
  };

  return (
    <section id="testimonios" className="relative py-28 bg-[#F4F1EA] text-[#1C1F1D] overflow-hidden">
      
      {/* BACKGROUND GRADIENTE EN MOVIMIENTO */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-[#3F5E4D]/15 rounded-full blur-[140px] pointer-events-none"
      />

      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -60, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-10 -right-20 w-[600px] h-[600px] bg-[#D5D0C3]/40 rounded-full blur-[150px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* ENCABEZADO */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#1C1F1D] leading-tight">
              Transformaciones que{' '}
              <span className="italic font-normal text-[#3F5E4D] block sm:inline mt-1 sm:mt-0">
                inspiran confianza.
              </span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#525754] font-light max-w-md leading-relaxed">
            La vivencia de familias que decidieron dejar atrás el adiestramiento tradicional para construir un vínculo basado en la empatía y la ciencia.
          </p>
        </div>

        {/* CARDS VISUALES DE TESTIMONIOS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {testimonials.map((item, idx) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              className="group bg-[#FFFFFF] border border-[#E2DFD7] hover:border-[#3F5E4D]/40 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between hover:-translate-y-1"
            >
              <div>
                {/* Fotografía */}
                <div className="relative h-64 overflow-hidden bg-[#EAE6DC]">
                  <img
                    src={item.image}
                    alt={item.tutor}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                  
                  {/* Badge temático */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="text-[10px] uppercase tracking-[0.15em] font-semibold px-3 py-1 rounded-full bg-[#1C1F1D]/80 backdrop-blur-md text-[#F4F1EA] border border-white/20">
                      {item.tag}
                    </span>
                  </div>

                  {/* Nombre en la Foto */}
                  <div className="absolute bottom-4 left-4 right-4 z-10 text-white">
                    <h3 className="font-serif text-xl font-normal leading-snug">
                      {item.tutor}
                    </h3>
                    <p className="text-xs text-[#E2DFD7] font-light">
                      {item.detail}
                    </p>
                  </div>
                </div>

                {/* Texto de la Cita */}
                <div className="p-6 relative">
                  <Quote className="w-8 h-8 text-[#3F5E4D]/15 absolute top-4 right-4 pointer-events-none" />
                  <p className="text-xs sm:text-sm text-[#4A4F4C] font-light leading-relaxed italic relative z-10">
                    "{item.quote}"
                  </p>
                </div>
              </div>

              {/* Pie de Card */}
              <div className="px-6 pb-6 pt-0">
                <div className="w-full h-[1px] bg-[#E2DFD7] mb-4" />
                <div className="flex items-center justify-between text-[11px] text-[#3F5E4D] font-semibold uppercase tracking-wider">
                  <span>Proceso Verificado</span>
                  <div className="w-2 h-2 rounded-full bg-[#3F5E4D]" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* CTA A LUNO DIAGNOSTICO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#1C1F1D] text-[#F4F1EA] rounded-2xl p-8 sm:p-12 border border-[#2A2E2C] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#3F5E4D]/20 rounded-full blur-[100px] pointer-events-none" />

          <div className="max-w-xl relative z-10">
            <h3 className="font-serif text-2xl sm:text-4xl font-normal mb-3">
              ¿No sabés por dónde empezar?
            </h3>
            <p className="text-sm text-[#D5D0C3] font-light leading-relaxed">
              Dejá que nuestro recomendador Luno AI analice las necesidades de tu perro y te sugiera la ruta formativa ideal en menos de 2 minutos.
            </p>
          </div>

          <button
            onClick={handleGoToDiagnostic}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#3F5E4D] text-white text-xs uppercase tracking-[0.15em] font-medium rounded-xl hover:bg-[#2F473A] transition-all duration-300 shadow-lg shadow-[#3F5E4D]/20 group relative z-10 whitespace-nowrap cursor-pointer"
          >
            <span>Evaluar Vínculo Ahora</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </motion.div>

      </div>
    </section>
  );
}