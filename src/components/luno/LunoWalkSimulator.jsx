import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  RotateCcw, 
  Send, 
  Zap, 
  Check,
  MailCheck
} from 'lucide-react';

export default function LunoWalkSimulator() {
  const scenarios = [
    {
      id: 1,
      tag: 'LA SALIDA',
      title: 'El ritual en la puerta de casa',
      subtitle: 'Escuchás la correa, tu perro empieza a dar saltos, jadear o llorar de la ansiedad antes de cruzar el umbral.',
      img: '/images/luno/paseo1.webp',
      question: '¿Cómo solés manejar esta sobreexcitación inicial?',
      options: [
        {
          label: 'A) Le abro la puerta rápido para que salga y descargue esa energía afuera.',
          feedback: 'Salir en un estado de excitación 10/10 predispone a un paseo reactivo. La emoción con la que cruza la puerta es la emoción que sostiene los primeros 15 minutos de calle.'
        },
        {
          label: 'B) Suelto la correa, me alejo y espero a que baje las pulsaciones para volver a intentar.',
          feedback: '¡Exacto! Comunicás que el premio (salir) solo ocurre en estado de autorregulación. Le enseñás a gestionar su propia frustración sin subir el tono de voz.'
        },
        {
          label: 'C) Le doy la orden de "Sentado" enérgicamente hasta que me obedezca.',
          feedback: 'Un "sentado" bajo tensión es solo una tapa a presión. El cuerpo está quieto, pero la mente sigue acelerada. Buscamos calma mental real, no solo obediencia física.'
        }
      ]
    },
    {
      id: 2,
      tag: 'EL CRUCE',
      title: 'Aparición de estímulos u otros perros',
      subtitle: 'A mitad de cuadra divisa a otro perro a 20 metros. Se clava, fija la mirada y tensiona el lomo.',
      img: '/images/luno/paseo2.webp',
      question: '¿Cuál es tu respuesta habitual en este punto?',
      options: [
        {
          label: 'A) Acorto la correa al máximo y le pido que me mire a los ojos.',
          feedback: 'Acortar la correa aumenta la tensión mecánica y la amenaza percibida. Exigir contacto visual directo le impide monitorear su entorno, aumentando su inseguridad.'
        },
        {
          label: 'B) Aplico un tirón seco de correa para cortar la mirada fijada.',
          feedback: 'El tirón físico gatilla el reflejo de oposición (tirar más fuerte) y asocia al otro perro con dolor o molestia en el cuello, cronificando la reactividad.'
        },
        {
          label: 'C) Genero distancia en arco (curva) y le permito olfatear el piso.',
          feedback: '¡La mejor decisión! En el lenguaje canino, las trayectorias curvas son señales de paz. Olfatear baja la frecuencia cardíaca de forma inmediata.'
        }
      ]
    },
    {
      id: 3,
      tag: 'LA CONEXIÓN',
      title: 'Paseos apurados y "sordera de señal"',
      subtitle: 'Camina tirando hacia adelante sin registrarte, con la nariz pegada al piso o apresurando el paso continuamente.',
      img: '/images/luno/paseo3.webp',
      question: '¿Cómo reaccionás cuando sentís que está "en su mundo"?',
      options: [
        {
          label: 'A) Apuro el paso para trotar con él y cansar su energía física.',
          feedback: 'Aumentar la velocidad en un perro acelerado eleva el cortisol y la adrenalina. Lo que cansa de forma saludable es la estimulación cognitiva, no el desgaste mecánico.'
        },
        {
          label: 'B) Me detengo, me vuelvo estatua y recompenso la primera mirada voluntaria.',
          feedback: '¡Impecable! Al frenar la inercia, el perro debe recalcular. Cuando decide mirarte sin que se lo pidas, premiás la elección consciente de vincularse.'
        },
        {
          label: 'C) Le repito su nombre constantemente para que no pierda el foco.',
          feedback: 'Repetir la señal en medio de la sobreestimulación genera "sordera de señal". El nombre pierde valor y se convierte en ruido blanco de fondo.'
        }
      ]
    }
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const isFinalStep = currentStep === scenarios.length;
  const scenario = !isFinalStep ? scenarios[currentStep] : null;

  const handleSelect = (idx) => {
    setSelectedOption(idx);
  };

  const handleNext = () => {
    if (currentStep < scenarios.length) {
      setDirection(1);
      setCurrentStep((prev) => prev + 1);
      setSelectedOption(null);
    }
  };

  const handleReset = () => {
    setDirection(-1);
    setCurrentStep(0);
    setSelectedOption(null);
    setSubmitted(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);

    try {
      await fetch('https://hook.us2.make.com/cmubpawqxtqsvj6vkxou3yahhw5ltdyk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, group_id: '186032056005821951' })
      });

      setSubmitted(true);
    } catch (error) {
      console.error('Error al registrar email:', error);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const slideVariants = {
    initial: (dir) => ({
      x: dir > 0 ? 40 : -40,
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] }
    },
    exit: (dir) => ({
      x: dir > 0 ? -40 : 40,
      opacity: 0,
      transition: { duration: 0.25, ease: [0.7, 0, 0.84, 0] }
    })
  };

  return (
    <section className="relative w-full bg-[#F7F5F0] text-[#1C2621] py-16 px-4 md:px-8 border-t border-[#E2DDD0] overflow-hidden">
      
      {/* MARCA DE AGUA EN FONDO: Tu logo flotando suavemente */}
      <motion.div 
        animate={{ 
          y: [0, -15, 0],
          rotate: [0, 3, 0]
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="absolute -right-20 top-12 pointer-events-none opacity-[0.05] z-0 select-none hidden md:block"
      >
        <img 
          src="/images/luno/logo-watermark.webp" 
          alt="" 
          className="w-[480px] h-auto object-contain grayscale"
        />
      </motion.div>

      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        
        {/* Encabezado Principal */}
        <div className="text-center space-y-2.5 max-w-2xl mx-auto min-h-[90px] flex flex-col justify-center">
          <h2 className="text-3xl md:text-5xl font-serif text-[#1C2621] font-semibold tracking-tight">
            {isFinalStep ? 'Guardá tus avances y sigamos en contacto' : '¿Cómo respondés en el día a día?'}
          </h2>
          <p className="text-sm md:text-base font-medium text-[#3A443F] leading-relaxed">
            {isFinalStep 
              ? 'Conectá con la mirada Luno y recibí herramientas directas para transformar tus paseos.' 
              : 'Elegí cómo actuarías frente a cada situación cotidiana y observá la lectura emocional de Luno.'
            }
          </p>
        </div>

        {/* Barra de Pasos */}
        <div className="max-w-xl mx-auto flex items-center justify-between gap-3 px-2">
          {scenarios.map((sc, idx) => {
            const isDone = idx < currentStep;
            const isCurrent = idx === currentStep;
            return (
              <div key={sc.id} className="flex-1 flex flex-col gap-1.5">
                <div className="text-center text-[11px] font-mono font-bold tracking-wider">
                  <span className={isCurrent || isDone ? 'text-[#B08928]' : 'text-stone-400'}>
                    {sc.tag}
                  </span>
                </div>
                <div className="h-1.5 w-full bg-[#E5E0D3] relative overflow-hidden rounded-full">
                  <div 
                    className={`h-full transition-all duration-500 ${
                      isDone || isCurrent ? 'bg-[#C29B38]' : 'bg-transparent'
                    }`}
                  />
                </div>
              </div>
            );
          })}
          
          {/* Paso 4: Newsletter */}
          <div className="flex-1 flex flex-col gap-1.5">
            <div className="text-center text-[11px] font-mono font-bold tracking-wider">
              <span className={isFinalStep ? 'text-[#B08928]' : 'text-stone-400'}>
                NEWSLETTER
              </span>
            </div>
            <div className="h-1.5 w-full bg-[#E5E0D3] relative overflow-hidden rounded-full">
              <div 
                className={`h-full transition-all duration-500 ${
                  isFinalStep ? 'bg-[#C29B38]' : 'bg-transparent'
                }`}
              />
            </div>
          </div>
        </div>

        {/* Área de Contenido */}
        <div className="relative min-h-[520px] flex flex-col justify-start">
          <AnimatePresence custom={direction} mode="wait">
            
            {/* Pasos 1, 2 y 3 */}
            {!isFinalStep && scenario && (
              <motion.div
                key={currentStep}
                custom={direction}
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="w-full bg-white border border-[#DDD8CA] rounded-2xl p-6 md:p-8 shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-1.5 border-b border-[#E8E4D9] pb-4 mb-6">
                  <span className="text-xs font-mono text-[#B08928] font-bold tracking-widest uppercase">
                    SITUACIÓN — {scenario.tag}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-serif text-[#1C2621] font-semibold">
                    {scenario.title}
                  </h3>
                  <p className="text-[#2C3531] text-sm font-normal leading-relaxed">
                    {scenario.subtitle}
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  
                  <div className="lg:col-span-5 space-y-3">
                    <div className="relative w-full h-52 lg:h-64 border border-[#E0DACB] rounded-xl overflow-hidden bg-stone-100 shadow-inner">
                      <img 
                        src={scenario.img} 
                        alt={scenario.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3 text-[11px] font-mono text-white font-semibold uppercase tracking-wider flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1 rounded-md">
                        <Zap className="w-3.5 h-3.5 text-[#E6C363]" /> Caso Cotidiano
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-7 space-y-4">
                    <p className="text-sm font-mono text-[#1C2621] font-bold tracking-wide">
                      {scenario.question}
                    </p>

                    <div className="space-y-2.5">
                      {scenario.options.map((opt, idx) => {
                        const isSelected = selectedOption === idx;
                        return (
                          <button
                            key={idx}
                            onClick={() => handleSelect(idx)}
                            className={`w-full text-left p-3.5 rounded-xl border transition-all duration-200 text-xs md:text-sm flex items-start gap-3 relative ${
                              isSelected 
                                ? 'bg-[#EEFAF1] border-[#2E4837] text-[#1C2621] font-semibold shadow-sm' 
                                : 'bg-[#F9F8F5] border-[#E0DACB] text-[#2C3531] hover:border-[#2E4837]/50 hover:bg-[#F2EFE8]'
                            }`}
                          >
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center mt-0.5 flex-shrink-0 transition-colors ${
                              isSelected ? 'border-[#2E4837] bg-[#2E4837]' : 'border-stone-400'
                            }`}>
                              {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                            </div>
                            <span className="leading-relaxed">{opt.label}</span>
                          </button>
                        );
                      })}
                    </div>

                    {selectedOption !== null && (
                      <motion.div 
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-[#EBF4EE] border-l-4 border-[#C29B38] text-[#1C2621] space-y-1 rounded-r-xl"
                      >
                        <div className="flex items-center gap-1.5 font-mono text-[#B08928] font-bold uppercase text-[11px] tracking-wider">
                          <Sparkles className="w-4 h-4" /> Lectura Luno:
                        </div>
                        <p className="font-normal text-xs md:text-sm leading-relaxed text-[#2C3531]">
                          {scenario.options[selectedOption].feedback}
                        </p>
                      </motion.div>
                    )}

                    {selectedOption !== null && (
                      <div className="pt-2 flex justify-end">
                        <button
                          onClick={handleNext}
                          className="px-6 py-3 bg-[#24332A] hover:bg-[#15201A] text-white font-mono text-xs font-bold uppercase tracking-wider rounded-xl flex items-center gap-2 transition-all shadow-md active:scale-98"
                        >
                          {currentStep < scenarios.length - 1 ? 'Siguiente Situación' : 'Finalizar Evaluación'} <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}

                  </div>

                </div>

              </motion.div>
            )}

            {/* Paso 4: Newsletter */}
            {isFinalStep && (
              <motion.div
                key="final-step"
                custom={direction}
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="w-full bg-[#F2EFE8] border-2 border-[#24332A] rounded-2xl p-6 md:p-8 shadow-md relative overflow-hidden flex flex-col justify-between z-10"
              >
                <div className="flex items-center justify-between border-b border-[#D8D2C2] pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#C29B38] animate-pulse" />
                    <span className="text-xs font-mono font-bold tracking-widest text-[#B08928] uppercase">
                      DIAGNÓSTICO FINALIZADO
                    </span>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-[#3A443F] uppercase tracking-wider">
                    PROTOCOLO PASEO
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center py-2">
                  
                  <div className="md:col-span-7 space-y-4 text-left">
                    <h3 className="text-2xl md:text-3xl font-serif text-[#1C2621] leading-tight font-semibold">
                      El paseo que querés empieza en la forma en que te comunicás.
                    </h3>
                    <p className="text-[#2C3531] text-xs md:text-sm font-normal leading-relaxed">
                      Si querés seguir profundizando en la metodología Desde el Vínculo, dejándonos tu correo te sumás a nuestra lista para recibir reflexiones, guías de campo y avisos cuando abramos nuevos cupos.
                    </p>

                    <div className="space-y-2.5 pt-2">
                      <div className="flex items-center gap-3 text-xs md:text-sm font-medium text-[#1C2621]">
                        <div className="w-5 h-5 rounded-full bg-[#24332A] text-white flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3" />
                        </div>
                        <span>Ingreso al grupo prioritario para apertura de programas.</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs md:text-sm font-medium text-[#1C2621]">
                        <div className="w-5 h-5 rounded-full bg-[#24332A] text-white flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3" />
                        </div>
                        <span>Contenidos semanales sobre lenguaje canino y calma.</span>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-5 bg-white border border-[#D8D2C2] p-6 rounded-xl space-y-4 shadow-sm">
                    <div className="flex items-center justify-center gap-2 text-xs font-mono text-[#24332A] font-bold tracking-wider uppercase text-center">
                      <MailCheck className="w-4 h-4 text-[#B08928]" /> Recibir Novedades
                    </div>

                    {!submitted ? (
                      <form onSubmit={handleSubmit} className="space-y-3">
                        <div>
                          <input 
                            type="email" 
                            required
                            placeholder="tuemail@gmail.com" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-[#F9F8F5] border border-[#D8D2C2] focus:border-[#24332A] px-3.5 py-3 text-xs md:text-sm text-[#1C2621] font-medium placeholder-stone-400 focus:outline-none transition-colors rounded-lg font-sans"
                          />
                        </div>

                        <button 
                          type="submit"
                          disabled={loading}
                          className="w-full bg-[#C29B38] hover:bg-[#A8822A] text-[#1C2621] font-mono text-xs font-bold uppercase tracking-wider py-3.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 disabled:opacity-50"
                        >
                          {loading ? 'Guardando...' : 'Quiero sumarme'} <Send className="w-3.5 h-3.5" />
                        </button>

                        <p className="text-[11px] font-mono text-[#5A635E] text-center">
                          Sin spam. Podés darte de baja cuando quieras.
                        </p>
                      </form>
                    ) : (
                      <motion.div 
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="py-6 px-4 bg-[#EEFAF1] border border-[#2E4837] text-[#2E4837] font-mono text-xs text-center space-y-2 rounded-lg"
                      >
                        <CheckCircle2 className="w-6 h-6 text-[#2E4837] mx-auto" />
                        <p className="font-bold text-sm">¡Guardado con éxito!</p>
                        <p className="text-xs text-[#3A443F] font-sans font-normal">
                          Quedaste anotado en el grupo Protocolo Paseo.
                        </p>
                      </motion.div>
                    )}
                  </div>

                </div>

                <div className="mt-6 pt-4 border-t border-[#D8D2C2] flex items-center justify-between text-xs text-[#3A443F] font-mono font-semibold">
                  <span># Desde el Vínculo</span>
                  <button
                    onClick={handleReset}
                    className="hover:text-[#24332A] flex items-center gap-1.5 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Repasar situaciones
                  </button>
                </div>

              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}