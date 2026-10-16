import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import LunoStage from '../components/biblioteca/LunoStage';
import ArcadeGrid from '../components/biblioteca/ArcadeGrid';
import GuiasGrid from '../components/biblioteca/GuiasGrid';

// 3 CASOS SIMPLES Y LENGUAJE CÁLIDO PARA LA DEMO
const DEMO_CASES = [
  {
    id: 1,
    cat: '01. LECTURA CORPORAL',
    question: 'Una persona se acerca a saludar y tu perro se lame el hocico rápidamente. ¿Qué significa?',
    img: '/images/biblioteca/demo1.webp',
    options: [
      { id: 'a', text: 'A) Quiere comida o golosinas.', correct: false, feedback: 'Es un mito común. Lamerse el hocico sin comida presente es un pacificador de calma para pedir un ritmo más pausado.' },
      { id: 'b', text: 'B) Es una señal de calma para pedir espacio e incomodidad sutil.', correct: true, feedback: '¡Excelente lectura! Tu perro está indicando que prefiere evitar la interacción directa en ese momento.' }
    ]
  },
  {
    id: 2,
    cat: '02. MANEJO DE PASEO',
    question: 'Doblás la esquina y la correa queda tensa como una cuerda de guitarra. ¿Cómo actuás?',
    img: '/images/biblioteca/demo2.webp',
    options: [
      { id: 'a', text: 'A) Tiro hacia atrás firmemente para corregirlo.', correct: false, feedback: 'El tirón activa el reflejo de oposición del cuello, incrementando la tensión física y emocional.' },
      { id: 'b', text: 'B) Me detengo en calma, doy un paso al costado y abro espacio con la correa floja.', correct: true, feedback: '¡Muy bien! Quitar la tensión mecánica le permite a su sistema nervioso bajar la hiperalerta.' }
    ]
  },
  {
    id: 3,
    cat: '03. AUTORREGULACIÓN DEL TUTOR',
    question: 'Llegan a la puerta de la calle y notas a tu perro acelerado por salir. ¿Qué hacés vos?',
    img: '/images/biblioteca/demo3.webp',
    options: [
      { id: 'a', text: 'A) Abro rápido para que descargue su energía afuera.', correct: false, feedback: 'Salir en estado de excitación alta aumenta las probabilidades de reactividad en los primeros metros del paseo.' },
      { id: 'b', text: 'B) Hago una pausa de 10 segundos, respiro exhalando lento y espero que baje un nivel antes de abrir.', correct: true, feedback: '¡Perfecto! Tu propia calma y coherencia cardíaca se transfieren directamente a tu compañero.' }
    ]
  }
];

// PRÁCTICAS CON LUNO
const PRACTICAS_LUNO = [
  {
    num: '01',
    title: '¿Qué me está diciendo?',
    tag: 'SEÑALES',
    desc: 'Mirá videos cortos y practicá reconocer las señales de calma, de tensión y de espacio de tu compañero.',
    img: '/images/biblioteca/juego1-img.webp',
    highlight: 'Casos clínicos en video'
  },
  {
    num: '02',
    title: 'Paseo en Sintonía',
    tag: 'PASEOS',
    desc: 'Situaciones de paseo para practicar cómo acompañar a tu perro con calma, espacio y correa floja.',
    img: '/images/biblioteca/juego2_paseo.webp',
    highlight: 'Situaciones urbanas reales'
  },
  {
    num: '03',
    title: 'Refugio y Zonas de Calma',
    tag: 'EN CASA',
    desc: 'Reconocé cómo está su energía y armale un lugar seguro donde realmente pueda descansar y descomprimir.',
    img: '/images/biblioteca/juego3_refugio.webp',
    highlight: 'Arquitectura de paz hogareña'
  },
  {
    num: '04',
    title: 'Encontrá el Umbral',
    tag: 'DISTANCIA',
    desc: 'Practicá cuándo frenar y darle espacio a tu perro antes de que se tense o entre en hiperalerta.',
    img: '/images/biblioteca/juego4_umbral.webp',
    highlight: 'Margen de seguridad somático'
  },
  {
    num: '05',
    title: 'Respirá con Luno',
    tag: 'CALMA',
    desc: 'Una pausa de respiración consciente guiada para bajar las revoluciones juntos antes de salir a pasear.',
    img: '/images/biblioteca/juego5_respira.webp',
    highlight: 'Sincronización biorítmica 4-4-6'
  }
];

// LAS 8 GUÍAS PDF REALES
// LAS 8 GUÍAS PDF REALES (ALINEADAS A LA BIBLIOTECA PRIVADA)
const GUIAS_PDF_REALES = [
  {
    tag: 'DIAGNÓSTICO INICIAL',
    tagColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    title: '¿Dónde está parado tu vínculo hoy?',
    desc: 'Evaluación fundamental para mapear el estado actual de la relación, la carga de estrés y los puntos de fricción diarios.',
    img: '/images/biblioteca/pdf1.webp'
  },
  {
    tag: 'LECTURA CORPORAL',
    tagColor: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
    title: '¿Qué te está diciendo tu perro y no estás viendo?',
    desc: 'Guía de campo para descodificar las señales sutiles de tensión antes de que se transformen en reactividad.',
    img: '/images/biblioteca/pdf2.webp'
  },
  {
    tag: 'PROTOCOLO DE RESPUESTA',
    tagColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
    title: 'Cómo responder correctamente a tu compañero canino',
    desc: 'Estrategias de co-regulación y pautas de acción consciente ante situaciones de activación y desconcierto.',
    img: '/images/biblioteca/pdf3.webp'
  },
  {
    tag: 'FUNDAMENTOS',
    tagColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    title: '5 Claves para comprender el lenguaje de tu perro',
    desc: 'Los pilares etológicos indispensables para entender la comunicación no verbal y el universo emocional canino.',
    img: '/images/biblioteca/pdf4.webp'
  },
  {
    tag: 'REGULACIÓN HOGAREÑA',
    tagColor: 'bg-teal-500/20 text-teal-300 border-teal-500/40',
    title: 'El Código de la Calma',
    desc: 'Diseño de entornos de descompresión y herramientas somáticas para bajar las revoluciones en casa.',
    img: '/images/biblioteca/juego3_refugio.webp'
  },
  {
    tag: 'VÍNCULO Y AUTONOMÍA',
    tagColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
    title: 'Independencia Saludable',
    desc: 'Cómo fomentar la seguridad emocional y prevenir la hiperapego sin descuidar el apego seguro.',
    img: '/images/biblioteca/juego4_umbral.webp'
  },
  {
    tag: 'PASEO TÁCTICO',
    tagColor: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
    title: 'Paseo en Sintonía',
    desc: 'Estrategias de gestión de umbrales, manejo consciente de la correa y cruce de estímulos urbanos.',
    img: '/images/biblioteca/juego2_paseo.webp'
  },
  {
    tag: 'REGISTRO DIARIO',
    tagColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    title: 'Tu Diario de Sintonía: Kit de Trackers',
    desc: 'Cuaderno de bitácora y planillas de seguimiento diario para evaluar los avances y patrones del vínculo.',
    img: '/images/biblioteca/juego5_respira.webp'
  }
];

// RECORRIDO ROADMAP
// RECORRIDO ROADMAP (ALINEADO A LOS TÍTULOS Y ARCHIVOS REALES)
const SEMANA_ROADMAP = [
  { 
    dia: '01', 
    titulo: '¿Dónde está parado tu vínculo hoy?', 
    desc: 'Completás la guía de autodiagnóstico inicial para mapear la convivencia, la carga de estrés y los puntos de fricción diarios.' 
  },
  { 
    dia: '02', 
    titulo: '¿Qué te está diciendo tu perro y no estás viendo?', 
    desc: 'Leés la guía de señales corporales y realizás la Práctica 01 con Luno para calibrar tus ojos ante la tensión sutil.' 
  },
  { 
    dia: '03', 
    titulo: '5 Claves para comprender el lenguaje de tu perro', 
    desc: 'Estudiás los pilares etológicos de la comunicación no verbal para entender su universo emocional sin malentendidos.' 
  },
  { 
    dia: '04', 
    titulo: 'El Código de la Calma & Zona de Refugio', 
    desc: 'Implementás el protocolo de descompresión en casa y hacés la Práctica 03 para acondicionar su lugar seguro de descanso.' 
  },
  { 
    dia: '05', 
    titulo: 'Paseo en Sintonía & Gestión de Umbrales', 
    desc: 'Revisás el manual de paseo, la pauta de correa floja y entrenás las Prácticas 02 y 04 con Luno para manejar distancias en la calle.' 
  },
  { 
    dia: '06', 
    titulo: 'Cómo responder correctamente a tu compañero canino', 
    desc: 'Aplicás las estrategias de co-regulación y la Práctica 05 (Respirá con Luno) para desactivar momentos de hiperalerta con calma.' 
  },
  { 
    dia: '07', 
    titulo: 'Tu Diario de Sintonía: Kit de Trackers', 
    desc: 'Estrenás las planillas imprimibles para registrar los avances, las señales observadas y la evolución del vínculo semana a semana.' 
  }
];

// FAQS
const PREGUNTAS_FRECUENTES = [
  {
    q: '¿Es una suscripción mensual?',
    a: 'No. Es un pago único de USD 30. Tienes acceso permanente sin renovaciones ni cobros automáticos.'
  },
  {
    q: '¿Hasta cuándo tengo acceso?',
    a: 'El acceso es vitalicio a la Biblioteca. Podrás volver a las prácticas y guías siempre que lo necesites.'
  },
  {
    q: '¿Qué pasa cuando agregues contenido nuevo?',
    a: 'Todo el material que se sume en el futuro se agregará automáticamente a tu acceso sin costo extra.'
  },
  {
    q: '¿Puedo descargar las guías?',
    a: 'Sí. Podés leerlas directamente en pantalla dentro de la plataforma o descargarlas en PDF a tu dispositivo.'
  },
  {
    q: '¿Funciona desde el celular?',
    a: 'Sí, está diseñada para usarse cómodamente desde el celular, tablet o computadora sin necesidad de instalar nada.'
  },
  {
    q: '¿Cómo ingreso tras la compra?',
    a: 'Ingresas con el mismo email que usaste para realizar la compra en Hotmart. Te enviaremos un código para validar tu acceso.'
  }
];

export default function BibliotecaPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('arcade');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [tokenInput, setTokenInput] = useState('');
  const [step, setStep] = useState(1); // 1: Pedir email, 2: Pedir código OTP de verificación
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [openFaq, setOpenFaq] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Estados Demo Interactiva
  const [demoStep, setDemoStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answeredCases, setAnsweredCases] = useState({});
  const [score, setScore] = useState(0);

  // Estados "¿Te suena?"
  const [revealedTeSuena, setRevealedTeSuena] = useState({});

  useEffect(() => {
    const savedAccess = localStorage.getItem('vinculo_auth_email');
    if (savedAccess) {
      setIsAuthorized(true);
    }
  }, []);

  // PASO 1: Verificar que el email exista en la base de datos permitida
  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) {
      setErrorMsg('Por favor, ingresá un correo electrónico válido.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const { data, error } = await supabase
        .from('allowed_users')
        .select('*')
        .eq('email', emailInput.trim().toLowerCase())
        .eq('has_access', true)
        .single();

      if (error || !data) {
        setErrorMsg('Este correo no registra una membresía activa. Adquiere tu acceso más abajo.');
      } else {
        // Aquí en el futuro Make enviará el código de 6 dígitos. Por ahora pasamos al paso de token.
        setStep(2);
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Ocurrió un error al verificar tu acceso. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  // PASO 2: Validar el código de seguridad de 6 dígitos enviado por Make/Email
  const handleVerifyToken = async (e) => {
    e.preventDefault();
    if (!tokenInput || tokenInput.trim().length < 4) {
      setErrorMsg('Ingresá el código válido de verificación.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      // Nota: Cuando conectemos Make, aquí validaremos el código temporal. 
      // Por ahora, aceptamos cualquier código de 6 dígitos para pruebas locales o el código maestro "123456".
      if (tokenInput.trim() === '123456' || tokenInput.trim().length === 6) {
        localStorage.setItem('vinculo_auth_email', emailInput.trim().toLowerCase());
        setIsAuthorized(true);
        setShowLoginModal(false);
        setStep(1);
        setTokenInput('');
      } else {
        setErrorMsg('Código incorrecto o expirado. Revisá tu correo.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Error al validar el código.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('vinculo_auth_email');
    setIsAuthorized(false);
    setEmailInput('');
    setStep(1);
  };

  const handleSelectDesdeLuno = (targetId, tab) => {
    setActiveTab(tab);
    setTimeout(() => {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.classList.add('border-white');
        setTimeout(() => el.classList.remove('border-white'), 2000);
      }
    }, 120);
  };

  const handleSelectOption = (opt) => {
    setSelectedOption(opt);
    if (!answeredCases[demoStep]) {
      setAnsweredCases(prev => ({ ...prev, [demoStep]: true }));
      if (opt.correct) {
        setScore(prev => prev + 1);
      }
    }
  };

  const resetDemo = () => {
    setDemoStep(0);
    setSelectedOption(null);
    setAnsweredCases({});
    setScore(0);
  };

  const toggleTeSuena = (id) => {
    setRevealedTeSuena(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // 🔒 VISTA PÚBLICA DE ALTA CONVERSIÓN
  if (!isAuthorized) {
    return (
      <div className="min-h-screen text-stone-100 font-sans selection:bg-amber-500 selection:text-stone-950 relative overflow-hidden bg-[#07090E]">
        
        {/* MODAL POP-UP DE INGRESO CON FLUJO DE 2 PASOS */}
        <AnimatePresence>
          {showLoginModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-[#0F141C] border border-amber-500/40 p-6 md:p-8 rounded-md max-w-md w-full relative shadow-2xl space-y-4 my-auto"
              >
                <button 
                  onClick={() => { setShowLoginModal(false); setStep(1); setErrorMsg(''); }}
                  className="absolute top-4 right-4 text-stone-400 hover:text-white font-mono text-sm cursor-pointer"
                >
                  ✕
                </button>

                <div className="border-l-2 border-amber-500 pl-3 py-1 space-y-1">
                  <span className="text-[10px] font-mono text-amber-400 uppercase font-bold">ACCESO SEGURO A LA SALA</span>
                  <h3 className="text-xl font-serif text-white font-bold">
                    {step === 1 ? 'Ingresá con tu email' : 'Verificá tu identidad'}
                  </h3>
                </div>

                {step === 1 ? (
                  <>
                    <p className="text-xs text-stone-300 font-light">
                      Ingresá el correo que usaste en Hotmart para validar tu acceso.
                    </p>

                    <form onSubmit={handleVerifyEmail} className="space-y-3 pt-2">
                      <input 
                        type="email" 
                        placeholder="tu-correo@ejemplo.com"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        className="w-full bg-stone-950 border border-stone-800 px-4 py-3 text-sm text-white placeholder-stone-600 focus:outline-none focus:border-amber-500 transition-colors font-mono rounded-sm"
                      />
                      <button 
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs font-mono uppercase tracking-widest transition-all cursor-pointer shadow-lg rounded-sm"
                      >
                        {loading ? 'Verificando...' : 'Continuar ➔'}
                      </button>
                    </form>
                  </>
                ) : (
                  <>
                    <p className="text-xs text-stone-300 font-light">
                      Enviamos un código de 6 dígitos a <strong className="text-amber-400">{emailInput}</strong>. Ingresalo para validar este dispositivo.
                    </p>

                    <form onSubmit={handleVerifyToken} className="space-y-3 pt-2">
                      <input 
                        type="text" 
                        maxLength={6}
                        placeholder="123456"
                        value={tokenInput}
                        onChange={(e) => setTokenInput(e.target.value)}
                        className="w-full bg-stone-950 border border-stone-800 px-4 py-3 text-center text-lg text-amber-400 tracking-widest placeholder-stone-700 focus:outline-none focus:border-amber-500 transition-colors font-mono rounded-sm"
                      />
                      <button 
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs font-mono uppercase tracking-widest transition-all cursor-pointer shadow-lg rounded-sm"
                      >
                        {loading ? 'Validando...' : 'Verificar y Entrar ➔'}
                      </button>

                      <button 
                        type="button"
                        onClick={() => setStep(1)}
                        className="w-full text-center text-[10px] font-mono text-stone-400 hover:text-white pt-2 cursor-pointer uppercase"
                      >
                        ← Volver a cambiar email
                      </button>
                    </form>
                  </>
                )}

                {errorMsg && (
                  <p className="text-xs font-mono text-rose-400 bg-rose-950/40 border border-rose-900/50 p-2.5 rounded-sm">
                    {errorMsg}
                  </p>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* BOTÓN FLOTANTE CON TU LOGO */}
        <button 
          onClick={() => setShowLoginModal(true)}
          className="fixed bottom-8 right-6 z-40 bg-[#12231A]/95 hover:bg-[#1A3326] border border-[#78B092]/60 px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-3 transition-all hover:scale-105 cursor-pointer group backdrop-blur-md"
        >
          <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center p-1 border border-[#78B092]/40 overflow-hidden shrink-0">
            <img 
              src="/images/biblioteca/logo-flotante.webp" 
              alt="Logo Pata" 
              className="w-full h-full object-contain filter brightness-125"
              onError={(e) => {
                e.target.onerror = null; 
                e.target.src = '/images/logo.svg'; 
              }} 
            />
          </div>
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-stone-100 group-hover:text-amber-300 pr-1">
            INGRESÁ
          </span>
        </button>

        {/* 1. HERO */}
        <section className="relative min-h-[80vh] flex items-center justify-start overflow-hidden border-b border-stone-800/80 bg-[#07090E]">
          <div 
            className="absolute inset-0 bg-cover bg-right md:bg-center opacity-85 filter contrast-105 saturate-100 pointer-events-none"
            style={{ backgroundImage: `url('/images/biblioteca/biblioteca-public-hero.webp')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07090E] via-[#07090E]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07090E] via-transparent to-transparent" />

          <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 w-full">
            <div className="max-w-2xl space-y-6 text-left">
              <span className="text-[10px] font-mono tracking-[0.25em] text-amber-400 uppercase font-bold bg-amber-950/70 border border-amber-500/40 px-3 py-1 inline-block shadow-lg">
                BIBLIOTECA DESDE EL VÍNCULO
              </span>

              <h1 className="text-4xl md:text-6xl font-serif text-white tracking-tight leading-tight drop-shadow-2xl">
                Dejá de adivinar qué necesita tu perro.
              </h1>

              <p className="text-sm md:text-base text-stone-300 font-light leading-relaxed max-w-xl">
                Practicá cómo leer sus señales con Luno, con juegos cortos y guías para tener siempre a mano. Un solo pago, acceso de por vida y todo lo nuevo que se sume, sin costo extra.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a 
                  href="https://go.hotmart.com/X108057207S?dp=1" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs font-mono uppercase tracking-widest transition-all shadow-2xl text-center cursor-pointer rounded-sm transform hover:scale-[1.02]"
                >
                  Quiero mi acceso · USD 30 ➔
                </a>
                
                <a 
                  href="#probar-ronda"
                  className="px-6 py-4 bg-stone-900/90 hover:bg-stone-800 border border-stone-700 text-stone-200 font-bold text-xs font-mono uppercase tracking-widest transition-all text-center rounded-sm"
                >
                  Probá una ronda gratis
                </a>
              </div>

              <p className="text-[11px] font-mono text-stone-400 pt-1">
                Pago único · Sin suscripción · Funciona desde el celular · 7 días de garantía
              </p>
            </div>
          </div>
        </section>

        {/* 2. FRANJA DE CONFIANZA */}
        <div className="bg-[#0B0E14] border-y border-stone-800/80 py-4 px-6 relative z-10">
          <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-around gap-4 text-xs font-mono text-stone-300 text-center">
            <span>💳 Pago único de USD 30</span>
            <span className="hidden md:inline text-stone-700">•</span>
            <span>📱 Sin suscripción mensual</span>
            <span className="hidden md:inline text-stone-700">•</span>
            <span>🎮 Prácticas interactivas y guías PDF</span>
            <span className="hidden md:inline text-stone-700">•</span>
            <span>♾️ Actualizaciones sin costo extra</span>
          </div>
        </div>

        {/* 3. BLOQUE CÁLIDO CREMA: ¿TE SUENA? */}
        <section className="bg-[#F5F0E6] text-stone-900 py-16 px-6 relative z-10">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="space-y-2 border-l-4 border-[#C9952E] pl-4 py-1">
              <span className="text-[11px] font-mono text-[#8C5D17] uppercase tracking-widest font-bold">RECONOCIMIENTO EMOCIONAL</span>
              <h2 className="text-2xl md:text-4xl font-serif text-stone-950">
                Tu perro te habla todo el día. A casi nadie le enseñaron a escucharlo.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                { id: '1', icon: '🐕‍🦺', title: 'Se sacude de la cabeza a la cola después de cruzar la calle.', ans: '¿Se estaba secando o estaba soltando tensión?', exp: '✦ Explicación etológica: En el 90% de las situaciones urbanas es una descarga somática para liberar el pico de adrenalina tras cruzar la calle.' },
                { id: '2', icon: '🐾', title: 'Se lame el hocico cuando alguien se le acerca a acariciarlo.', ans: '¿Tenía hambre o estaba incómodo?', exp: '✦ Explicación etológica: Es un pacificador de calma. Te indica que prefiere evitar la interacción directa o requiere mayor espacio.' },
                { id: '3', icon: '🦮', title: 'Doblás la esquina y la correa queda tensa como una cuerda de guitarra.', ans: '¿Tirar o dar espacio?', exp: '✦ Explicación etológica: La tensión física incrementa el estado de alerta. Dar medio metro de correa floja desbloquea su capacidad de procesamiento.' },
                { id: '4', icon: '🚪', title: 'Bosteza justo cuando llegan a la puerta de la calle.', ans: '¿Sueño o estrés pre-paseo?', exp: '✦ Explicación etológica: Bostezo social/de autorregulación. Señala que la excitación anticipatoria está muy alta.' }
              ].map((item) => (
                <div 
                  key={item.id}
                  onClick={() => toggleTeSuena(item.id)}
                  className="bg-white border border-stone-300 hover:border-[#C9952E] p-6 space-y-3 rounded-md shadow-md cursor-pointer transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-[10px] font-mono text-[#8C5D17] font-bold uppercase">
                      {revealedTeSuena[item.id] ? 'OCULTAR EXPLICACIÓN ▴' : 'TOCÁ PARA VER RESPUESTA ▾'}
                    </span>
                  </div>
                  
                  <p className="text-base font-serif text-stone-950 font-bold group-hover:text-[#8C5D17] transition-colors">
                    {item.title}
                  </p>
                  
                  <p className="text-xs text-stone-600 font-light">
                    {item.ans}
                  </p>

                  {revealedTeSuena[item.id] && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="pt-3 border-t border-stone-200 text-xs font-mono text-[#4A320F] leading-relaxed font-medium"
                    >
                      {item.exp}
                    </motion.div>
                  )}
                </div>
              ))}
            </div>

            <p className="text-xs md:text-sm text-stone-800 font-serif italic text-center max-w-2xl mx-auto leading-relaxed bg-[#E8E1D3] p-5 rounded-md border border-stone-300">
              "No es que lo hagas mal. Es que nadie nos enseñó a leer estas señales. Leer ayuda; practicar te ayuda a reconocerlas en el momento exacto en que las necesitás."
            </p>
          </div>
        </section>

        {/* 4. PROBÁ UNA RONDA */}
        <section id="probar-ronda" className="bg-gradient-to-br from-[#07120D] via-[#0A1A12] to-[#040A07] text-stone-100 py-16 px-6 border-y border-emerald-900/40 relative z-10">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="border-l-4 border-emerald-500 pl-4 py-1 space-y-1">
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold">PRÁCTICA EN VIVO</span>
              <h2 className="text-2xl md:text-3xl font-serif text-white">Probalo vos, sin registrarte</h2>
              <p className="text-xs text-stone-300 font-light">3 casos simples para poner a prueba tu mirada antes de ingresar a la Biblioteca.</p>
            </div>

            <div className="bg-[#111C17]/90 backdrop-blur-md border border-emerald-800/60 p-6 md:p-8 space-y-6 rounded-md shadow-2xl">
              <div className="flex items-center justify-between text-xs font-mono text-stone-300 border-b border-emerald-900/80 pb-3">
                <span className="text-emerald-400 font-bold">{DEMO_CASES[demoStep].cat}</span>
                <span>CASO {demoStep + 1} DE {DEMO_CASES.length}</span>
              </div>

              <div className="aspect-video max-w-2xl mx-auto bg-black border border-emerald-900/80 overflow-hidden relative rounded-sm shadow-xl">
                <img src={DEMO_CASES[demoStep].img} alt="Caso interactivo" className="w-full h-full object-cover opacity-85" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex items-end p-5">
                  <p className="text-sm font-serif text-white font-bold leading-snug">{DEMO_CASES[demoStep].question}</p>
                </div>
              </div>

              <div className="space-y-3 max-w-2xl mx-auto">
                {DEMO_CASES[demoStep].options.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(opt)}
                    className={`w-full p-4 text-xs font-mono text-left transition-all border cursor-pointer rounded-sm ${
                      selectedOption === opt
                        ? opt.correct
                          ? 'bg-emerald-900/90 border-emerald-400 text-emerald-100 font-bold'
                          : 'bg-rose-950/90 border-rose-500 text-rose-200'
                        : 'bg-[#182720] hover:bg-[#20332A] border-emerald-900/60 text-stone-200'
                    }`}
                  >
                    {opt.text}
                  </button>
                ))}
              </div>

              {selectedOption && (
                <motion.div 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="max-w-2xl mx-auto p-5 bg-[#182720] border-l-4 border-emerald-400 text-xs font-mono text-stone-200 space-y-4 rounded-sm"
                >
                  <p className="leading-relaxed">{selectedOption.feedback}</p>
                  
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-emerald-900/80">
                    {demoStep < DEMO_CASES.length - 1 ? (
                      <button 
                        onClick={() => { setDemoStep(demoStep + 1); setSelectedOption(null); }}
                        className="px-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-[11px] uppercase tracking-wider cursor-pointer transition-colors"
                      >
                        Siguiente Caso ({demoStep + 2}/3) ➔
                      </button>
                    ) : (
                      <div className="space-y-3 w-full">
                        <div className="bg-emerald-950/80 p-3 border border-emerald-500/40 text-center text-emerald-300 font-bold">
                          🎉 Completaste la ronda: acertaste {score} de {DEMO_CASES.length} casos.
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
                          <button 
                            onClick={resetDemo}
                            className="px-4 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-300 font-mono text-[10px] uppercase tracking-wider cursor-pointer border border-stone-700"
                          >
                            🔄 Volver a empezar la prueba
                          </button>

                          <a 
                            href="https://go.hotmart.com/X108057207S?dp=1" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-[11px] uppercase tracking-wider cursor-pointer shadow-lg"
                          >
                            Quiero el Acceso Completo · USD 30 ➔
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* 5A. PRÁCTICAS INTERACTIVAS */}
        <section className="max-w-6xl mx-auto px-6 py-16 space-y-6 relative z-10">
          <div className="border-l-4 border-amber-500 pl-4 py-1">
            <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest font-bold block">ENTRENAMIENTO PRÁCTICO</span>
            <h2 className="text-2xl md:text-3xl font-serif text-white">Prácticas Interactivas con Luno</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PRACTICAS_LUNO.map((item, idx) => (
              <div key={idx} className="bg-[#0F141C] border border-stone-800/80 p-5 space-y-3 rounded-md flex flex-col justify-between hover:border-amber-500/50 transition-all group shadow-lg">
                <div className="space-y-3">
                  <div className="aspect-video w-full bg-stone-950 overflow-hidden relative border border-stone-800 rounded-sm">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-2 left-2 px-2 py-0.5 bg-black/80 text-amber-400 text-[9px] font-mono uppercase font-bold border border-amber-500/30">
                      {item.tag}
                    </span>
                  </div>
                  <h3 className="text-lg font-serif text-white font-bold group-hover:text-amber-300 transition-colors">{item.title}</h3>
                  <p className="text-xs text-stone-400 font-light leading-relaxed">{item.desc}</p>
                </div>
                <span className="text-[10px] font-mono text-amber-400 font-bold block pt-2 border-t border-stone-800">
                  ✦ {item.highlight}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 5B. GUÍAS PDF */}
        <section className="max-w-6xl mx-auto px-6 pb-16 space-y-6 relative z-10">
          <div className="border-l-4 border-emerald-500 pl-4 py-1">
            <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold block">DOCUMENTACIÓN Y MATERIAL</span>
            <h2 className="text-2xl md:text-3xl font-serif text-white">Guías para Leer y Descargar</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {GUIAS_PDF_REALES.map((pdf, idx) => (
              <div key={idx} className="bg-[#0F141C] border border-stone-800/80 p-5 flex items-start gap-4 rounded-md hover:border-emerald-500/50 transition-all shadow-md">
                <div className="w-16 h-20 bg-stone-900 border border-stone-800 shrink-0 overflow-hidden relative rounded-sm">
                  <img src={pdf.img} alt={pdf.title} className="w-full h-full object-cover opacity-75" />
                  <span className="absolute bottom-1 right-1 text-[8px] font-mono text-amber-400 font-bold">PDF</span>
                </div>

                <div className="space-y-1 flex-1">
                  <span className={`px-2 py-0.5 text-[8px] font-mono uppercase border font-bold inline-block rounded-sm ${pdf.tagColor}`}>
                    {pdf.tag}
                  </span>
                  <h4 className="text-sm font-serif text-white font-bold">{pdf.title}</h4>
                  <p className="text-[11px] text-stone-400 font-light leading-relaxed">{pdf.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 7. HOJA DE RUTA */}
        <section className="bg-[#0B1912] border-y border-emerald-900/60 py-16 px-6 relative z-10">
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="border-l-4 border-emerald-400 pl-4 py-1 space-y-1">
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold">HOJA DE RUTA RECOMENDADA</span>
              <h2 className="text-2xl md:text-3xl font-serif text-white">Tu primera semana, a tu ritmo</h2>
              <p className="text-xs text-stone-300 font-light">Un camino sugerido día a día para aprovechar todo el contenido de forma natural:</p>
            </div>

            <div className="space-y-3">
              {SEMANA_ROADMAP.map((step, idx) => (
                <div key={idx} className="flex items-start gap-4 bg-[#12241B] p-4 border-l-4 border-emerald-500 rounded-r-md hover:bg-[#162D22] transition-colors">
                  <div className="bg-emerald-950 text-emerald-400 border border-emerald-500/40 font-mono font-bold text-xs px-3 py-1.5 rounded-sm shrink-0">
                    DÍA {step.dia}
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-serif text-stone-100 font-bold">{step.titulo}</h4>
                    <p className="text-xs text-stone-300 font-light">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 10. PARA QUIÉN ES */}
        <section className="max-w-6xl mx-auto px-6 py-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#0D1A14] border border-emerald-500/30 p-6 space-y-3 rounded-md">
              <h3 className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">Es para vos si...</h3>
              <ul className="text-xs text-stone-300 space-y-2 font-light list-disc pl-4 leading-relaxed">
                <li>Querés entender mejor lo que tu perro te comunica a diario.</li>
                <li>Tu perro tira de la correa, ladra o se tensa y querés acompañarlo con calma.</li>
                <li>Preferís aprender practicando de forma visual y a tu propio ritmo.</li>
                <li>Buscás un enfoque sin castigos, tirones ni regaños.</li>
              </ul>
            </div>

            <div className="bg-[#1C1012] border border-rose-900/40 p-6 space-y-3 rounded-md">
              <h3 className="text-xs font-mono text-rose-400 font-bold uppercase tracking-wider">No es para vos si...</h3>
              <ul className="text-xs text-stone-300 space-y-2 font-light list-disc pl-4 leading-relaxed">
                <li>Buscás órdenes de adiestramiento tradicional o trucos de obediencia.</li>
                <li>Esperás consultas individuales o un plan personalizado cara a cara.</li>
                <li>Tu perro presenta agresión severa o dolor físico (requiere consulta etológica clínica directa).</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 11. OFERTA PRINCIPAL CON GRADIENTE ORGÁNICO */}
        <section className="bg-gradient-to-br from-[#08130E] via-[#0E2017] to-[#050C09] py-20 px-6 border-y border-emerald-900/50 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="relative p-[1px] rounded-md overflow-hidden bg-gradient-to-r from-emerald-500/60 via-amber-500/60 to-emerald-500/60 shadow-2xl">
              <div className="bg-[#0A120E]/95 backdrop-blur-md p-8 md:p-12 space-y-8 rounded-md relative z-10">
                <div className="space-y-3 text-center md:text-left">
                  <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold bg-emerald-950/80 border border-emerald-500/40 px-3 py-1 inline-block">
                    ACCESO VITALICIO · PAGO ÚNICO
                  </span>
                  <h2 className="text-3xl md:text-4xl font-serif text-white">Biblioteca Desde el Vínculo</h2>
                  <p className="text-xs md:text-sm text-stone-300 font-light leading-relaxed max-w-2xl">
                    Acceso sin límites a todas las prácticas interactivas con Luno, guías para leer o descargar en PDF y todo el contenido futuro que se incorpore.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-stone-800">
                  <div className="text-center sm:text-left space-y-1">
                    <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest block">VALOR DEL ACCESO</span>
                    <div className="flex items-baseline gap-2 justify-center sm:justify-start">
                      <span className="text-4xl md:text-5xl font-serif text-white font-bold">$30</span>
                      <span className="text-xs font-mono text-amber-400 uppercase font-bold">USD (Pago Único)</span>
                    </div>
                  </div>

                  <a 
                    href="https://go.hotmart.com/X108057207S?dp=1" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-10 py-4 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs font-mono uppercase tracking-widest transition-all shadow-2xl text-center cursor-pointer rounded-sm transform hover:scale-[1.02]"
                  >
                    Quiero mi acceso ➔
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 12. PREGUNTAS FRECUENTES */}
        <section className="max-w-4xl mx-auto px-6 py-16 space-y-6 relative z-10">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest font-bold">RESOLVÉ TUS DUDAS</span>
            <h2 className="text-2xl font-serif text-white">Preguntas frecuentes</h2>
          </div>

          <div className="space-y-3">
            {PREGUNTAS_FRECUENTES.map((faq, idx) => (
              <div key={idx} className="bg-[#0F141C] border border-stone-800 rounded-md overflow-hidden">
                <button 
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full text-left p-4 text-xs md:text-sm font-serif font-bold text-stone-200 flex justify-between items-center cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <span className="text-amber-400 font-mono text-xs">{openFaq === idx ? '−' : '+'}</span>
                </button>
                {openFaq === idx && (
                  <div className="p-4 pt-0 text-xs text-stone-400 font-light leading-relaxed border-t border-stone-900">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 13. CIERRE AL PIE */}
        <section className="max-w-4xl mx-auto px-6 pb-16 relative z-10">
          <div className="bg-[#0E1612] border border-emerald-900/60 p-8 shadow-2xl rounded-md text-center space-y-4">
            <h3 className="text-sm font-mono uppercase text-emerald-400 font-bold">¿Ya tenés tu acceso?</h3>
            <p className="text-xs text-stone-300 font-light">Ingresá con el correo con el que realizaste tu compra.</p>
            <button 
              onClick={() => setShowLoginModal(true)}
              className="px-8 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold font-mono text-xs uppercase tracking-widest cursor-pointer shadow-lg rounded-sm transition-all"
            >
              Ingresar ➔
            </button>
          </div>
        </section>

        {/* PIE DE PÁGINA */}
        <footer className="text-center pb-8 space-y-4 relative z-10">
          <button 
            onClick={() => navigate('/')}
            className="text-xs font-mono text-stone-500 hover:text-stone-300 transition-colors uppercase tracking-widest cursor-pointer"
          >
            ← Volver al Inicio del Sitio
          </button>
          <p className="text-[10px] text-stone-600 max-w-md mx-auto">
            Contenido educativo. No reemplaza la consulta con un profesional veterinario o etólogo si hay dolor, agresión o cambios bruscos de conducta.
          </p>
        </footer>

      </div>
    );
  }

  // 🔓 VISTA AUTORIZADA PRIVADA (SALA INTERNA ORIGINAL)
  return (
    <div className="min-h-screen bg-[#0D0E0D] text-[#E8E6E1] font-sans pb-20">
      
      <div className="bg-[#141615] border-b border-[#212523] px-4 md:px-8 py-2.5 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-stone-400">Usuario Autorizado: <strong className="text-white">{localStorage.getItem('vinculo_auth_email')}</strong></span>
        </div>
        <button 
          onClick={handleLogout}
          className="text-rose-400 hover:text-rose-300 transition-colors uppercase text-[10px] tracking-wider cursor-pointer"
        >
          Cerrar Sesión ⎋
        </button>
      </div>

      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden border-b border-[#212523]">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-80 filter contrast-125 grayscale"
          >
            <source src="/images/biblioteca/background-biblioteca.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0E0D] via-[#0D0E0D]/70 to-transparent" />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-6 py-16">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#78B092] mb-3 block">
            CENTRO DE RECURSOS ETOLÓGICOS
          </span>
          <h1 className="text-4xl md:text-6xl font-serif text-stone-100 mb-4 tracking-tight">
            Desde el Vínculo
          </h1>
          <p className="text-xs md:text-sm font-light text-stone-400 max-w-2xl mx-auto leading-relaxed">
            Un espacio inmersivo diseñado para entrenar tu mirada etológica, simular decisiones en entorno urbano y consultar material especializado de campo.
          </p>
        </div>
      </section>

      {/* ORIENTADOR DE LUNO ORIGINAL */}
      <LunoStage onSelectJuego={handleSelectDesdeLuno} />

      {/* PESTAÑAS Y CONTENIDO PRIVADO ORIGINAL */}
      <main className="max-w-6xl mx-auto px-4 md:px-8 pt-2">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 border-b border-[#212523] pb-4">
          <div className="flex items-center gap-1 bg-[#121413] p-1 border border-[#252C28]">
            <button
              onClick={() => setActiveTab('arcade')}
              className={`px-5 py-2.5 text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'arcade'
                  ? 'bg-[#1C2621] text-[#E8E6E1] border border-[#78B092]/50'
                  : 'text-stone-500 hover:text-stone-300'
              }`}
            >
              🎮 01. ARCADE DE EXPERIENCIAS
            </button>
            <button
              onClick={() => setActiveTab('guias')}
              className={`px-5 py-2.5 text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'guias'
                  ? 'bg-[#2B231B] text-[#E8E6E1] border border-amber-500/50'
                  : 'text-stone-500 hover:text-stone-300'
              }`}
            >
              📄 02. BIBLIOTECA CLÁSICA & PDFS
            </button>
          </div>

          <div className="text-[11px] font-mono text-stone-500 flex items-center gap-2">
            <span>ESTADO DEL CENTRO:</span>
            <span className="text-emerald-400 font-bold">5 EXPERIENCIAS ACTIVAS</span>
          </div>
        </div>

        {activeTab === 'arcade' && <ArcadeGrid />}
        {activeTab === 'guias' && <GuiasGrid />}
      </main>

    </div>
  );
}