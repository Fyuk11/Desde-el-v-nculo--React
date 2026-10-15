
import LunoHero from '../components/luno/LunoHero'; // Ajustá la ruta según tu estructura de carpetas
import LunoDiagnosisWizard from '../components/luno/LunoDiagnosisWizard';
import LunoMethodologySection from '../components/luno/LunoMethodologySection';
import LunoExperienceSection from '../components/luno/LunoExperienceSection';
import LunoWalkSimulator from '../components/luno/LunoWalkSimulator';

export default function LunoPage({ onStartDiagnosis }) {
  return (
    <div className="bg-[#0C0D0D] text-[#E8E6E1] min-h-screen">
      {/* HERO SECTION */}
      <LunoHero onStartDiagnosis={onStartDiagnosis} />
      <LunoDiagnosisWizard />
      <LunoMethodologySection />
      <LunoExperienceSection />
      <LunoWalkSimulator />

      {/* Aquí irán las siguientes secciones (Etapas, Diagnóstico, Mitos, etc.) */}
    </div>
  );
}