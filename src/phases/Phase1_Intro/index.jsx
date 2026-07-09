import { useState } from 'react';
import { useApp } from '../../context/appContextValue';
import NodeIdentification from './NodeIdentification';
import ValidityQuiz from './ValidityQuiz';
import PhaseFooter from '../../components/shared/PhaseFooter';
import PhaseStepper from '../../components/shared/PhaseStepper';
import { phaseContent } from '../../data/phaseContent';
import { t } from '../../data/translations';

export default function Phase1_Intro() {
  const { recordResult } = useApp();
  const [subStep, setSubStep] = useState(0);
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

  const steps = [t('theory'), 'Identificação', 'Quiz'];

  const footerEnabled = 
    subStep === 0 || 
    (subStep === 1 && idDone !== null) || 
    (subStep === 2 && quizDone !== null);

  const footerLabel = subStep < 2 ? t('next') : t('finishPhase');

  const handleNext = () => {
    if (subStep < 2) {
      setSubStep(subStep + 1);
    }
  };

  const handleBack = subStep > 0 ? () => setSubStep(subStep - 1) : undefined;

  return (
    <div>
      <header style={header}>
        <span style={badge}>Fase 1</span>
        <h2 style={{ color: 'var(--text)' }}>Introdução — Estrutura da ABB</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Requisitos RA01 e RA02</p>
      </header>

      <PhaseStepper activeStep={subStep} steps={steps} />

      {subStep === 0 && (
        <section style={card}>
          <h3 style={{ marginBottom: '12px', color: 'var(--text)' }}>{phaseContent[1].title}</h3>
          <div style={contentBody}>{phaseContent[1].content}</div>
        </section>
      )}

      {subStep === 1 && (
        <NodeIdentification onComplete={finishIdentification} />
      )}

      {subStep === 2 && (
        <ValidityQuiz onComplete={finishQuiz} />
      )}

      <PhaseFooter 
        enabled={footerEnabled} 
        label={footerLabel}
        onNext={subStep < 2 ? handleNext : undefined}
        onBack={handleBack}
      />
    </div>
  );
}

const header = { marginBottom: '20px' };
const badge = { display: 'inline-block', padding: '4px 12px', borderRadius: '20px', background: 'var(--primary-light)', color: 'var(--primary)', fontSize: '12px', fontWeight: 600, marginBottom: '8px' };
const card = { background: 'var(--card)', borderRadius: '12px', padding: '24px', marginBottom: '20px', border: 'none', boxShadow: 'none' };
const contentBody = { color: 'var(--text)', lineHeight: 1.7, fontSize: '14px' };
