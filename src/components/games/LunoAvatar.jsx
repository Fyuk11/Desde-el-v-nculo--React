

const LUNO_EXPRESSIONS = {
  neutro: '/assets/luno/luno-neutro.webp',
  pensando: '/assets/luno/luno-pensando.webp',
  contento: '/assets/luno/luno-contento.webp',
  alerta: '/assets/luno/luno-alerta.webp',
  celebrando: '/assets/luno/luno-celebrando.webp'
};

export default function LunoAvatar({ state = 'neutro', message }) {
  return (
    <div className="flex items-start gap-3 bg-indigo-900/40 p-4 rounded-xl border border-indigo-500/30">
      <img 
        src={LUNO_EXPRESSIONS[state] || LUNO_EXPRESSIONS.neutro} 
        alt="Luno Guide" 
        className="w-14 h-14 object-contain transition-all duration-300 transform hover:scale-105"
      />
      <div className="flex-1">
        <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wider block mb-1">
          La Mirada de Luno
        </span>
        <p className="text-sm text-slate-100 leading-relaxed">
          {message}
        </p>
      </div>
    </div>
  );
}