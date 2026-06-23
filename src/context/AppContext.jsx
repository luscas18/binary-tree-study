import { useState } from 'react';
import { AppContext } from './appContextValue';

const TOTAL_PHASES = 5;

export function AppProvider({ children }) {
  const [currentPhase, setCurrentPhase] = useState(1);
  const [phaseResults, setPhaseResults] = useState({});

  const score = Object.values(phaseResults).reduce(
    (acc, { correct, total }) => ({ correct: acc.correct + correct, total: acc.total + total }),
    { correct: 0, total: 0 }
  );

  function advancePhase() {
    setCurrentPhase((p) => Math.min(p + 1, TOTAL_PHASES + 1));
  }

  function recordResult(phase, correct, total) {
    setPhaseResults((prev) => ({ ...prev, [phase]: { correct, total } }));
  }

  function restart() {
    setCurrentPhase(1);
    setPhaseResults({});
  }

  return (
    <AppContext.Provider value={{ currentPhase, phaseResults, score, advancePhase, recordResult, restart }}>
      {children}
    </AppContext.Provider>
  );
}
