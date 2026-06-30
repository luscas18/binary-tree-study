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

  function predict(choice) {
    if (prediction) return;
    const correct = choice === 'degenerate';
    setPrediction({ choice, correct });
    onGraded?.(correct);
  }

  const finished = count >= SEQUENCE.length;
  const degenerateNow = root && isDegenerate(root);

  return (
    <section style={card}>
      <h3 style={{ marginTop: 0, marginBottom: '4px' }}>Inserção em ordem crescente</h3>
      <p style={{ color: '#6B7280', marginTop: 0, marginBottom: '16px', fontSize: '14px' }}>
        Vamos inserir a sequência <strong>1, 2, 3, 4, 5</strong> em ordem. Preveja: que forma a árvore terá?
      </p>

      {!prediction && (
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '16px' }}>
          <button onClick={() => predict('balanced')}   style={btn}>Balanceada</button>
          <button onClick={() => predict('degenerate')} style={btn}>Degenerada (lista)</button>
        </div>
      )}

      {prediction && (
        <>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' }}>
            <button onClick={start} disabled={playing} style={{ ...btn, background: '#2D60FF' }}>
              {playing ? 'Inserindo...' : 'Inserir 1 a 5'}
            </button>
            <span style={{ color: '#6B7280', fontSize: '13px' }}>Inseridos: {count}/{SEQUENCE.length}</span>
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
              Degeneração detectada! Altura = número de nós. Este é o pior caso da ABB.
            </div>
          )}
        </>
      )}
    </section>
  );
}

const card  = { background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '24px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' };
const btn   = { padding: '10px 20px', borderRadius: '8px', border: 'none', background: '#6366F1', color: '#FFFFFF', cursor: 'pointer', fontSize: '14px', fontWeight: 600 };
const alert = { marginTop: '12px', background: '#FFFBEB', border: '1px solid #FCD34D', color: '#92400E', padding: '12px', borderRadius: '8px', fontWeight: 600, fontSize: '14px' };
