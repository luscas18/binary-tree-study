// Fase 3: Percursos — Em ordem, Pré-ordem e Pós-ordem (RA03, RA08)
import { useMemo, useState } from 'react';
import { insert, inOrder } from '../../utils/bst';
import { useApp } from '../../context/appContextValue';
import TraversalViewer from './TraversalViewer';
import SequenceExercise from './SequenceExercise';
import PhaseFooter from '../../components/shared/PhaseFooter';

const TREE_VALUES = [50, 30, 70, 20, 40, 60, 80];
// exercise picks pre-order so the answer differs from a trivial sorted list
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
      <header style={{ marginBottom: '20px' }}>
        <h2 style={{ color: '#e6edf3', marginBottom: '4px' }}>Fase 3 — Percursos</h2>
        <p style={{ color: '#8b949e', marginTop: 0 }}>
          Em ordem, pré-ordem e pós-ordem · Requisitos RA03 e RA08
        </p>
      </header>

      <TraversalViewer root={root} />
      <SequenceExercise root={root} type={EXERCISE_TYPE} values={allValues} onGraded={handleGraded} />

      <PhaseFooter enabled={done} />
    </div>
  );
}
