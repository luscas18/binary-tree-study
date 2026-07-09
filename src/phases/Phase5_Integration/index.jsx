import { useState } from 'react';
import { useApp } from '../../context/appContextValue';
import CaseStudy from './CaseStudy';
import FreeExploration from './FreeExploration';
import PhaseFooter from '../../components/shared/PhaseFooter';
import PhaseStepper from '../../components/shared/PhaseStepper';
import { phaseContent } from '../../data/phaseContent';
import { t } from '../../data/translations';

export default function Phase5_Integration() {
  const { recordResult } = useApp();
  const [caseDone, setCaseDone] = useState(null);
  const [exploreDone, setExploreDone] = useState(false);
  const [subStep, setSubStep] = useState(0);

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

  const steps = [t('theory'), 'Estudo de Caso', 'Exploração'];

  const footerEnabled = 
    subStep === 0 || 
    (subStep === 1 && caseDone !== null) || 
    (subStep === 2 && exploreDone);

  const footerLabel = subStep < 2 ? t('next') : t('finishStudy');

  const handleNext = () => {
    if (subStep < 2) {
      setSubStep(subStep + 1);
    }
  };

  const handleBack = subStep > 0 ? () => setSubStep(subStep - 1) : undefined;

  return (
    <div>
      <header style={header}>
        <span style={badge}>Fase 5</span>
        <h2 style={{ color: 'var(--text)' }}>Integração — Estudo de Caso e Exploração</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Requisitos RA10 e RA11</p>
      </header>

      <PhaseStepper activeStep={subStep} steps={steps} />

      {subStep === 0 && (
        <section style={card}>
          <h3 style={{ marginBottom: '12px', color: 'var(--text)' }}>{phaseContent[5].title}</h3>
          <div style={contentBody}>{phaseContent[5].content}</div>
        </section>
      )}

      {subStep === 1 && (
        <CaseStudy onComplete={finishCase} />
      )}

      {subStep === 2 && (
        <FreeExploration onComplete={finishExplore} />
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
