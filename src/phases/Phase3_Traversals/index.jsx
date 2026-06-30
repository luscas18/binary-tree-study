import { useMemo, useState } from 'react';
import { insert, inOrder } from '../../utils/bst';
import { useApp } from '../../context/appContextValue';
import TraversalViewer from './TraversalViewer';
import SequenceExercise from './SequenceExercise';
import PhaseFooter from '../../components/shared/PhaseFooter';
import { phaseContent } from '../../data/phaseContent';

const TREE_VALUES = [50, 30, 70, 20, 40, 60, 80];
const EXERCISE_TYPE = 'preOrder';

export default function Phase3_Traversals() {
  const { recordResult } = useApp();
  const root = useMemo(() => TREE_VALUES.reduce((r, v) => insert(r, v), null), []);
  const allValues = useMemo(() => inOrder(root), [root]);
  const [done, setDone] = useState(false);

  function handleGraded(correct) {
    recordResult(3, correct ? 1 : 0, 1);
    setDone(true);
  }

  return (
    <div>
      <header style={header}>
        <span style={badge}>Fase 3</span>
        <h2>Percursos — Em Ordem, Pré-Ordem e Pós-Ordem</h2>
        <p>Requisitos RA03 e RA08</p>
      </header>

      <section style={card}>
        <h3 style={{ marginBottom: '12px' }}>{phaseContent[3].title}</h3>
        <div style={contentBody}>{phaseContent[3].content}</div>
      </section>

      <TraversalViewer root={root} />
      <SequenceExercise root={root} type={EXERCISE_TYPE} values={allValues} onGraded={handleGraded} />

      <PhaseFooter enabled={done} />
    </div>
  );
}

const header = { marginBottom: '20px' };
const badge = { display: 'inline-block', padding: '4px 12px', borderRadius: '20px', background: '#EBF0FF', color: '#2D60FF', fontSize: '12px', fontWeight: 600, marginBottom: '8px' };
const card = { background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '24px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' };
const contentBody = { color: '#374151', lineHeight: 1.7, fontSize: '14px' };
