import { useMemo, useState } from 'react';
import { insert, inOrder } from '../../utils/bst';
import { useApp } from '../../context/appContextValue';
import TraversalViewer from './TraversalViewer';
import SequenceExercise from './SequenceExercise';
import PhaseFooter from '../../components/shared/PhaseFooter';
import PhaseStepper from '../../components/shared/PhaseStepper';
import { phaseContent } from '../../data/phaseContent';
import { t } from '../../data/translations';

const TREE_VALUES = [50, 30, 70, 20, 40, 60, 80];
const EXERCISE_TYPE = 'preOrder';

export default function Phase3_Traversals() {
  const { recordResult } = useApp();
  const root = useMemo(() => TREE_VALUES.reduce((r, v) => insert(r, v), null), []);
  const allValues = useMemo(() => inOrder(root), [root]);
  const [done, setDone] = useState(false);
  const [subStep, setSubStep] = useState(0);

  function handleGraded(correct) {
    recordResult(3, correct ? 1 : 0, 1);
    setDone(true);
  }

  const steps = [t('theory'), 'Visualizador', 'Exercício'];

  const footerEnabled = subStep < 2 || done;
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
        <span style={badge}>Fase 3</span>
        <h2 style={{ color: 'var(--text)' }}>Percursos — Em Ordem, Pré-Ordem e Pós-Ordem</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Requisitos RA03 e RA08</p>
      </header>

      <PhaseStepper activeStep={subStep} steps={steps} />

      {subStep === 0 && (
        <section style={card}>
          <h3 style={{ marginBottom: '12px', color: 'var(--text)' }}>{phaseContent[3].title}</h3>
          <div style={contentBody}>{phaseContent[3].content}</div>
        </section>
      )}

      {subStep === 1 && (
        <TraversalViewer root={root} />
      )}

      {subStep === 2 && (
        <SequenceExercise root={root} type={EXERCISE_TYPE} values={allValues} onGraded={handleGraded} />
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
