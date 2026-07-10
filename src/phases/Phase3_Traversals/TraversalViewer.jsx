import { useState } from 'react';
import TreeSVG from '../../components/TreeSVG';
import PlaybackControls from '../../components/shared/PlaybackControls';
import { usePlayback } from '../../hooks/usePlayback';
import { traversalSteps } from '../../utils/bst';

const TRAVERSALS = [
  { id: 'inOrder',   label: 'Em ordem',  hint: 'esquerda → raiz → direita' },
  { id: 'preOrder',  label: 'Pré-ordem', hint: 'raiz → esquerda → direita' },
  { id: 'postOrder', label: 'Pós-ordem', hint: 'esquerda → direita → raiz' },
];

export default function TraversalViewer({ root }) {
  const [type, setType] = useState(null);
  const steps = type ? traversalSteps(root, type) : [];

  const { stepIdx, playing, speed, setSpeed, play, pause, stepForward, stepBack, reset } =
    usePlayback(steps.length);

  const visited  = steps.slice(0, stepIdx).map((s) => s.nodeValue);
  const current  = stepIdx > 0 && stepIdx <= steps.length ? steps[stepIdx - 1].nodeValue : null;

  function start(traversalType) {
    reset();
    setType(traversalType);
    play();
  }

  const finished = type && stepIdx >= steps.length;
  const sequence = visited;

  return (
    <section style={card}>
      <h3 style={{ marginTop: 0, marginBottom: '4px' }}>Visualizar percursos</h3>
      <p style={{ color: '#6B7280', marginTop: 0, marginBottom: '16px', fontSize: '14px' }}>
        Escolha um percurso e observe a ordem em que os nós são visitados. Use os controles para avançar, voltar ou reproduzir automaticamente.
      </p>

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
        {TRAVERSALS.map((t) => (
          <button
            key={t.id}
            onClick={() => start(t.id)}
            style={{ ...btn, background: type === t.id ? '#2D60FF' : '#F3F4F6', color: type === t.id ? '#FFFFFF' : '#374151' }}
          >
            {t.label}
            <span style={{ display: 'block', fontSize: '11px', opacity: 0.7 }}>{t.hint}</span>
          </button>
        ))}
      </div>

      <TreeSVG
        root={root}
        highlightedNodes={current !== null ? [current] : []}
        visitedNodes={visited}
      />

      {type && (
        <>
          <PlaybackControls
            stepIdx={stepIdx}
            total={steps.length}
            playing={playing}
            speed={speed}
            setSpeed={setSpeed}
            play={play}
            pause={pause}
            stepForward={stepForward}
            stepBack={stepBack}
          />

          <div style={{ marginTop: '16px' }}>
            <strong style={{ color: '#6B7280', fontSize: '13px' }}>Sequência gerada:</strong>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '8px', minHeight: '34px' }}>
              {sequence.map((v, i) => (
                <span key={i} style={chip}>{v}</span>
              ))}
            </div>

            {finished && (
              <div style={{ marginTop: '12px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                <button onClick={() => start(type)} style={{ ...btn, background: '#F3F4F6', color: '#374151' }}>
                  Repetir
                </button>
                {type === 'inOrder' && (
                  <span style={{ color: '#10B981', fontWeight: 600, fontSize: '14px' }}>
                    O percurso em ordem produz a sequência em ordem crescente!
                  </span>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </section>
  );
}

const card = { background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '24px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' };
const btn  = { padding: '10px 16px', borderRadius: '8px', border: '1px solid #E5E7EB', cursor: 'pointer', fontSize: '13px', fontWeight: 500 };
const chip = { background: '#EBF0FF', color: '#2D60FF', padding: '6px 12px', borderRadius: '6px', fontFamily: 'monospace', fontWeight: 600, fontSize: '13px' };
