import { AppProvider } from './context/AppContext';
import { useApp } from './context/appContextValue';
import Navigation from './components/Navigation';
import SelectionScreen from './components/SelectionScreen';
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
};

function AppContent() {
  const { currentStep } = useApp();

  let content;
  if (currentStep === 'select') {
    content = <SelectionScreen />;
  } else if (currentStep === 'results') {
    content = <Results />;
  } else {
    const PhaseComponent = PHASE_COMPONENTS[currentStep];
    content = PhaseComponent ? <PhaseComponent /> : <Results />;
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F0F5FF' }}>
      {currentStep !== 'results' && <Navigation />}
      <main style={{ padding: '24px 24px 48px', maxWidth: '880px', margin: '0 auto' }}>
        {content}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
