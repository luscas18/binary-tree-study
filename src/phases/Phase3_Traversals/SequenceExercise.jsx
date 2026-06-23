import { useMemo, useState } from 'react';
import { gradeTraversalOrder } from '../../utils/bst';
import FeedbackBanner from '../../components/shared/FeedbackBanner';

const LABELS = { inOrder: 'em ordem', preOrder: 'pré-ordem', postOrder: 'pós-ordem' };

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function SequenceExercise({ root, type, values, onGraded }) {
  const initial = useMemo(() => shuffle(values), [values]);
  const [order, setOrder]   = useState(initial);
  const [dragIdx, setDragIdx] = useState(null);
  const [result, setResult] = useState(null);

  function handleDrop(targetIdx) {
    if (dragIdx === null || dragIdx === targetIdx) return;
    const next = [...order];
    const [moved] = next.splice(dragIdx, 1);
    next.splice(targetIdx, 0, moved);
    setOrder(next);
    setDragIdx(null);
  }

  function verify() {
    const graded = gradeTraversalOrder(root, type, order);
    setResult(graded);
    onGraded?.(graded.correct);
  }

  return (
    <section style={card}>
      <h3 style={{ marginTop: 0, color: '#e6edf3' }}>Atividade — Ordene o percurso {LABELS[type]}</h3>
      <p style={{ color: '#8b949e', marginTop: 0 }}>
        Arraste e solte os nós para formar a sequência correta do percurso <strong>{LABELS[type]}</strong>.
      </p>

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', margin: '16px 0', minHeight: '52px' }}>
        {order.map((v, i) => {
          const status = result
            ? result.mistakes.some((m) => m.index === i) ? 'wrong' : 'right'
            : 'neutral';
          return (
            <div
              key={`${v}-${i}`}
              draggable={!result}
              onDragStart={() => setDragIdx(i)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(i)}
              style={{
                ...slot,
                cursor: result ? 'default' : 'grab',
                background: status === 'right' ? '#2d6a4f' : status === 'wrong' ? '#6b2737' : '#1d3557',
                borderColor: dragIdx === i ? '#e94560' : '#457b9d',
              }}
            >
              {v}
            </div>
          );
        })}
      </div>

      {!result && (
        <button onClick={verify} style={btn}>Verificar</button>
      )}

      {result && (
        <FeedbackBanner
          type={result.correct ? 'correct' : 'incorrect'}
          message={
            result.correct
              ? `Correto! Essa é a sequência ${LABELS[type]}: ${result.expected.join(', ')}.`
              : `Ainda não. A sequência correta é: ${result.expected.join(', ')}. Os nós em vermelho estão na posição errada.`
          }
        />
      )}
    </section>
  );
}

const card = { background: '#161b22', border: '1px solid #30363d', borderRadius: '10px', padding: '20px', marginBottom: '24px' };
const btn  = { padding: '10px 20px', borderRadius: '6px', border: 'none', background: '#e94560', color: '#fff', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold' };
const slot = {
  width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center',
  borderRadius: '8px', border: '2px solid #457b9d', color: '#e6edf3', fontFamily: 'monospace',
  fontWeight: 'bold', fontSize: '16px', userSelect: 'none',
};
