import { useState } from 'react';
import { useApp } from '../../context/appContextValue';
import ComplexityComparison from './ComplexityComparison';
import DegenerationDemo from './DegenerationDemo';
import PhaseFooter from '../../components/shared/PhaseFooter';
import PhaseStepper from '../../components/shared/PhaseStepper';
import { phaseContent } from '../../data/phaseContent';
import { t } from '../../data/translations';

export default function Phase4_Complexity() {
  const { recordResult } = useApp();
  const [a, setA] = useState(null);
  const [b, setB] = useState(null);
  const [subStep, setSubStep] = useState(0);

  function gradeA(correct) { setA(correct); commit(correct, b); }
  function gradeB(correct) { setB(correct); commit(a, correct); }
  function commit(x, y) {
    if (x !== null && y !== null) {
      recordResult(4, (x ? 1 : 0) + (y ? 1 : 0), 2);
    }
  }

  const steps = [t('theory'), 'Comparação', 'Degeneração'];

  const footerEnabled = 
    subStep === 0 || 
    (subStep === 1 && a !== null) || 
    (subStep === 2 && b !== null);

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
        <span style={badge}>Fase 4</span>
        <h2 style={{ color: 'var(--text)' }}>Complexidade — Caso Médio, Pior Caso e Degeneração</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Requisitos RA04 e RA09</p>
      </header>

      <PhaseStepper activeStep={subStep} steps={steps} />

      {subStep === 0 && (
        <section style={card}>
          <h3 style={{ marginBottom: '12px', color: 'var(--text)' }}>{phaseContent[4].title}</h3>
          <div style={contentBody}>{phaseContent[4].content}</div>
        </section>
      )}

      {subStep === 1 && (
        <ComplexityComparison onGraded={gradeA} />
      )}

      {subStep === 2 && (
        <DegenerationDemo onGraded={gradeB} />
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
