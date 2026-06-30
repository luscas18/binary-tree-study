import { useMemo, useState } from 'react';
import { insert } from '../../utils/bst';
import { useApp } from '../../context/appContextValue';
import BSTSimulator from './BSTSimulator';
import AlgorithmChallenge from './AlgorithmChallenge';
import PhaseFooter from '../../components/shared/PhaseFooter';
import { phaseContent } from '../../data/phaseContent';

const INITIAL_VALUES = [50, 30, 70, 20, 40, 60, 80];
const CHALLENGE_TARGET = 45;

export default function Phase2_Algorithms() {
  const { recordResult } = useApp();
  const initialTree = useMemo(() => INITIAL_VALUES.reduce((r, v) => insert(r, v), null), []);

  const [root, setRoot] = useState(initialTree);
  const [done, setDone] = useState(false);

  const challengeTree = useMemo(() => INITIAL_VALUES.reduce((r, v) => insert(r, v), null), []);

  function handleGraded(correct) {
    recordResult(2, correct ? 1 : 0, 1);
    setDone(true);
  }

  return (
    <div>
      <header style={header}>
        <span style={badge}>Fase 2</span>
        <h2>Algoritmos — Inserção, Busca e Remoção</h2>
        <p>Requisitos RA05, RA06 e RA07</p>
      </header>

      <section style={card}>
        <h3 style={{ marginBottom: '12px' }}>{phaseContent[2].title}</h3>
        <div style={contentBody}>{phaseContent[2].content}</div>
      </section>

      <BSTSimulator root={root} setRoot={setRoot} />
      <AlgorithmChallenge root={challengeTree} target={CHALLENGE_TARGET} onGraded={handleGraded} />

      <PhaseFooter enabled={done} />
    </div>
  );
}

const header = { marginBottom: '20px' };
const badge = { display: 'inline-block', padding: '4px 12px', borderRadius: '20px', background: '#EBF0FF', color: '#2D60FF', fontSize: '12px', fontWeight: 600, marginBottom: '8px' };
const card = { background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '24px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' };
const contentBody = { color: '#374151', lineHeight: 1.7, fontSize: '14px' };
