import { useEffect, useRef, useState } from 'react';
import TreeSVG from '../../components/TreeSVG';
import { traversalSteps } from '../../utils/bst';

const TRAVERSALS = [
  { id: 'inOrder',   label: 'Em ordem',  hint: 'esquerda → raiz → direita' },
  { id: 'preOrder',  label: 'Pré-ordem', hint: 'raiz → esquerda → direita' },
  { id: 'postOrder', label: 'Pós-ordem', hint: 'esquerda → direita → raiz' },
];

const STEP_MS = 700;

export default function TraversalViewer({ root }) {
  const [type, setType]       = useState(null);
  const [stepIdx, setStepIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const timerRef              = useRef(null);

  const steps    = type ? traversalSteps(root, type) : [];
  const visited  = steps.slice(0, stepIdx).map((s) => s.nodeValue);
  const current  = stepIdx > 0 && stepIdx <= steps.length ? steps[stepIdx - 1].nodeValue : null;

  // drive the animation — state changes happen inside the timeout callback (async)
  useEffect(() => {
    if (!playing || stepIdx >= steps.length) return;
    const isLast = stepIdx + 1 >= steps.length;
    timerRef.current = setTimeout(() => {
      setStepIdx(stepIdx + 1);
      if (isLast) setPlaying(false);
    }, STEP_MS);
    return () => clearTimeout(timerRef.current);
  }, [playing, stepIdx, steps.length]);

  function start(traversalType) {
    clearTimeout(timerRef.current);
    setType(traversalType);
    setStepIdx(0);
    setPlaying(true);
  }

  const finished = type && stepIdx >= steps.length;
  const sequence = visited;

  return (
    <section style={card}>
      <h3 style={{ marginTop: 0, color: '#e6edf3' }}>Apresentação — Visualizar percursos</h3>
      <p style={{ color: '#8b949e', marginTop: 0 }}>
        Escolha um percurso e observe a ordem em que os nós são visitados.
      </p>

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
        {TRAVERSALS.map((t) => (
          <button
            key={t.id}
            onClick={() => start(t.id)}
            style={{ ...btn, background: type === t.id ? '#e94560' : '#0f3460' }}
          >
            {t.label}
            <span style={{ display: 'block', fontSize: '11px', opacity: 0.8 }}>{t.hint}</span>
          </button>
        ))}
      </div>

      <TreeSVG
        root={root}
        highlightedNodes={current !== null ? [current] : []}
        visitedNodes={visited}
      />

      {type && (
        <div style={{ marginTop: '16px' }}>
          <strong style={{ color: '#8b949e' }}>Sequência gerada:</strong>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '8px', minHeight: '34px' }}>
            {sequence.map((v, i) => (
              <span key={i} style={chip}>{v}</span>
            ))}
          </div>

          {finished && (
            <div style={{ marginTop: '12px', display: 'flex', gap: '12px', alignItems: 'center' }}>
              <button onClick={() => start(type)} style={{ ...btn, background: '#16213e' }}>
                ↻ Repetir
              </button>
              {type === 'inOrder' && (
                <span style={{ color: '#52b788', fontWeight: 'bold' }}>
                  ✓ O percurso em ordem produz a sequência em ordem crescente!
                </span>
              )}
            </div>
          )}
        </div>
      )}
    </section>
  );
}

const card = { background: '#161b22', border: '1px solid #30363d', borderRadius: '10px', padding: '20px', marginBottom: '24px' };
const btn  = { padding: '10px 16px', borderRadius: '6px', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '14px' };
const chip = { background: '#1d3557', color: '#e6edf3', padding: '6px 12px', borderRadius: '6px', fontFamily: 'monospace', fontWeight: 'bold' };
