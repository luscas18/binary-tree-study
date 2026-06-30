import { useState } from 'react';
import { useApp } from '../../context/appContextValue';
import ComplexityComparison from './ComplexityComparison';
import DegenerationDemo from './DegenerationDemo';
import PhaseFooter from '../../components/shared/PhaseFooter';
import { phaseContent } from '../../data/phaseContent';

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
      <header style={header}>
        <span style={badge}>Fase 4</span>
        <h2>Complexidade — Caso Médio, Pior Caso e Degeneração</h2>
        <p>Requisitos RA04 e RA09</p>
      </header>

      <section style={card}>
        <h3 style={{ marginBottom: '12px' }}>{phaseContent[4].title}</h3>
        <div style={contentBody}>{phaseContent[4].content}</div>
      </section>

      <ComplexityComparison onGraded={gradeA} />
      <DegenerationDemo onGraded={gradeB} />

      <PhaseFooter enabled={done} />
    </div>
  );
}

const header = { marginBottom: '20px' };
const badge = { display: 'inline-block', padding: '4px 12px', borderRadius: '20px', background: '#EBF0FF', color: '#2D60FF', fontSize: '12px', fontWeight: 600, marginBottom: '8px' };
const card = { background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '24px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' };
const contentBody = { color: '#374151', lineHeight: 1.7, fontSize: '14px' };
