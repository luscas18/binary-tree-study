// Fase 2: Algoritmos — Inserção, Busca e Remoção (RA05, RA06, RA07)
import { useMemo, useState } from 'react';
import { insert } from '../../utils/bst';
import { useApp } from '../../context/appContextValue';
import BSTSimulator from './BSTSimulator';
import AlgorithmChallenge from './AlgorithmChallenge';
import PhaseFooter from '../../components/shared/PhaseFooter';

const INITIAL_VALUES = [50, 30, 70, 20, 40, 60, 80];
const CHALLENGE_TARGET = 45;

export default function Phase2_Algorithms() {
  const { recordResult } = useApp();
  const initialTree = useMemo(() => INITIAL_VALUES.reduce((r, v) => insert(r, v), null), []);

  const [root, setRoot] = useState(initialTree);
  const [done, setDone] = useState(false);

  // separate tree for the challenge so the simulator edits don't affect it
  const challengeTree = useMemo(() => INITIAL_VALUES.reduce((r, v) => insert(r, v), null), []);

  function handleGraded(correct) {
    recordResult(2, correct ? 1 : 0, 1);
    setDone(true);
  }

  return (
    <div>
      <header style={{ marginBottom: '20px' }}>
        <h2 style={{ color: '#e6edf3', marginBottom: '4px' }}>Fase 2 — Algoritmos</h2>
        <p style={{ color: '#8b949e', marginTop: 0 }}>
          Inserção, busca e remoção · Requisitos RA05, RA06 e RA07
        </p>
      </header>

      <BSTSimulator root={root} setRoot={setRoot} />
      <AlgorithmChallenge root={challengeTree} target={CHALLENGE_TARGET} onGraded={handleGraded} />

      <PhaseFooter enabled={done} />
    </div>
  );
}
