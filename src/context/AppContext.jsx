import { useState, useCallback } from 'react';
import { AppContext } from './appContextValue';

export function AppProvider({ children }) {
  const [flow, setFlow] = useState([1, 2, 3, 'select']);
  const [flowIndex, setFlowIndex] = useState(0);
  const [phaseResults, setPhaseResults] = useState({});

  const currentStep = flow[flowIndex] ?? 'results';

  const score = Object.values(phaseResults).reduce(
    (acc, { correct, total }) => ({ correct: acc.correct + correct, total: acc.total + total }),
    { correct: 0, total: 0 },
  );

  const advancePhase = useCallback(() => {
    setFlowIndex((i) => i + 1);
  }, []);

  const goBack = useCallback(() => {
    setFlowIndex((i) => Math.max(0, i - 1));
  }, []);

  const selectPhase = useCallback((chosen) => {
    setFlow((prev) => {
      const selectIdx = prev.indexOf('select');
      const baseFlow = selectIdx !== -1 ? prev.slice(0, selectIdx + 1) : [1, 2, 3, 'select'];
      return [...baseFlow, chosen, 'results'];
    });
    setFlowIndex((i) => i + 1);
  }, []);

  const recordResult = useCallback((phase, correct, total) => {
    setPhaseResults((prev) => ({ ...prev, [phase]: { correct, total } }));
  }, []);

  const restart = useCallback(() => {
    setFlow([1, 2, 3, 'select']);
    setFlowIndex(0);
    setPhaseResults({});
  }, []);

  const completedPhases = flow.slice(0, flowIndex).filter((s) => typeof s === 'number');

  return (
    <AppContext.Provider
      value={{
        currentStep,
        flowIndex,
        flow,
        completedPhases,
        phaseResults,
        score,
        advancePhase,
        goBack,
        selectPhase,
        recordResult,
        restart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
