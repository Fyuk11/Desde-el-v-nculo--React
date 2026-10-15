import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Motores de Juego Actualizados (Todos con ./engines/)
import SignalReaderEngine from './engines/SignalReaderEngine';
import TacticalSliderEngine from './engines/TacticalSliderEngine';
import RadarDecoderEngine from './engines/RadarDecoderEngine';
import ThresholdFinderEngine from './engines/ThresholdFinderEngine';
import RhythmEngine from './engines/RhythmEngine';

// Archivos JSON de Datos
import juego1Data from './data/juego1_senales.json';
import juego2Data from './data/juego2_paseo.json';
import juego3Data from './data/juego3_refugio.json';
import juego4Data from './data/juego4_umbral.json';
import juego5Data from './data/juego5_respira.json';

const juegosMap = {
  'juego1_senales': { data: juego1Data, engine: SignalReaderEngine },
  'juego2_paseo': { data: juego2Data, engine: TacticalSliderEngine },
  'juego3_refugio': { data: juego3Data, engine: RadarDecoderEngine },
  'juego4_umbral': { data: juego4Data, engine: ThresholdFinderEngine },
  'juego5_respira': { data: juego5Data, engine: RhythmEngine },
};

export default function GameShell() {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [config, setConfig] = useState(null);
  const [lunoState, setLunoState] = useState({ pose: 'neutro', text: 'Analizando parámetros de la sala...' });
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({ reducedMotion: false, sound: false });

  useEffect(() => {
    const item = juegosMap[gameId];
    if (item) {
      setConfig(item);
    }
  }, [gameId]);

  if (!config) {
    return (
      <div className="w-screen h-screen bg-[#070A08] flex items-center justify-center font-mono text-xs text-[#78B092] tracking-widest">
        CARGANDO ENTORNO INTERACTIVO...
      </div>
    );
  }

  const EngineComponent = config.engine;

  return (
    <div className="fixed inset-0 w-screen h-[100dvh] bg-[#020504] text-[#E8E6E1] flex flex-col justify-between overflow-hidden z-50 select-none">
      
      {/* HUD Superior */}
      <header className="w-full px-6 py-4 flex items-center justify-between border-b border-cyan-500/20 bg-[#030A07]/95 backdrop-blur-xl shrink-0 z-50 shadow-lg">
        <button 
          onClick={() => navigate('/biblioteca')}
          className="px-4 py-2 bg-cyan-950/60 hover:bg-cyan-900/80 border border-cyan-500/40 rounded-xl text-xs font-mono text-cyan-200 transition-all flex items-center gap-2 group cursor-pointer shadow-md"
        >
          <span className="group-hover:-translate-x-0.5 transition-transform text-cyan-400 font-bold">←</span> 
          <span>Salir al Hub</span>
        </button>

        <div className="flex flex-col items-center">
          <span className="text-[10px] font-mono tracking-[0.2em] text-cyan-400 uppercase">Sala de Práctica Activa</span>
          <h1 className="text-sm md:text-base font-serif text-white tracking-wide">
            {config.data.title}
          </h1>
        </div>

        <button 
          onClick={() => setShowSettings(!showSettings)}
          className="p-2.5 bg-cyan-950/60 hover:bg-cyan-900/80 border border-cyan-500/40 rounded-xl text-xs text-cyan-200 transition-all cursor-pointer shadow-md"
        >
          ⚙️
        </button>
      </header>

      {/* Menú de Ajustes Flotante */}
      <AnimatePresence>
        {showSettings && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute top-20 right-6 z-50 w-64 bg-[#04110C] border border-cyan-500/40 rounded-2xl p-4 shadow-2xl backdrop-blur-2xl space-y-3"
          >
            <div className="flex justify-between items-center border-b border-cyan-500/20 pb-2">
              <span className="text-xs font-mono text-cyan-400 uppercase">Ajustes de Sesión</span>
              <button onClick={() => setShowSettings(false)} className="text-stone-400 hover:text-white text-xs cursor-pointer">✕</button>
            </div>
            <label className="flex items-center justify-between text-xs text-stone-300 cursor-pointer">
              <span>Reducir movimiento</span>
              <input 
                type="checkbox" 
                checked={preferences.reducedMotion}
                onChange={(e) => setPreferences({...preferences, reducedMotion: e.target.checked})}
                className="accent-cyan-400"
              />
            </label>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contenedor Central del Mini-Juego (Expandido al 100% real sin max-w) */}
      <main className="w-full flex-1 px-4 md:px-6 flex flex-col justify-center overflow-y-auto my-auto py-2 relative z-20">
        <EngineComponent data={config.data} onUpdateLuno={setLunoState} preferences={preferences} lunoState={lunoState} />
      </main>

      {/* Footer minimalista */}
      <footer className="w-full py-2 px-6 text-center border-t border-cyan-500/10 bg-[#030A07] text-[10px] font-mono text-stone-400 shrink-0 z-20">
        DESDE EL VÍNCULO — EXPERIENCIA PRIVADA DE ENTRENAMIENTO ETOLÓGICO
      </footer>

    </div>
  );
}