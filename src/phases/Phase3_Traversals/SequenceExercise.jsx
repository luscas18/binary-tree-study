import { useMemo, useState } from 'react';
import { gradeTraversalOrder } from '../../utils/bst';
import FeedbackBanner from '../../components/shared/FeedbackBanner';
import TreeSVG from '../../components/TreeSVG';

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
      <h3 style={{ marginTop: 0, marginBottom: '4px' }}>Ordene o percurso {LABELS[type]}</h3>
      <p style={{ color: '#6B7280', marginTop: 0, marginBottom: '16px', fontSize: '14px' }}>
        Arraste e solte os nós para formar a sequência correta do percurso <strong>{LABELS[type]}</strong>.
      </p>

      <div style={{ background: '#F8FAFC', border: '1px solid #E5E7EB', borderRadius: '10px', padding: '16px', marginBottom: '20px', overflowX: 'auto' }}>
        <TreeSVG root={root} width={560} />
      </div>

      <p style={{ color: '#374151', marginTop: 0, marginBottom: '8px', fontSize: '13px', fontWeight: 600 }}>
        Sequência a ordenar:
      </p>

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', margin: '0 0 16px', minHeight: '52px' }}>
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
                background: status === 'right' ? '#ECFDF5' : status === 'wrong' ? '#FEF2F2' : '#FFFFFF',
                borderColor: dragIdx === i ? '#2D60FF' : status === 'right' ? '#10B981' : status === 'wrong' ? '#EF4444' : '#E5E7EB',
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

const card = { background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '24px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' };
const btn  = { padding: '10px 20px', borderRadius: '8px', border: 'none', background: '#2D60FF', color: '#FFFFFF', cursor: 'pointer', fontSize: '14px', fontWeight: 600 };
const slot = {
  width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center',
  borderRadius: '8px', border: '2px solid #E5E7EB', color: '#1A1D29', fontFamily: 'monospace',
  fontWeight: 'bold', fontSize: '16px', userSelect: 'none',
};
