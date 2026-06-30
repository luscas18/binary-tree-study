import { useState } from 'react';
import { useApp } from '../../context/appContextValue';
import NodeIdentification from './NodeIdentification';
import ValidityQuiz from './ValidityQuiz';
import PhaseFooter from '../../components/shared/PhaseFooter';
import { phaseContent } from '../../data/phaseContent';

export default function Phase1_Intro() {
  const { recordResult } = useApp();
  const [idDone, setIdDone] = useState(null);
  const [quizDone, setQuizDone] = useState(null);

  function finishIdentification(correct, total) {
    setIdDone({ correct, total });
    commit({ correct, total }, quizDone);
  }
  function finishQuiz(correct, total) {
    setQuizDone({ correct, total });
    commit(idDone, { correct, total });
  }
  function commit(a, b) {
    if (a && b) {
      recordResult(1, a.correct + b.correct, a.total + b.total);
    }
  }

  const done = idDone && quizDone;

  return (
    <div>
      <header style={header}>
        <span style={badge}>Fase 1</span>
        <h2>Introdução — Estrutura da ABB</h2>
        <p>Requisitos RA01 e RA02</p>
      </header>

      <section style={card}>
        <h3 style={{ marginBottom: '12px' }}>{phaseContent[1].title}</h3>
        <div style={contentBody}>{phaseContent[1].content}</div>
      </section>

      <NodeIdentification onComplete={finishIdentification} />
      <ValidityQuiz onComplete={finishQuiz} />

      <PhaseFooter enabled={!!done} />
    </div>
  );
}

const header = { marginBottom: '20px' };
const badge = { display: 'inline-block', padding: '4px 12px', borderRadius: '20px', background: '#EBF0FF', color: '#2D60FF', fontSize: '12px', fontWeight: 600, marginBottom: '8px' };
const card = { background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '24px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' };
const contentBody = { color: '#374151', lineHeight: 1.7, fontSize: '14px' };
