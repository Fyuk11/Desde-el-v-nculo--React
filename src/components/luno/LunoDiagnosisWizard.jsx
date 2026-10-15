import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  Sparkles, 
  RotateCcw,
  Heart,
  Volume2,
  Compass,
  Smile,
  AlertTriangle,
  Lock,
  BatteryCharging,
  Zap,
  Flame,
  Feather,
  ShieldCheck,
  Activity,
  ArrowUpRight,
  BookOpen,
  Award
} from 'lucide-react';

const DogPawIcon = ({ active, completed, className = "w-4 h-4" }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill={active || completed ? "currentColor" : "none"} 
    stroke="currentColor" 
    strokeWidth="1.8" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 11.5c-2.5 0-4.5 1.8-4.5 3.8 0 2.2 2 3.7 4.5 3.7s4.5-1.5 4.5-3.7c0-2-2-3.8-4.5-3.8z" />
    <ellipse cx="6.5" cy="8.5" rx="1.5" ry="2.2" transform="rotate(-20 6.5 8.5)" />
    <ellipse cx="10" cy="6" rx="1.5" ry="2.3" transform="rotate(-8 10 6)" />
    <ellipse cx="14" cy="6" rx="1.5" ry="2.3" transform="rotate(8 14 6)" />
    <ellipse cx="17.5" cy="8.5" rx="1.5" ry="2.2" transform="rotate(20 17.5 8.5)" />
  </svg>
);

export default function LunoDiagnosisWizard() {
  const [step, setStep] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);

  const [formData, setFormData] = useState({
    etapa: 'adolescente',
    energia: 'moderado',
    desafios: ['tirones', 'reaccion'],
    emocional: 'sobreexcitacion',
    descanso: 'profundo',
    objetivo: 'paseos'
  });

  const totalSteps = 6;

  const PRODUCTS = {
    cachorro: {
      title: "Protocolo Express: Crianza Respetuosa para Cachorros",
      desc: "Guía paso a paso para la etapa crítica de desarrollo: impronta, prevención de mordiscos, hábitos de higiene y socialización temprana.",
      badge: "Recomendado para Cachorros",
      url: "/productos/guia-protocolo-cachorros"
    },
    adolescente: {
      title: "Del Caos al Vínculo: Guía de la Adolescencia Canina",
      desc: "Herramientas de regulación emocional y límites amables para canalizar picos de energía e impulsividad en perros jóvenes.",
      badge: "Especial Etapa Adolescente",
      url: "/productos/guia-adolescencia-canina"
    },
    senior: {
      title: "Protocolo Express: Bienestar Integral para Perros Seniors",
      desc: "Programa adaptado para el cuidado del perro mayor: estimulación cognitiva suave, soporte físico y rutinas de bajo impacto.",
      badge: "Especial Etapa Senior",
      url: "/productos/guia-protocolo-seniors"
    },
    adulto: {
      title: "Curso Digital: Educando desde el Vínculo",
      desc: "Transformación integral para resolver tirones de correa, reactividad y comunicación efectiva basada en neurobiología del aprendizaje y respeto mutuo.",
      badge: "Programa Integral Destacado",
      url: "/productos/educando-desde-el-vinculo"
    }
  };

  const recommendedProduct = PRODUCTS[formData.etapa] || PRODUCTS.adulto;

  const DATA = {
    etapas: [
      { id: 'cachorro', title: 'Cachorro', subtitle: '0 a 12 meses', desc: 'Impronta, dentición e higiene.', img: '/images/home/etapa1.webp' },
      { id: 'adolescente', title: 'Adolescente', subtitle: '1 a 3 años', desc: 'Límites, autonomía y juego.', img: '/images/home/etapa3.webp' },
      { id: 'adulto', title: 'Adulto', subtitle: '3 a 7 años', desc: 'Hábitos y estimulación.', img: '/images/home/etapa4.webp' },
      { id: 'senior', title: 'Senior', subtitle: '7+ años', desc: 'Pausado, descanso y salud.', img: '/images/home/etapa6.webp' }
    ],

    energiaOptions: [
      { id: 'sereno', val: '01', title: 'Tranquilo & Zen', desc: 'Pausado en casa y paseos. Rara vez se altera.', icon: Feather, tagColor: 'bg-emerald-900/80 text-emerald-200' },
      { id: 'moderado', val: '02', title: 'Equilibrado', desc: 'Activo en el juego, autorregula con facilidad.', icon: BatteryCharging, tagColor: 'bg-emerald-900/80 text-emerald-200' },
      { id: 'intenso', val: '03', title: 'Energía Alta', desc: 'Acumula tensión y le cuesta bajar revoluciones.', icon: Zap, tagColor: 'bg-amber-900/80 text-amber-200' },
      { id: 'explosivo', val: '04', title: 'Sobreexcitado', desc: 'Picos de desacople, ladridos o frustración.', icon: Flame, tagColor: 'bg-amber-950 text-amber-300' }
    ],

    desafios: [
      { id: 'tirones', title: 'Tirones de Correa', category: 'EN EL PASEO', desc: 'Ansiedad al caminar y dificultad para pausar el ritmo.', icon: Compass, featured: true },
      { id: 'ruidos', title: 'Sensibilidad a Ruidos', category: 'ESTÍMULOS', desc: 'Inseguridad frente a ruidos o tormentas.', icon: Volume2 },
      { id: 'reaccion', title: 'Reacción / Ladridos', category: 'SOCIALIZACIÓN', desc: 'Tensión o reactividad al cruzarse con perros.', icon: AlertTriangle, featured: true },
      { id: 'soledad', title: 'Ansiedad al Quedarse Solo', category: 'VÍNCULO', desc: 'Dificultad para relajar en casa.', icon: Lock },
      { id: 'visitas', title: 'Exceso de Entusiasmo', category: 'CONVIVENCIA', desc: 'Hiperactividad cuando ingresan visitas.', icon: Smile },
      { id: 'impulsividad', title: 'Dificultad de Foco', category: 'AUTOCONTROL', desc: 'Falta de atención durante las rutinas.', icon: ShieldCheck }
    ],

    emocionales: [
      { id: 'sobreexcitacion', title: 'Sobreexcitación e Impulsividad', tag: 'Pico de Activación', pulse: 'Alto', desc: 'Le cuesta volver a la calma luego de un estímulo intenso.' },
      { id: 'inseguridad', title: 'Inseguridad y Miedos', tag: 'Estado de Alerta', pulse: 'Constante', desc: 'Se bloquea o desconfía ante situaciones u objetos nuevos.' },
      { id: 'frustracion', title: 'Frustración y Tensión Activa', tag: 'Reactividad Vocal', pulse: 'Variable', desc: 'Ladridos o tensión constante cuando no accede a su objetivo.' },
      { id: 'desconexion', title: 'Desconexión / Dispersión', tag: 'Falta de Enfoque', pulse: 'Disperso', desc: 'Poco registro de las señales del guía durante las rutinas.' }
    ],

    descansos: [
      { id: 'profundo', title: 'Descanso Profundo', desc: 'Duerme relajado entre 12 y 16 horas diarias sin sobresaltos.', img: '/images/luno/descanso1.webp' },
      { id: 'liviano', title: 'Sueño Liviano', desc: 'Se reactiva con facilidad ante ruidos o movimientos.', img: '/images/luno/descanso2.webp' },
      { id: 'inquietud', title: 'Inquietud Frecuente', desc: 'Le cuesta encontrar un lugar fijo de descanso; deambula.', img: '/images/luno/descanso3.webp' }
    ],

    objetivos: [
      { id: 'paseos', num: '01', title: 'Paseos fluidos y disfrutables', desc: 'Caminatas sin tirones con conexión constante.' },
      { id: 'calma_casa', num: '02', title: 'Tranquilidad al quedarse solo', desc: 'Autonomía emocional e independencia positiva.' },
      { id: 'reaccionabilidad', num: '03', title: 'Gestión de la reactividad', desc: 'Mayor autocontrol frente a otros perros o estímulos.' },
      { id: 'convivencia', num: '04', title: 'Vínculo y comunicación empática', desc: 'Entendimiento mutuo basado en el respeto de sus señales.' }
    ]
  };

  const handleSelectDesafio = (id) => {
    setFormData(prev => {
      const exists = prev.desafios.includes(id);
      return {
        ...prev,
        desafios: exists ? prev.desafios.filter(item => item !== id) : [...prev.desafios, id]
      };
    });
  };

  return (
    /* SECCIÓN PRINCIPAL CON GRADIENTE Y AISLAMIENTO DE CAPAS (isolate) */
    <section id="diagnostico" className="relative w-full bg-gradient-to-br from-[#041d16] via-[#093529] to-[#02120d] text-stone-100 font-sans py-14 px-4 overflow-hidden isolate">
      
      {/* CAPA DE LUCES AMBIENTALES TRASERAS (FORZADAS A -z-10 Y pointer-events-none) */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Glow Esmeralda Superior */}
        <div className="absolute top-[-10%] left-[15%] w-[65vw] h-[65vw] max-w-[700px] max-h-[700px] rounded-full bg-emerald-500/15 blur-[140px]" />
        {/* Glow Dorado Cálido */}
        <div className="absolute top-[35%] right-[10%] w-[50vw] h-[50vw] max-w-[550px] max-h-[550px] rounded-full bg-amber-500/10 blur-[130px]" />
        {/* Glow Inferior */}
        <div className="absolute bottom-[-10%] left-[-5%] w-[55vw] h-[55vw] max-w-[600px] max-h-[600px] rounded-full bg-teal-600/10 blur-[150px]" />
      </div>

      <div className="relative max-w-4xl mx-auto z-10">

        {/* VISTA DE RESULTADO */}
        {isCompleted ? (
          <div className="bg-[#fdfbf7] border-t-4 border-t-amber-400 border-x border-b border-amber-400/30 rounded-b-xl p-6 md:p-8 shadow-2xl space-y-6 text-stone-800">
            
            <div className="text-center space-y-2 border-b border-stone-200 pb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-mono tracking-wider uppercase bg-amber-400/15 text-amber-800 border border-amber-400/40 font-bold">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" /> DIAGNÓSTICO COMPLETO
              </span>
              <h2 className="text-2xl md:text-3xl font-serif text-emerald-950 tracking-tight">
                Lo que tu perro necesita decirte
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-[#f5f0e6] p-3.5 border-l-2 border-amber-400 rounded-r-md">
                <span className="text-[10px] font-mono uppercase text-amber-800 tracking-widest font-bold">01. Etapa</span>
                <p className="text-emerald-950 font-semibold text-xs md:text-sm mt-0.5 capitalize">
                  {DATA.etapas.find(e => e.id === formData.etapa)?.title}
                </p>
              </div>

              <div className="bg-[#f5f0e6] p-3.5 border-l-2 border-amber-400 rounded-r-md">
                <span className="text-[10px] font-mono uppercase text-amber-800 tracking-widest font-bold">02. Energía</span>
                <p className="text-emerald-950 font-semibold text-xs md:text-sm mt-0.5 capitalize">
                  {DATA.energiaOptions.find(e => e.id === formData.energia)?.title}
                </p>
              </div>

              <div className="bg-[#f5f0e6] p-3.5 border-l-2 border-amber-400 rounded-r-md">
                <span className="text-[10px] font-mono uppercase text-amber-800 tracking-widest font-bold">03. Emoción</span>
                <p className="text-emerald-950 font-semibold text-xs md:text-sm mt-0.5 truncate">
                  {DATA.emocionales.find(e => e.id === formData.emocional)?.title}
                </p>
              </div>

              <div className="bg-[#f5f0e6] p-3.5 border-l-2 border-amber-400 rounded-r-md">
                <span className="text-[10px] font-mono uppercase text-amber-800 tracking-widest font-bold">04. Objetivo</span>
                <p className="text-emerald-950 font-semibold text-xs md:text-sm mt-0.5 truncate">
                  {DATA.objetivos.find(e => e.id === formData.objetivo)?.title}
                </p>
              </div>
            </div>

            <div className="bg-[#0b3328] text-stone-100 p-6 shadow-xl border-l-4 border-amber-400 rounded-r-lg">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-amber-400/20 border border-amber-400/40 text-amber-300 flex items-center justify-center flex-shrink-0">
                  <Heart className="w-5 h-5 fill-amber-300" />
                </div>
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300 font-semibold">
                    INTERPRETACIÓN LUNO AI
                  </span>
                  <h3 className="font-serif text-lg md:text-xl text-white">
                    "No me porto mal por desobediencia... mi sistema nervioso se sobrecarga."
                  </h3>
                  <p className="text-emerald-100/90 text-xs md:text-sm leading-relaxed italic font-light">
                    «Para la etapa <strong className="text-amber-300 font-normal">{formData.etapa}</strong> que atravieso, necesito un enfoque adaptado a mi ritmo. No busco llevarte la contraria; solo necesito tus señales para saber cómo gestionar los estímulos.»
                  </p>
                </div>
              </div>
            </div>

            {/* TARJETA DESTACADA DEL PROGRAMA */}
<div className="border-2 border-amber-400/60 bg-gradient-to-br from-[#f8f4ec] to-[#eee5d5] p-6 rounded-tl-2xl rounded-br-2xl relative overflow-hidden shadow-lg">
  <div className="flex flex-col md:flex-row items-center gap-6">
    <div className="flex-1 space-y-2.5 text-center md:text-left">
      <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-widest text-emerald-950 uppercase bg-amber-400 px-3 py-1 shadow-sm">
        <Award className="w-3.5 h-3.5" /> {recommendedProduct.badge}
      </span>
      <h4 className="text-2xl font-serif text-emerald-950 font-medium">
        {recommendedProduct.title}
      </h4>
      <p className="text-stone-700 text-xs md:text-sm leading-relaxed">
        {recommendedProduct.desc}
      </p>

      <div className="pt-3 flex flex-wrap gap-2 justify-center md:justify-start">
        {/* Usamos <Link> de react-router-dom en lugar de <a> */}
        <Link 
          to={recommendedProduct.url}
          className="px-6 py-3 bg-amber-400 text-emerald-950 text-xs font-mono font-bold tracking-widest uppercase hover:bg-amber-300 transition-all flex items-center gap-2 shadow-md rounded-tr-xl cursor-pointer"
        >
          <BookOpen className="w-4 h-4" /> Ver Programa <ArrowUpRight className="w-4 h-4" />
        </Link>
        <button 
          onClick={() => { setIsCompleted(false); setStep(1); }} 
          className="px-4 py-3 border border-stone-400 text-stone-700 text-xs font-mono font-medium hover:bg-stone-200/50 transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reevaluar
        </button>
      </div>
    </div>

    <div className="w-32 h-32 md:w-40 md:h-40 overflow-hidden border-2 border-amber-400 flex-shrink-0 shadow-lg relative rounded-tl-3xl">
      <img 
        src={DATA.etapas.find(e => e.id === formData.etapa)?.img} 
        alt="Luno Program" 
        className="w-full h-full object-cover"
      />
    </div>
  </div>
</div>

          </div>
        ) : (
          /* FLUJO DE PASOS */
          <div>
            <div className="text-center mb-6">
              <span className="inline-block px-3 py-0.5 text-[10px] font-mono font-bold tracking-widest uppercase bg-[#021a13] text-amber-300 border border-amber-400/40 mb-2 shadow-sm">
                DIAGNÓSTICO CANINO
              </span>
              <h2 className="text-2xl md:text-4xl font-serif text-white tracking-tight">
                Entendé las necesidades de tu perro con <em className="italic text-amber-300 font-serif">Luno</em>
              </h2>
            </div>

            {/* Stepper en Fondo Marfil Creado con Opacidad Completa */}
            <div className="mb-8 bg-[#fdfbf7] p-4 border border-amber-400/40 shadow-2xl max-w-2xl mx-auto rounded-tr-2xl rounded-bl-2xl">
              <div className="flex justify-between items-center relative">
                <div className="absolute left-4 right-4 top-4 h-[1px] bg-stone-200 -z-0" />
                <div 
                  className="absolute left-4 top-4 h-[2px] bg-amber-400 transition-all duration-300 -z-0"
                  style={{ width: `${((step - 1) / (totalSteps - 1)) * 92}%` }}
                />

                {[1, 2, 3, 4, 5, 6].map((num) => {
                  const isActive = step === num;
                  const isComp = step > num;

                  return (
                    <button
                      key={num}
                      onClick={() => setStep(num)}
                      className="flex flex-col items-center focus:outline-none relative z-10"
                    >
                      <div className={`w-8 h-8 flex items-center justify-center transition-all ${
                        isActive 
                          ? 'bg-amber-400 text-emerald-950 shadow-md font-mono text-xs font-bold ring-2 ring-amber-300/80 scale-110' 
                          : isComp 
                            ? 'bg-emerald-900 text-amber-300 border border-amber-400/40' 
                            : 'bg-stone-200/80 text-stone-500 border border-stone-300'
                      }`}>
                        <DogPawIcon active={isActive} completed={isComp} className="w-4 h-4" />
                      </div>
                      <span className={`text-[9px] font-mono tracking-wider uppercase mt-1 ${
                        isActive ? 'text-amber-800 font-bold' : 'text-stone-500'
                      }`}>
                        0{num}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="min-h-[380px]">

              {/* PASO 1: ETAPA VITAL (FONDOS OPACOS SOLIDOS PARA QUE NADA SE TRASLUZCA) */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-xl md:text-2xl font-serif text-white">1. ¿En qué etapa vital está tu perro?</h3>
                    <p className="text-emerald-100/80 text-xs mt-0.5">Elegí la opción para personalizar el diagnóstico técnico.</p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {DATA.etapas.map((item) => {
                      const isSel = formData.etapa === item.id;
                      return (
                        <div
                          key={item.id}
                          onClick={() => setFormData({ ...formData, etapa: item.id })}
                          className={`relative h-64 border-2 transition-all cursor-pointer flex flex-col justify-end p-4 group rounded-tr-3xl overflow-hidden bg-[#0a2e22] ${
                            isSel 
                              ? 'border-amber-400 ring-2 ring-amber-400/50 shadow-2xl scale-[1.02]' 
                              : 'border-emerald-800/80 hover:border-amber-400/60'
                          }`}
                        >
                          <img src={item.img} alt={item.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90" />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#041d16] via-[#041d16]/70 to-transparent" />

                          <div className="relative z-10 space-y-1">
                            <span className="text-[9px] font-mono font-bold text-amber-200 uppercase tracking-widest bg-[#021812] px-2 py-0.5 border-l-2 border-amber-400">
                              {item.subtitle}
                            </span>
                            <h4 className="font-semibold text-lg text-white font-serif">{item.title}</h4>
                            <p className="text-[11px] text-emerald-100/90 leading-tight font-light">{item.desc}</p>
                          </div>

                          {isSel && (
                            <div className="absolute top-3 right-3 w-6 h-6 bg-amber-400 text-emerald-950 flex items-center justify-center shadow-md">
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* PASO 2: ENERGÍA */}
              {step === 2 && (
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-xl md:text-2xl font-serif text-white">2. Nivel de Energía y Excitación</h3>
                    <p className="text-emerald-100/80 text-xs mt-0.5">Medición de ritmo e intensidad en su rutina.</p>
                  </div>

                  <div className="space-y-3 max-w-2xl mx-auto">
                    {DATA.energiaOptions.map((item) => {
                      const isSel = formData.energia === item.id;
                      const IconComp = item.icon;

                      return (
                        <div
                          key={item.id}
                          onClick={() => setFormData({ ...formData, energia: item.id })}
                          className={`p-4 border-l-4 border-y border-r transition-all cursor-pointer flex items-center justify-between rounded-r-lg bg-[#fdfbf7] shadow-md ${
                            isSel 
                              ? 'border-l-amber-400 border-amber-400 ring-2 ring-amber-400/40 bg-[#f7f2e7]' 
                              : 'border-l-stone-300 border-stone-200 hover:border-amber-400/60'
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <span className={`text-xs font-mono px-2 py-1 ${item.tagColor}`}>
                              {item.val}
                            </span>
                            <div>
                              <h4 className="font-semibold text-emerald-950 text-sm">{item.title}</h4>
                              <p className="text-xs text-stone-600 mt-0.5">{item.desc}</p>
                            </div>
                          </div>

                          <div className={`p-2.5 ${isSel ? 'bg-amber-400 text-emerald-950' : 'bg-stone-200/80 text-stone-600'}`}>
                            <IconComp className="w-4 h-4" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* PASO 3: DESAFÍOS */}
              {step === 3 && (
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-xl md:text-2xl font-serif text-white">3. Desafíos o Situaciones de Sobrecarga</h3>
                    <p className="text-emerald-100/80 text-xs mt-0.5">Podés seleccionar múltiples aspectos a evaluar.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {DATA.desafios.map((item) => {
                      const isSel = formData.desafios.includes(item.id);
                      const IconComp = item.icon;

                      return (
                        <div
                          key={item.id}
                          onClick={() => handleSelectDesafio(item.id)}
                          className={`p-4 border transition-all cursor-pointer flex flex-col justify-between relative rounded-tl-xl bg-[#fdfbf7] shadow-md ${
                            isSel 
                              ? 'border-amber-400 ring-2 ring-amber-400/40 bg-[#f7f2e7]' 
                              : 'border-stone-200 hover:border-amber-400/60'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-2">
                              <span className="text-[9px] font-mono font-bold text-amber-900 uppercase bg-amber-100 border border-amber-300 px-2 py-0.5">
                                {item.category}
                              </span>
                              <IconComp className={`w-4 h-4 ${isSel ? 'text-amber-600' : 'text-stone-400'}`} />
                            </div>

                            <h4 className="font-semibold text-emerald-950 text-sm">{item.title}</h4>
                            <p className="text-xs text-stone-600 leading-relaxed mt-1.5">{item.desc}</p>
                          </div>

                          <div className="mt-4 pt-2 border-t border-stone-200 flex items-center justify-between text-[11px]">
                            <span className={isSel ? 'text-amber-800 font-bold font-mono' : 'text-stone-400 font-mono'}>
                              {isSel ? 'SELECCIONADO' : '+ AÑADIR'}
                            </span>
                            {isSel && <Check className="w-3.5 h-3.5 text-amber-700 stroke-[3]" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* PASO 4: RESPUESTA EMOCIONAL */}
              {step === 4 && (
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-xl md:text-2xl font-serif text-white">4. Respuesta Emocional Predominante</h3>
                    <p className="text-emerald-100/80 text-xs mt-0.5">Identificá el patrón recurrente durante el día.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 max-w-2xl mx-auto">
                    {DATA.emocionales.map((item) => {
                      const isSel = formData.emocional === item.id;
                      return (
                        <div
                          key={item.id}
                          onClick={() => setFormData({ ...formData, emocional: item.id })}
                          className={`p-4 border-l-4 border-y border-r transition-all cursor-pointer bg-[#fdfbf7] relative rounded-br-2xl shadow-md ${
                            isSel 
                              ? 'border-l-amber-400 border-amber-400 bg-[#f7f2e7] ring-2 ring-amber-400/40' 
                              : 'border-l-stone-300 border-stone-200 hover:border-l-amber-400/60'
                          }`}
                        >
                          <div className="flex items-center justify-between border-b border-stone-200 pb-2 mb-2">
                            <span className="text-[10px] font-mono font-bold uppercase text-amber-800">
                              {item.tag}
                            </span>
                            <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-800 font-semibold">
                              <Activity className="w-3 h-3 text-emerald-700" /> {item.pulse}
                            </span>
                          </div>

                          <h4 className="font-semibold text-emerald-950 text-sm">{item.title}</h4>
                          <p className="text-xs text-stone-600 mt-1 leading-relaxed">{item.desc}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* PASO 5: DESCANSO Y SUEÑO */}
              {step === 5 && (
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-xl md:text-2xl font-serif text-white">5. Calidad del Sueño y Descanso</h3>
                    <p className="text-emerald-100/80 text-xs mt-0.5">Nivel de recuperación física y mental.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 max-w-3xl mx-auto">
                    {DATA.descansos.map((item) => {
                      const isSel = formData.descanso === item.id;
                      return (
                        <div
                          key={item.id}
                          onClick={() => setFormData({ ...formData, descanso: item.id })}
                          className={`border-2 transition-all cursor-pointer bg-[#fdfbf7] rounded-tr-2xl overflow-hidden shadow-md ${
                            isSel 
                              ? 'border-amber-400 ring-2 ring-amber-400/40 scale-[1.02]' 
                              : 'border-stone-200 hover:border-amber-400/60'
                          }`}
                        >
                          <div className="h-28 relative overflow-hidden">
                            <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                          </div>
                          <div className="p-3.5">
                            <h4 className="font-semibold text-emerald-950 text-sm font-serif">{item.title}</h4>
                            <p className="text-xs text-stone-600 mt-1 leading-relaxed">{item.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* PASO 6: OBJETIVOS */}
              {step === 6 && (
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-xl md:text-2xl font-serif text-white">6. Tu Objetivo Principal</h3>
                    <p className="text-emerald-100/80 text-xs mt-0.5">¿Qué meta querés priorizar en el vínculo diario?</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 max-w-2xl mx-auto">
                    {DATA.objetivos.map((item) => {
                      const isSel = formData.objetivo === item.id;
                      return (
                        <div
                          key={item.id}
                          onClick={() => setFormData({ ...formData, objetivo: item.id })}
                          className={`p-4 border transition-all cursor-pointer flex items-start gap-3.5 bg-[#fdfbf7] rounded-bl-xl shadow-md ${
                            isSel 
                              ? 'border-amber-400 bg-[#f7f2e7] ring-2 ring-amber-400/40' 
                              : 'border-stone-200 hover:border-amber-400/60'
                          }`}
                        >
                          <span className="text-xl font-mono font-bold text-amber-700">
                            {item.num}
                          </span>
                          <div className="flex-1">
                            <h4 className="font-semibold text-emerald-950 text-sm">{item.title}</h4>
                            <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">{item.desc}</p>
                          </div>
                          <div className={`w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                            isSel ? 'bg-amber-400 text-emerald-950' : 'border border-stone-300'
                          }`}>
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

            </div>

            {/* BOTONES DE NAVEGACIÓN */}
            <div className="mt-8 flex items-center justify-between border-t border-emerald-800/60 pt-4">
              <button
                onClick={() => setStep(prev => Math.max(1, prev - 1))}
                disabled={step === 1}
                className={`flex items-center gap-1.5 px-4 py-2 text-xs font-mono font-semibold uppercase tracking-wider transition-all ${
                  step === 1 ? 'opacity-30 cursor-not-allowed text-stone-400' : 'text-emerald-200 hover:text-white'
                }`}
              >
                <ChevronLeft className="w-4 h-4" /> Anterior
              </button>

              {step < totalSteps ? (
                <button
                  onClick={() => setStep(prev => Math.min(totalSteps, prev + 1))}
                  className="flex items-center gap-2 px-6 py-2.5 bg-amber-400 text-emerald-950 font-mono text-xs font-bold tracking-widest uppercase hover:bg-amber-300 transition-all shadow-lg rounded-tr-lg active:scale-95"
                >
                  Siguiente <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => setIsCompleted(true)}
                  className="flex items-center gap-2 px-6 py-2.5 bg-amber-400 text-emerald-950 font-mono text-xs font-bold tracking-widest uppercase hover:bg-amber-300 transition-all shadow-lg rounded-tr-lg active:scale-95"
                >
                  Finalizar Diagnóstico <Sparkles className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>
        )}

      </div>
    </section>
  );
}