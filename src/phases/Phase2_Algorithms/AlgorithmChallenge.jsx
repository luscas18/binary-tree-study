import { useMemo, useState } from 'react';
import TreeSVG from '../../components/TreeSVG';
import { insertSteps } from '../../utils/bst';
import FeedbackBanner from '../../components/shared/FeedbackBanner';

export default function AlgorithmChallenge({ root, target, onGraded }) {
  const compareSteps = useMemo(
    () => insertSteps(root, target).filter((s) => s.action === 'compare'),
    [root, target]
  );

  const [answers, setAnswers] = useState([]);
  const [wrongAt, setWrongAt] = useState(null);
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
      <h3 style={{ marginTop: 0, marginBottom: '4px' }}>Desafio — Onde inserir {target}?</h3>
      <p style={{ color: '#6B7280', marginTop: 0, marginBottom: '12px', fontSize: '14px' }}>
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
          <p style={{ color: '#374151', fontSize: '14px', marginBottom: '12px' }}>
            Comparando com o nó <strong style={{ color: '#2D60FF' }}>{currentStep.nodeValue}</strong>:
            {' '}{target} vai para...?
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button onClick={() => choose('left')}  style={btn}>← Esquerda</button>
            <button onClick={() => choose('right')} style={btn}>Direita →</button>
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

const card = { background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '24px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' };
const btn  = { padding: '10px 24px', borderRadius: '8px', border: 'none', background: '#2D60FF', color: '#FFFFFF', cursor: 'pointer', fontSize: '14px', fontWeight: 600 };
