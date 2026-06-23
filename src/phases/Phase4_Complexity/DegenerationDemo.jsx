import { useEffect, useRef, useState } from 'react';
import TreeSVG from '../../components/TreeSVG';
import { insert, isDegenerate } from '../../utils/bst';
import FeedbackBanner from '../../components/shared/FeedbackBanner';

const SEQUENCE = [1, 2, 3, 4, 5];
const STEP_MS = 750;

export default function DegenerationDemo({ onGraded }) {
  const [root, setRoot]   = useState(null);
  const [count, setCount] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const timer = useRef(null);

  useEffect(() => {
    if (!playing || count >= SEQUENCE.length) return;
    const isLast = count + 1 >= SEQUENCE.length;
    timer.current = setTimeout(() => {
      setRoot((r) => insert(r, SEQUENCE[count]));
      setCount(count + 1);
      if (isLast) setPlaying(false);
    }, STEP_MS);
    return () => clearTimeout(timer.current);
  }, [playing, count]);

  function start() {
    clearTimeout(timer.current);
    setRoot(null);
    setCount(0);
    setPlaying(true);
  }

  // The student predicts the resulting shape BEFORE/while watching.
  function predict(choice) {
    if (prediction) return;
    // Inserting sorted values always yields a degenerate (linked-list) shape.
    const correct = choice === 'degenerate';
    setPrediction({ choice, correct });
    onGraded?.(correct);
  }

  const finished = count >= SEQUENCE.length;
  const degenerateNow = root && isDegenerate(root);

  return (
    <section style={card}>
      <h3 style={{ marginTop: 0, color: '#e6edf3' }}>Atividade — Inserção em ordem crescente</h3>
      <p style={{ color: '#8b949e', marginTop: 0 }}>
        Vamos inserir a sequência <strong>1, 2, 3, 4, 5</strong> em ordem. Antes de tudo, preveja: que forma a árvore terá?
      </p>

      {!prediction && (
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '16px' }}>
          <button onClick={() => predict('balanced')}   style={{ ...btn, background: '#0f3460' }}>Balanceada</button>
          <button onClick={() => predict('degenerate')} style={{ ...btn, background: '#0f3460' }}>Degenerada (lista)</button>
        </div>
      )}

      {prediction && (
        <>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' }}>
            <button onClick={start} disabled={playing} style={{ ...btn, background: '#e94560' }}>
              {playing ? 'Inserindo...' : '▶ Inserir 1 a 5'}
            </button>
            <span style={{ color: '#8b949e' }}>Inseridos: {count}/{SEQUENCE.length}</span>
          </div>

          <TreeSVG root={root} highlightedNodes={count > 0 ? [SEQUENCE[count - 1]] : []} width={500} />

          <FeedbackBanner
            type={prediction.correct ? 'correct' : 'incorrect'}
            message={
              prediction.correct
                ? 'Correto! Inserir valores já ordenados cria uma árvore degenerada — cada nó tem só um filho, virando uma lista encadeada com busca O(n).'
                : 'Na verdade, inserir valores já ordenados degenera a árvore: ela vira uma lista encadeada (cada nó só com filho à direita), e a busca passa a ser O(n).'
            }
          />

          {finished && degenerateNow && (
            <div style={alert}>
              ⚠ Degeneração detectada! Altura = número de nós. Este é o pior caso da ABB.
            </div>
          )}
        </>
      )}
    </section>
  );
}

const card  = { background: '#161b22', border: '1px solid #30363d', borderRadius: '10px', padding: '20px', marginBottom: '24px' };
const btn   = { padding: '12px 20px', borderRadius: '6px', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold' };
const alert = { marginTop: '12px', background: '#3d2817', border: '1px solid #e76f51', color: '#f4a261', padding: '12px', borderRadius: '6px', fontWeight: 'bold' };
