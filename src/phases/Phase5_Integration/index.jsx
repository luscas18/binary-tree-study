import { useState } from 'react';
import { useApp } from '../../context/appContextValue';
import CaseStudy from './CaseStudy';
import FreeExploration from './FreeExploration';
import PhaseFooter from '../../components/shared/PhaseFooter';
import { phaseContent } from '../../data/phaseContent';

export default function Phase5_Integration() {
  const { recordResult } = useApp();
  const [caseDone, setCaseDone] = useState(null);
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
      recordResult(5, c.correct + 1, c.total + 1);
    }
  }

  const done = caseDone && exploreDone;

  return (
    <div>
      <header style={header}>
        <span style={badge}>Fase 5</span>
        <h2>Integração — Estudo de Caso e Exploração</h2>
        <p>Requisitos RA10 e RA11</p>
      </header>

      <section style={card}>
        <h3 style={{ marginBottom: '12px' }}>{phaseContent[5].title}</h3>
        <div style={contentBody}>{phaseContent[5].content}</div>
      </section>

      <CaseStudy onComplete={finishCase} />
      <FreeExploration onComplete={finishExplore} />

      <PhaseFooter enabled={!!done} label="Ver resultados →" />
    </div>
  );
}

const header = { marginBottom: '20px' };
const badge = { display: 'inline-block', padding: '4px 12px', borderRadius: '20px', background: '#EBF0FF', color: '#2D60FF', fontSize: '12px', fontWeight: 600, marginBottom: '8px' };
const card = { background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '24px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' };
const contentBody = { color: '#374151', lineHeight: 1.7, fontSize: '14px' };
