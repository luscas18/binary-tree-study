import { useMemo, useState } from 'react';
import TreeSVG from '../../components/TreeSVG';
import { insert, countComparisons, getHeight } from '../../utils/bst';
import FeedbackBanner from '../../components/shared/FeedbackBanner';

const BALANCED_ORDER   = [4, 2, 6, 1, 3, 5, 7];
const DEGENERATE_ORDER = [1, 2, 3, 4, 5, 6, 7];
const TARGET = 7; // worst case for the degenerate tree

export default function ComplexityComparison({ onGraded }) {
  const balanced   = useMemo(() => BALANCED_ORDER.reduce((r, v) => insert(r, v), null), []);
  const degenerate = useMemo(() => DEGENERATE_ORDER.reduce((r, v) => insert(r, v), null), []);

  const [prediction, setPrediction] = useState(null);

  const balancedCount   = countComparisons(balanced, TARGET);
  const degenerateCount = countComparisons(degenerate, TARGET);
  // The student predicts which structure finds TARGET with FEWER comparisons.
  const correctAnswer = balancedCount <= degenerateCount ? 'balanced' : 'degenerate';

  function predict(choice) {
    if (prediction) return;
    const correct = choice === correctAnswer;
    setPrediction({ choice, correct });
    onGraded?.(correct);
  }

  return (
    <section style={card}>
      <h3 style={{ marginTop: 0, color: '#e6edf3' }}>Apresentação — Balanceada vs. Degenerada</h3>
      <p style={{ color: '#8b949e', marginTop: 0 }}>
        As duas árvores contêm os mesmos valores (1 a 7). Em qual delas a busca por <strong>{TARGET}</strong> faz
        <strong> menos comparações</strong>?
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div style={col}>
          <h4 style={{ color: '#52b788', textAlign: 'center' }}>Balanceada (altura {getHeight(balanced)})</h4>
          <TreeSVG root={balanced} foundNode={prediction ? TARGET : null} width={320} />
          {prediction && <p style={metric}>Comparações: <strong>{balancedCount}</strong> ≈ O(log n)</p>}
        </div>
        <div style={col}>
          <h4 style={{ color: '#e94560', textAlign: 'center' }}>Degenerada (altura {getHeight(degenerate)})</h4>
          <TreeSVG root={degenerate} foundNode={prediction ? TARGET : null} width={320} />
          {prediction && <p style={metric}>Comparações: <strong>{degenerateCount}</strong> ≈ O(n)</p>}
        </div>
      </div>

      {!prediction ? (
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '16px' }}>
          <button onClick={() => predict('balanced')}   style={{ ...btn, background: '#2d6a4f' }}>Balanceada</button>
          <button onClick={() => predict('degenerate')} style={{ ...btn, background: '#6b2737' }}>Degenerada</button>
        </div>
      ) : (
        <FeedbackBanner
          type={prediction.correct ? 'correct' : 'incorrect'}
          message={
            prediction.correct
              ? `Correto! A árvore balanceada encontra ${TARGET} em ${balancedCount} comparações, enquanto a degenerada precisa de ${degenerateCount}.`
              : `Na verdade a árvore balanceada é mais eficiente: ${balancedCount} comparações contra ${degenerateCount} da degenerada.`
          }
        />
      )}
    </section>
  );
}

const card   = { background: '#161b22', border: '1px solid #30363d', borderRadius: '10px', padding: '20px', marginBottom: '24px' };
const col    = { background: '#0d1117', borderRadius: '8px', padding: '12px' };
const metric = { color: '#a8dadc', textAlign: 'center', fontFamily: 'monospace', marginBottom: 0 };
const btn    = { padding: '12px 24px', borderRadius: '6px', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '15px', fontWeight: 'bold' };
