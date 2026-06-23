import { AppProvider } from './context/AppContext';
import { useApp } from './context/appContextValue';
import Navigation from './components/Navigation';
import Phase1_Intro from './phases/Phase1_Intro';
import Phase2_Algorithms from './phases/Phase2_Algorithms';
import Phase3_Traversals from './phases/Phase3_Traversals';
import Phase4_Complexity from './phases/Phase4_Complexity';
import Phase5_Integration from './phases/Phase5_Integration';
import Results from './phases/Results';

const PHASE_COMPONENTS = {
  1: Phase1_Intro,
  2: Phase2_Algorithms,
  3: Phase3_Traversals,
  4: Phase4_Complexity,
  5: Phase5_Integration,
  6: Results,
};

function AppContent() {
  const { currentPhase } = useApp();
  const PhaseComponent = PHASE_COMPONENTS[currentPhase] ?? Results;

  return (
    <div style={{ minHeight: '100vh', background: '#0d1117', color: '#e6edf3', fontFamily: 'sans-serif' }}>
      {currentPhase <= 5 && <Navigation />}
      <main style={{ padding: '24px', maxWidth: '960px', margin: '0 auto' }}>
        <PhaseComponent />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider style={{background:'#0d1117'}}>
      <AppContent />
    </AppProvider>
  );
}
