import { useMemo, useState } from 'react';
import TreeSVG from '../../components/TreeSVG';
import { insert, countComparisons, getHeight } from '../../utils/bst';
import FeedbackBanner from '../../components/shared/FeedbackBanner';

const BALANCED_ORDER   = [4, 2, 6, 1, 3, 5, 7];
const DEGENERATE_ORDER = [1, 2, 3, 4, 5, 6, 7];
const TARGET = 7;

export default function ComplexityComparison({ onGraded }) {
  const balanced   = useMemo(() => BALANCED_ORDER.reduce((r, v) => insert(r, v), null), []);
  const degenerate = useMemo(() => DEGENERATE_ORDER.reduce((r, v) => insert(r, v), null), []);

  const [prediction, setPrediction] = useState(null);

  const balancedCount   = countComparisons(balanced, TARGET);
  const degenerateCount = countComparisons(degenerate, TARGET);
  const correctAnswer = balancedCount <= degenerateCount ? 'balanced' : 'degenerate';

  function predict(choice) {
    if (prediction) return;
    const correct = choice === correctAnswer;
    setPrediction({ choice, correct });
    onGraded?.(correct);
  }

  return (
    <section style={card}>
      <h3 style={{ marginTop: 0, marginBottom: '4px' }}>Balanceada vs. Degenerada</h3>
      <p style={{ color: '#6B7280', marginTop: 0, marginBottom: '16px', fontSize: '14px' }}>
        As duas árvores contêm os mesmos valores (1 a 7). Em qual delas a busca por <strong>{TARGET}</strong> faz
        <strong> menos comparações</strong>?
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div style={col}>
          <h4 style={{ color: '#10B981', textAlign: 'center', marginBottom: '8px' }}>Balanceada (altura {getHeight(balanced)})</h4>
          <TreeSVG root={balanced} foundNode={prediction ? TARGET : null} width={320} />
          {prediction && <p style={metric}>Comparações: <strong>{balancedCount}</strong> ≈ O(log n)</p>}
        </div>
        <div style={col}>
          <h4 style={{ color: '#EF4444', textAlign: 'center', marginBottom: '8px' }}>Degenerada (altura {getHeight(degenerate)})</h4>
          <TreeSVG root={degenerate} foundNode={prediction ? TARGET : null} width={320} />
          {prediction && <p style={metric}>Comparações: <strong>{degenerateCount}</strong> ≈ O(n)</p>}
        </div>
      </div>

      {!prediction ? (
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '16px' }}>
          <button onClick={() => predict('balanced')}   style={{ ...btn, background: '#10B981' }}>Balanceada</button>
          <button onClick={() => predict('degenerate')} style={{ ...btn, background: '#EF4444' }}>Degenerada</button>
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

const card   = { background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '24px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' };
const col    = { background: '#F8FAFC', borderRadius: '8px', padding: '12px', border: '1px solid #E5E7EB' };
const metric = { color: '#374151', textAlign: 'center', fontFamily: 'monospace', marginBottom: 0, fontSize: '13px', marginTop: '8px' };
const btn    = { padding: '10px 24px', borderRadius: '8px', border: 'none', color: '#FFFFFF', cursor: 'pointer', fontSize: '14px', fontWeight: 600 };
