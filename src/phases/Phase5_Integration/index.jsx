// Fase 5: Integração — Estudo de caso e exploração (RA10, RA11)
import { useState } from 'react';
import { useApp } from '../../context/appContextValue';
import CaseStudy from './CaseStudy';
import FreeExploration from './FreeExploration';
import PhaseFooter from '../../components/shared/PhaseFooter';

export default function Phase5_Integration() {
  const { recordResult } = useApp();
  const [caseDone, setCaseDone] = useState(null);    // { correct, total }
  const [exploreDone, setExploreDone] = useState(false);

  function finishCase(correct, total) {
    setCaseDone({ correct, total });
    commit({ correct, total }, exploreDone);
  }
  function finishExplore() {
    setExploreDone(true);
    commit(caseDone, true);
  }
  function commit(c, e) {
    if (c && e) {
      // case study (RA10) graded + exploration participation (RA11) counts as 1
      recordResult(5, c.correct + 1, c.total + 1);
    }
  }

  const done = caseDone && exploreDone;

  return (
    <div>
      <header style={{ marginBottom: '20px' }}>
        <h2 style={{ color: '#e6edf3', marginBottom: '4px' }}>Fase 5 — Integração</h2>
        <p style={{ color: '#8b949e', marginTop: 0 }}>
          Estudo de caso e exploração · Requisitos RA10 e RA11
        </p>
      </header>

      <CaseStudy onComplete={finishCase} />
      <FreeExploration onComplete={finishExplore} />

      <PhaseFooter enabled={!!done} label="Ver resultados →" />
    </div>
  );
}
