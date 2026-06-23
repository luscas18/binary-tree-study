import { useMemo, useState } from 'react';
import TreeSVG from '../../components/TreeSVG';
import { insertSteps } from '../../utils/bst';
import FeedbackBanner from '../../components/shared/FeedbackBanner';

export default function AlgorithmChallenge({ root, target, onGraded }) {
  const compareSteps = useMemo(
    () => insertSteps(root, target).filter((s) => s.action === 'compare'),
    [root, target]
  );

  const [answers, setAnswers] = useState([]);   // chosen directions
  const [wrongAt, setWrongAt] = useState(null);  // index of first wrong choice
  const [finished, setFinished] = useState(false);

  const idx = answers.length;
  const currentStep = compareSteps[idx];
  const visited = compareSteps.slice(0, idx).map((s) => s.nodeValue);
  const activeNode = wrongAt !== null ? compareSteps[wrongAt].nodeValue
    : currentStep ? currentStep.nodeValue : null;

  function choose(direction) {
    if (finished || wrongAt !== null) return;
    const expected = currentStep.direction;
    const nextAnswers = [...answers, direction];
    setAnswers(nextAnswers);

    if (direction !== expected) {
      setWrongAt(idx);
      setFinished(true);
      onGraded?.(false, nextAnswers.length);
      return;
    }
    if (nextAnswers.length === compareSteps.length) {
      setFinished(true);
      onGraded?.(true, nextAnswers.length);
    }
  }

  const success = finished && wrongAt === null;

  return (
    <section style={card}>
      <h3 style={{ marginTop: 0, color: '#e6edf3' }}>Desafio — Onde inserir {target}?</h3>
      <p style={{ color: '#8b949e', marginTop: 0 }}>
        A cada comparação, decida se o valor <strong>{target}</strong> deve ir para a esquerda ou para a direita.
        Passos dados: <strong>{answers.length}</strong>
      </p>

      <TreeSVG
        root={root}
        highlightedNodes={activeNode !== null ? [activeNode] : []}
        visitedNodes={visited}
        violatingNodes={wrongAt !== null ? [compareSteps[wrongAt].nodeValue] : []}
      />

      {!finished && currentStep && (
        <div style={{ textAlign: 'center', marginTop: '16px' }}>
          <p style={{ color: '#e6edf3', fontSize: '16px' }}>
            Comparando com o nó <strong style={{ color: '#f4a261' }}>{currentStep.nodeValue}</strong>:
            {' '}{target} vai para...?
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button onClick={() => choose('left')}  style={{ ...btn, background: '#0f3460' }}>← Esquerda</button>
            <button onClick={() => choose('right')} style={{ ...btn, background: '#0f3460' }}>Direita →</button>
          </div>
        </div>
      )}

      {finished && (
        <FeedbackBanner
          type={success ? 'correct' : 'incorrect'}
          message={
            success
              ? `Perfeito! Você percorreu o caminho correto em ${answers.length} passo(s) e encontrou a posição de ${target}.`
              : `Ops! No nó ${compareSteps[wrongAt].nodeValue}, como ${target} ${target < compareSteps[wrongAt].nodeValue ? '<' : '>'} ${compareSteps[wrongAt].nodeValue}, o caminho correto era para a ${compareSteps[wrongAt].direction === 'left' ? 'esquerda' : 'direita'}.`
          }
        />
      )}
    </section>
  );
}

const card = { background: '#161b22', border: '1px solid #30363d', borderRadius: '10px', padding: '20px', marginBottom: '24px' };
const btn  = { padding: '12px 24px', borderRadius: '6px', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '15px', fontWeight: 'bold' };
