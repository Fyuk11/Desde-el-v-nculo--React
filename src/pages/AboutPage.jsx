import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Heart, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  // Garantizar scroll arriba al cargar la vista
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#F4F1EA] text-[#1C1F1D] min-h-screen pt-20 sm:pt-28">
      
      {/* 1. HERO SOBRE MÍ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-6 sm:pt-8 pb-12 sm:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
          
          {/* Imagen Principal */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative overflow-hidden bg-[#E2DFD7] border border-[#E2DFD7] rounded-xl shadow-lg">
              <img 
                src="/images/home/sobre-miv1.webp" 
                alt="Rodrigo con Luna y Keef" 
                className="w-full h-[400px] sm:h-[520px] object-cover object-center"
                onError={(e) => { 
                  e.target.onerror = null; 
                  e.target.src = "https://placehold.co/500x600/E2DFD7/3F5E4D?text=Rodrigo+y+Luna"; 
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 p-4 sm:p-5 bg-[#1C1F1D]/85 backdrop-blur-md border border-white/10 text-white rounded-lg">
                <p className="font-serif text-lg sm:text-xl">Rodrigo & Luna</p>
                <p className="text-xs text-[#D5D0C3] font-light mt-0.5">Fundador & Educador Canino Sistémico</p>
              </div>
            </div>
          </motion.div>

          {/* Encabezado e Introducción */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7 space-y-4 sm:space-y-6"
          >
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#3F5E4D] border-b border-[#3F5E4D] pb-1 inline-block">
              Sobre mí
            </span>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-[1.15] text-[#1C1F1D]">
              Educando desde la <span className="italic font-normal text-[#3F5E4D]">empatía emocional</span> y la ciencia etológica.
            </h1>

            <p className="text-base sm:text-xl text-[#525754] font-light leading-relaxed">
              Hola, soy Rodrigo. Acompaño a familias a transformar la relación con sus perros descomprimiendo el estrés, entendiendo el lenguaje canino y construyendo un vínculo seguro sin sometimiento ni premios mecánicos.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4 sm:gap-8 text-xs uppercase tracking-widest text-[#3F5E4D] font-medium border-t border-[#E2DFD7]">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 shrink-0" />
                <span>Educación Basada en Vínculo</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 shrink-0" />
                <span>Enfoque Sistémico-Emocional-Cognitivo</span>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 2. MI HISTORIA / SOBRE MÍ COMPLETO */}
      <section className="py-16 sm:py-24 bg-[#EAE6DC] border-y border-[#E2DFD7]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-12 space-y-8 sm:space-y-10">
          
          <div className="space-y-2 sm:space-y-3">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#3F5E4D]">
              El Camino Recorrido
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-normal text-[#1C1F1D] leading-tight">
              Una visión consciente sobre el vínculo canino
            </h2>
          </div>

          <div className="space-y-5 sm:space-y-6 text-sm sm:text-lg text-[#4A4F4C] font-light leading-relaxed">
            <p>
              Siempre los vi como seres sintientes, porque lo son. Tienen mil expresiones, gestos y actitudes, y cada uno tiene su propia personalidad. Es hermoso ir descubriendo al ser con el que compartimos la vida, un momento o un simple cruce de caminos.
            </p>

            <p>
              Cuando decidí capacitarme en el mundo canino, me encontré con muchísimos adiestradores que trabajaban con métodos aversivos, castigos, collares y demás. Yo no podría hacer eso: no vibra conmigo esa manera de relacionarse con otros seres.
            </p>

            <p>
              Hasta que encontré el enfoque Sistémico-Emocional-Cognitivo, una educación canina de tercera generación. Lo sentí alineado con mi manera de ver y de vincularme con los perros. Busqué más información, hice el curso y di el paso. Pude comprender, desde un lado más técnico y científico, muchas cosas que ya intuía y sabía por mi relación con Luna y Keef, mis perritos maestros. Agradezco haber dado ese paso.
            </p>

            <p>
              Por eso comparto tanto en mis redes: es contenido educativo para que llegue a la mayor cantidad de seres posible. Y por eso armé los protocolos y el curso, para acompañarte con herramientas prácticas en cada etapa de la vida de tu compañero.
            </p>

            <blockquote className="my-6 sm:my-10 py-6 sm:py-8 px-5 sm:px-6 border-l-2 border-[#3F5E4D] italic font-serif text-xl sm:text-3xl text-[#1C1F1D] bg-[#F4F1EA]/70 rounded-r-lg">
              "Un paseo con tu compañero puede hasta salvarte en momentos desafiantes. Más de una vez Luna me sacó a pasear en mis días más grises: venir a buscarte y arrancarte una sonrisa con una simple carita o un gesto. Son angelitos, seres maravillosos."
            </blockquote>

            <p>
              Son curiosos, y esa curiosidad debería ser recíproca, porque lo dan todo: nos aman, nos enseñan, nos acompañan, están siempre y no te abandonan, porque son incondicionales. Y el hecho de haberse encontrado, aunque sea por un momento, ya es algo maravilloso.
            </p>
          </div>

          {/* Cierre emocional */}
          <div className="pt-6 sm:pt-8 border-t border-[#D5D0C3] flex flex-col items-start space-y-1">
            <p className="font-serif italic text-lg sm:text-xl text-[#1C1F1D]">Simplemente, agradecer.</p>
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-[#3F5E4D]">Desde el vínculo.</p>
          </div>

        </div>
      </section>

      {/* 3. CTA FINAL DE LA PÁGINA */}
      <section className="bg-[#1C1F1D] text-[#F4F1EA] py-16 sm:py-24 border-t border-[#2A2E2C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-end">
            
            {/* Texto explicativo */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6">
              <div className="flex items-center gap-2 text-[#88ab98]">
                <span className="text-xs uppercase tracking-[0.2em] font-semibold">
                  El Siguiente Paso
                </span>
              </div>

              <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-normal leading-tight text-white">
                ¿Listos para empezar a construir una convivencia en calma?
              </h2>

              <p className="text-sm sm:text-lg text-[#D5D0C3] font-light leading-relaxed max-w-2xl">
                Elegí la ruta que mejor se adapte a tu momento actual: explorá nuestras guías y cursos específicos o dejá que Luno AI analice tu caso.
              </p>
            </div>

            {/* Acciones directas */}
            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-3 sm:gap-4">
              
              {/* CTA 1: Ver Productos */}
              <Link
                to="/#programas"
                className="group flex items-center justify-between p-5 sm:p-6 bg-[#252927] border border-[#3A3F3C] hover:border-[#88ab98] transition-all duration-300 rounded-xl"
              >
                <div>
                  <span className="block text-[10px] uppercase tracking-[0.2em] text-[#88ab98] mb-1 font-semibold">
                    Catálogo Completo
                  </span>
                  <span className="font-serif text-base sm:text-lg text-white group-hover:text-[#88ab98] transition-colors">
                    Ver Productos & Programas
                  </span>
                </div>
                <ArrowUpRight className="w-5 h-5 text-[#88ab98] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform shrink-0" />
              </Link>

              {/* CTA 2: Evaluar Mi Vínculo (Luno AI) */}
              <Link
                to="/luno"
                className="group flex items-center justify-between p-5 sm:p-6 bg-[#171A18] border border-[#2A2E2C] hover:border-[#525754] transition-all duration-300 rounded-xl"
              >
                <div>
                  <span className="block text-[10px] uppercase tracking-[0.2em] text-[#A3A099] mb-1 font-semibold">
                    Diagnóstico Guiado
                  </span>
                  <span className="font-serif text-base sm:text-lg text-[#E8E6E1] group-hover:text-white transition-colors">
                    Evaluar mi vínculo con Luno AI
                  </span>
                </div>
                <ArrowUpRight className="w-5 h-5 text-[#A3A099] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform shrink-0" />
              </Link>

            </div>

          </div>

        </div>
      </section>

    </div>
  );
}