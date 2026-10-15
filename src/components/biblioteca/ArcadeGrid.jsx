import { useNavigate } from 'react-router-dom';

export default function ArcadeGrid() {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
      
      {/* TARJETA 1: Juego 1 - Lupa de Señales (Acento Terracota / Naranja Calidad) */}
      <div 
        onClick={() => navigate('/juego/juego1_senales')}
        className="md:col-span-7 bg-gradient-to-br from-[#161311] via-[#141816] to-[#111714] border-l-2 border-orange-500 border-t border-r border-b border-white/10 p-7 relative overflow-hidden group hover:border-orange-400 hover:shadow-[0_0_35px_rgba(249,115,22,0.15)] transition-all min-h-[280px] flex flex-col justify-between cursor-pointer"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#161311] via-[#161311]/80 to-transparent z-10" />
        <img 
          src="/images/biblioteca/juego1-img.webp" 
          alt="Perro mirando" 
          className="absolute right-0 top-0 h-full w-2/3 object-cover opacity-20 group-hover:opacity-35 transition-opacity z-0"
        />

        <div className="relative z-20">
          <div className="flex items-center justify-between mb-4">
            <span className="px-3 py-1 bg-orange-950/80 text-orange-300 text-[10px] font-mono uppercase tracking-wider border-l-2 border-orange-500 shadow-sm">
              MÓDULO DE OBSERVACIÓN
            </span>
          </div>
          <h3 className="text-2xl md:text-3xl font-serif text-white mb-2 font-bold tracking-tight">
            1. ¿Qué me está diciendo?
          </h3>
          <p className="text-xs md:text-sm text-stone-300 font-light max-w-md leading-relaxed">
            Aprende a pausar el segundo exacto en que la tensión comienza. Lectura de microsentimientos y lenguaje corporal en alta resolución.
          </p>
        </div>

        <div className="relative z-20 pt-4">
          <span className="text-xs font-mono text-orange-400 group-hover:text-white uppercase tracking-widest flex items-center gap-1.5 transition-colors font-bold">
            INICIAR DESAFÍO VISUAL ➔
          </span>
        </div>
      </div>

      {/* TARJETA 2: Juego 2 - Paseo en Sintonía (Acento Azul Táctico) */}
      <div 
        onClick={() => navigate('/juego/juego2_paseo')}
        className="md:col-span-5 bg-gradient-to-br from-[#111419] via-[#12161E] to-[#0D1219] border-l-2 border-blue-500 border-t border-r border-b border-white/10 p-7 relative overflow-hidden group hover:border-blue-400 hover:shadow-[0_0_35px_rgba(59,130,246,0.15)] transition-all min-h-[280px] flex flex-col justify-between cursor-pointer"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#111419] via-[#111419]/80 to-transparent z-10" />
        <img 
          src="/images/biblioteca/juego2_paseo.webp" 
          alt="Paseo" 
          className="absolute right-0 top-0 h-full w-2/3 object-cover opacity-15 group-hover:opacity-30 transition-opacity z-0"
        />

        <div className="relative z-20">
          <div className="flex items-center justify-between mb-4">
            <span className="px-3 py-1 bg-blue-950/80 text-blue-300 text-[10px] font-mono uppercase tracking-wider border-l-2 border-blue-500 shadow-sm">
              SIMULADOR TÁCTICO
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-serif text-white mb-2 font-bold tracking-tight">
            2. Paseo en Sintonía
          </h3>
          <p className="text-xs text-stone-300 font-light leading-relaxed">
            Toma decisiones de manejo de correa en tiempo real ante estímulos urbanos sorpresivos.
          </p>
        </div>

        <div className="relative z-20 pt-4">
          <span className="text-xs font-mono text-blue-400 group-hover:text-white uppercase tracking-widest flex items-center gap-1.5 transition-colors font-bold">
            ENTRAR AL SIMULADOR ➔
          </span>
        </div>
      </div>

      {/* TARJETA 3: Juego 3 - Refugio y Zonas de Calma (Acento Ámbar / Madera) */}
      <div 
        onClick={() => navigate('/juego/juego3_refugio')}
        className="md:col-span-4 bg-gradient-to-br from-[#161410] via-[#15130E] to-[#100E0A] border-l-2 border-amber-500 border-t border-r border-b border-white/10 p-6 relative overflow-hidden group hover:border-amber-400 hover:shadow-[0_0_30px_rgba(245,158,11,0.12)] transition-all min-h-[280px] flex flex-col justify-between cursor-pointer"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#161410] via-[#161410]/85 to-transparent z-10" />
        <img 
          src="/images/biblioteca/juego3_refugio.webp" 
          alt="Refugio" 
          className="absolute right-0 top-0 h-full w-2/3 object-cover opacity-15 group-hover:opacity-30 transition-opacity z-0"
        />

        <div className="relative z-20">
          <div className="flex items-center justify-between mb-3">
            <span className="px-2.5 py-1 bg-amber-950/80 text-amber-300 text-[10px] font-mono uppercase border-l-2 border-amber-500 shadow-sm">
              BIENESTAR Y ESPACIO
            </span>
          </div>
          <h3 className="text-lg md:text-xl font-serif text-white mb-2 font-bold">
            3. Refugio y Zonas de Calma
          </h3>
          <p className="text-xs text-stone-300 font-light mb-4 leading-relaxed">
            Aprende a reconocer el nivel de energía de tu perro y decodifica las señales sutiles de su cuerpo para armar su espacio seguro.
          </p>
        </div>

        <div className="relative z-20 pt-2">
          <span className="text-xs font-mono text-amber-400 group-hover:text-white uppercase tracking-widest flex items-center gap-1.5 transition-colors font-bold">
            EXPLORAR ENTORNO ➔
          </span>
        </div>
      </div>

      {/* TARJETA 4: Juego 4 - Encontrá el Umbral (Acento Rosado / Distancia) */}
      <div 
        onClick={() => navigate('/juego/juego4_umbral')}
        className="md:col-span-4 bg-gradient-to-br from-[#161013] via-[#150F11] to-[#100A0C] border-l-2 border-rose-500 border-t border-r border-b border-white/10 p-6 relative overflow-hidden group hover:border-rose-400 hover:shadow-[0_0_30px_rgba(244,63,94,0.12)] transition-all min-h-[280px] flex flex-col justify-between cursor-pointer"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#161013] via-[#161013]/85 to-transparent z-10" />
        <img 
          src="/images/biblioteca/juego4_umbral.webp" 
          alt="Umbral" 
          className="absolute right-0 top-0 h-full w-2/3 object-cover opacity-15 group-hover:opacity-30 transition-opacity z-0"
        />

        <div className="relative z-20">
          <div className="flex items-center justify-between mb-3">
            <span className="px-2.5 py-1 bg-rose-950/80 text-rose-300 text-[10px] font-mono uppercase border-l-2 border-rose-500 shadow-sm">
              DISTANCIA CRÍTICA
            </span>
          </div>
          <h3 className="text-lg md:text-xl font-serif text-white mb-2 font-bold">
            4. Encontrá el Umbral
          </h3>
          <p className="text-xs text-stone-300 font-light mb-4 leading-relaxed">
            Calcula el margen de seguridad antes de que el sistema nervioso de tu perro colapse.
          </p>
        </div>

        <div className="relative z-20 pt-2">
          <span className="text-xs font-mono text-rose-400 group-hover:text-white uppercase tracking-widest flex items-center gap-1.5 transition-colors font-bold">
            MEDIR DISTANCIA ➔
          </span>
        </div>
      </div>

      {/* TARJETA 5: Juego 5 - Respirá con Luno (Acento Esmeralda / Co-regulación) */}
      <div 
        onClick={() => navigate('/juego/juego5_respira')}
        className="md:col-span-4 bg-gradient-to-br from-[#101613] via-[#0E1511] to-[#0A100C] border-l-2 border-emerald-500 border-t border-r border-b border-white/10 p-6 relative overflow-hidden group hover:border-emerald-400 hover:shadow-[0_0_30px_rgba(16,185,129,0.12)] transition-all min-h-[280px] flex flex-col justify-between cursor-pointer"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#101613] via-[#101613]/85 to-transparent z-10" />
        <img 
          src="/images/biblioteca/juego5_respira.webp" 
          alt="Respiración y Calma" 
          className="absolute right-0 top-0 h-full w-2/3 object-cover opacity-15 group-hover:opacity-30 transition-opacity z-0"
        />

        <div className="relative z-20">
          <div className="flex items-center justify-between mb-3">
            <span className="px-2.5 py-1 bg-emerald-950/80 text-emerald-300 text-[10px] font-mono uppercase border-l-2 border-emerald-500 shadow-sm">
              CO-REGULACIÓN
            </span>
          </div>
          <h3 className="text-lg md:text-xl font-serif text-white mb-2 font-bold">
            5. Respirá con Luno
          </h3>
          <p className="text-xs text-stone-300 font-light mb-4 leading-relaxed">
            Sincronización de ritmo cardíaco y bajada de revoluciones antes de cruzar la puerta.
          </p>
        </div>

        <div className="relative z-20 pt-2">
          <span className="text-xs font-mono text-emerald-400 group-hover:text-white uppercase tracking-widest flex items-center gap-1.5 transition-colors font-bold">
            INICIAR CALMA ➔
          </span>
        </div>
      </div>

    </div>
  );
}