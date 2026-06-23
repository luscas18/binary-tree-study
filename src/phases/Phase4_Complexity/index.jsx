// Fase 4: Complexidade — Caso médio, pior caso e degeneração (RA04, RA09)
import { useState } from 'react';
import { useApp } from '../../context/appContextValue';
import ComplexityComparison from './ComplexityComparison';
import DegenerationDemo from './DegenerationDemo';
import PhaseFooter from '../../components/shared/PhaseFooter';

export default function Phase4_Complexity() {
  const { recordResult } = useApp();
  const [a, setA] = useState(null);
  const [b, setB] = useState(null);

  function gradeA(correct) { setA(correct); commit(correct, b); }
  function gradeB(correct) { setB(correct); commit(a, correct); }
  function commit(x, y) {
    if (x !== null && y !== null) {
      recordResult(4, (x ? 1 : 0) + (y ? 1 : 0), 2);
    }
  }

  const done = a !== null && b !== null;

  return (
    <div>
      <header style={{ marginBottom: '20px' }}>
        <h2 style={{ color: '#e6edf3', marginBottom: '4px' }}>Fase 4 — Complexidade</h2>
        <p style={{ color: '#8b949e', marginTop: 0 }}>
          Caso médio, pior caso e degeneração · Requisitos RA04 e RA09
        </p>
      </header>

      <ComplexityComparison onGraded={gradeA} />
      <DegenerationDemo onGraded={gradeB} />

      <PhaseFooter enabled={done} />
    </div>
  );
}
