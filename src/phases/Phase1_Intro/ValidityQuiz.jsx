import { useState } from 'react';
import TreeSVG from '../../components/TreeSVG';
import { makeNode, gradeValidity } from '../../utils/bst';
import FeedbackBanner from '../../components/shared/FeedbackBanner';

// Build trees by hand so we can include INVALID ones (insert() would only make valid trees).
function tree(value, left, right) {
  return { ...makeNode(value), left: left ?? null, right: right ?? null };
}

const QUIZ = [
  // valid
  tree(8, tree(4, tree(2), tree(6)), tree(12, tree(10), tree(14))),
  // invalid: 9 is in the left subtree of 8 but is > 8
  tree(8, tree(4, tree(2), tree(9)), tree(12)),
  // invalid: 7 on the right of 10 but 7 < 10
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
        <h3 style={{ marginTop: 0, color: '#e6edf3' }}>Atividade — Validar a propriedade da ABB</h3>
        <p style={{ color: '#52b788', fontWeight: 'bold' }}>
          ✓ Quiz concluído — {score}/{QUIZ.length} acertos.
        </p>
      </section>
    );
  }

  return (
    <section style={card}>
      <h3 style={{ marginTop: 0, color: '#e6edf3' }}>Atividade — Validar a propriedade da ABB</h3>
      <p style={{ color: '#e6edf3' }}>
        <strong style={{ color: '#f4a261' }}>Árvore {idx + 1}/{QUIZ.length}:</strong> esta árvore é uma ABB válida?
      </p>

      <TreeSVG root={root} violatingNodes={result?.violatingNodes ?? []} />

      {!result ? (
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '16px' }}>
          <button onClick={() => answer('valid')}   style={{ ...btn, background: '#2d6a4f' }}>✓ Válida</button>
          <button onClick={() => answer('invalid')} style={{ ...btn, background: '#6b2737' }}>✗ Inválida</button>
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
            <button onClick={next} style={{ ...btn, background: '#0f3460' }}>Próxima →</button>
          </div>
        </>
      )}
    </section>
  );
}

const card = { background: '#161b22', border: '1px solid #30363d', borderRadius: '10px', padding: '20px', marginBottom: '24px' };
const btn  = { padding: '12px 24px', borderRadius: '6px', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '15px', fontWeight: 'bold' };
