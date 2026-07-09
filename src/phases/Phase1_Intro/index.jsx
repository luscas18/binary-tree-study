import { useState } from 'react';
import { useApp } from '../../context/appContextValue';
import NodeIdentification from './NodeIdentification';
import ValidityQuiz from './ValidityQuiz';
import PhaseFooter from '../../components/shared/PhaseFooter';
import PhaseStepper from '../../components/shared/PhaseStepper';
import { phaseContent } from '../../data/phaseContent';
import { t } from '../../data/translations';

// Sequência fixa do módulo: sempre começa em THEORY. Identificação e Quiz
// são práticas opcionais — não bloqueiam o avanço de sub-passo.
const STEP = { THEORY: 0, IDENTIFICATION: 1, QUIZ: 2 };
const LAST_STEP = STEP.QUIZ;

export default function Phase1_Intro() {
  const { recordResult } = useApp();
  const [subStep, setSubStep] = useState(STEP.THEORY);
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

  const steps = [t('theory'), 'Identificação (opcional)', 'Quiz'];

  // Teoria é livre e a Identificação é ambientação opcional. O Quiz é a
  // avaliação da fase e continua obrigatório para concluir.
  const footerEnabled =
    subStep === STEP.THEORY ||
    subStep === STEP.IDENTIFICATION ||
    (subStep === STEP.QUIZ && quizDone !== null);

  const footerLabel = subStep < LAST_STEP ? t('next') : t('finishPhase');

  const handleNext = () => {
    if (subStep < LAST_STEP) {
      setSubStep(subStep + 1);
    }
  };

  const handleBack = subStep > STEP.THEORY ? () => setSubStep(subStep - 1) : undefined;

  return (
    <div>
      <header style={header}>
        <span style={badge}>Fase 1</span>
        <h2 style={{ color: 'var(--text)' }}>Introdução — Estrutura da ABB</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Requisitos RA01 e RA02</p>
      </header>

      <PhaseStepper activeStep={subStep} steps={steps} />

      {subStep === STEP.THEORY && (
        <section style={card}>
          <h3 style={{ marginBottom: '12px', color: 'var(--text)' }}>{phaseContent[1].title}</h3>
          <div style={contentBody}>{phaseContent[1].content}</div>
        </section>
      )}

      {subStep === STEP.IDENTIFICATION && (
        <NodeIdentification onComplete={finishIdentification} />
      )}

      {subStep === STEP.QUIZ && (
        <ValidityQuiz onComplete={finishQuiz} />
      )}

      <PhaseFooter
        enabled={footerEnabled}
        label={footerLabel}
        onNext={subStep < LAST_STEP ? handleNext : undefined}
        onBack={handleBack}
      />
    </div>
  );
}

const header = { marginBottom: '20px' };
const badge = { display: 'inline-block', padding: '4px 12px', borderRadius: '20px', background: 'var(--primary-light)', color: 'var(--primary)', fontSize: '12px', fontWeight: 600, marginBottom: '8px' };
const card = { background: 'var(--card)', borderRadius: '12px', padding: '24px', marginBottom: '20px', border: 'none', boxShadow: 'none' };
const contentBody = { color: 'var(--text)', lineHeight: 1.7, fontSize: '14px' };
