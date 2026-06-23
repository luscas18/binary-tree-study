// Fase 1: Introdução — Estrutura da ABB (RA01, RA02)
import { useState } from 'react';
import { useApp } from '../../context/appContextValue';
import NodeIdentification from './NodeIdentification';
import ValidityQuiz from './ValidityQuiz';
import PhaseFooter from '../../components/shared/PhaseFooter';

export default function Phase1_Intro() {
  const { recordResult } = useApp();
  const [idDone, setIdDone] = useState(null);     // { correct, total }
  const [quizDone, setQuizDone] = useState(null); // { correct, total }

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
      <header style={{ marginBottom: '20px' }}>
        <h2 style={{ color: '#e6edf3', marginBottom: '4px' }}>Fase 1 — Introdução</h2>
        <p style={{ color: '#8b949e', marginTop: 0 }}>
          Estrutura da ABB · Requisitos RA01 e RA02
        </p>
      </header>

      <NodeIdentification onComplete={finishIdentification} />
      <ValidityQuiz onComplete={finishQuiz} />

      <PhaseFooter enabled={!!done} />
    </div>
  );
}
