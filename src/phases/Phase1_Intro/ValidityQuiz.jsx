import { useState } from 'react';
import TreeSVG from '../../components/TreeSVG';
import { makeNode, gradeValidity } from '../../utils/bst';
import FeedbackBanner from '../../components/shared/FeedbackBanner';

function tree(value, left, right) {
  return { ...makeNode(value), left: left ?? null, right: right ?? null };
}

const QUIZ = [
  tree(8, tree(4, tree(2), tree(6)), tree(12, tree(10), tree(14))),
  tree(8, tree(4, tree(2), tree(9)), tree(12)),
  tree(10, tree(5), tree(15, tree(7), tree(20))),
];

export default function ValidityQuiz({ onComplete }) {
  const [idx, setIdx] = useState(0);
  const [result, setResult] = useState(null);
  const [score, setScore] = useState(0);

  const root = QUIZ[idx];
  const finished = idx >= QUIZ.length;

  function answer(choice) {
    if (result) return;
    const graded = gradeValidity(root, choice);
    setResult(graded);
    if (graded.correct) setScore((s) => s + 1);
  }

  function next() {
    setResult(null);
    if (idx + 1 >= QUIZ.length) {
      onComplete?.(score, QUIZ.length);
    }
    setIdx((i) => i + 1);
  }

  if (finished) {
    return (
      <section style={card}>
        <h3 style={{ marginTop: 0, marginBottom: '8px' }}>Validar a propriedade da ABB</h3>
        <p style={{ color: '#10B981', fontWeight: 600, fontSize: '14px' }}>
          Quiz concluído — {score}/{QUIZ.length} acertos.
        </p>
      </section>
    );
  }

  return (
    <section style={card}>
      <h3 style={{ marginTop: 0, marginBottom: '8px' }}>Validar a propriedade da ABB</h3>
      <p style={{ color: '#6B7280', fontSize: '14px', marginBottom: '12px' }}>
        <strong style={{ color: '#2D60FF' }}>Árvore {idx + 1}/{QUIZ.length}:</strong> esta árvore é uma ABB válida?
      </p>

      <TreeSVG root={root} violatingNodes={result?.violatingNodes ?? []} />

      {!result ? (
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '16px' }}>
          <button onClick={() => answer('valid')}   style={{ ...btn, background: '#10B981' }}>Válida</button>
          <button onClick={() => answer('invalid')} style={{ ...btn, background: '#EF4444' }}>Inválida</button>
        </div>
      ) : (
        <>
          <FeedbackBanner
            type={result.correct ? 'correct' : 'incorrect'}
            message={
              result.correct
                ? 'Correto!' + (result.violatingNodes.length ? ' Os nós em vermelho violam a propriedade esquerda < raiz < direita.' : '')
                : 'Resposta incorreta.' + (result.violatingNodes.length ? ' Os nós em vermelho mostram onde a propriedade é violada.' : ' Esta árvore na verdade é válida.')
            }
          />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button onClick={next} style={{ ...btn, background: '#2D60FF' }}>Próxima →</button>
          </div>
        </>
      )}
    </section>
  );
}

const card = { background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '24px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' };
const btn  = { padding: '10px 24px', borderRadius: '8px', border: 'none', color: '#FFFFFF', cursor: 'pointer', fontSize: '14px', fontWeight: 600 };
