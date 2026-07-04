import { useState, useRef } from 'react';
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
  // answers[i] = graded result object or null (not yet answered)
  const [answers, setAnswers] = useState(Array(QUIZ.length).fill(null));
  const reportedRef = useRef(false);

  const result = answers[idx];
  const score = answers.filter((a) => a?.correct).length;
  const finished = idx >= QUIZ.length;

  function answer(choice) {
    if (answers[idx]) return;
    const graded = gradeValidity(QUIZ[idx], choice);
    const next = [...answers];
    next[idx] = graded;
    setAnswers(next);
    if (next.every(Boolean) && !reportedRef.current) {
      reportedRef.current = true;
      onComplete?.(next.filter((a) => a.correct).length, QUIZ.length);
    }
  }

  function goNext() { setIdx((i) => i + 1); }
  function goBack() { setIdx((i) => Math.max(0, i - 1)); }

  if (finished) {
    return (
      <section style={card}>
        <h3 style={{ marginTop: 0, marginBottom: '8px' }}>Validar a propriedade da ABB</h3>
        <p style={{ color: '#10B981', fontWeight: 600, fontSize: '14px', marginBottom: '12px' }}>
          Quiz concluído — {score}/{QUIZ.length} acertos.
        </p>
        <button onClick={goBack} style={backBtn}>← Rever respostas</button>
      </section>
    );
  }

  return (
    <section style={card}>
      <h3 style={{ marginTop: 0, marginBottom: '8px' }}>Validar a propriedade da ABB</h3>
      <p style={{ color: '#6B7280', fontSize: '14px', marginBottom: '12px' }}>
        <strong style={{ color: '#2D60FF' }}>Árvore {idx + 1}/{QUIZ.length}:</strong> esta árvore é uma ABB válida?
      </p>

      <TreeSVG root={QUIZ[idx]} violatingNodes={result?.violatingNodes ?? []} />

      {!result ? (
        <div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '16px' }}>
            <button onClick={() => answer('valid')}   style={{ ...btn, background: '#10B981' }}>Válida</button>
            <button onClick={() => answer('invalid')} style={{ ...btn, background: '#EF4444' }}>Inválida</button>
          </div>
          {idx > 0 && (
            <div style={{ marginTop: '12px' }}>
              <button onClick={goBack} style={backBtn}>← Voltar</button>
            </div>
          )}
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
          <div style={{ display: 'flex', justifyContent: idx > 0 ? 'space-between' : 'flex-end', alignItems: 'center' }}>
            {idx > 0 && <button onClick={goBack} style={backBtn}>← Voltar</button>}
            <button onClick={goNext} style={{ ...btn, background: '#2D60FF' }}>
              {idx + 1 < QUIZ.length ? 'Próxima →' : 'Concluir →'}
            </button>
          </div>
        </>
      )}
    </section>
  );
}

const card    = { background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '24px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' };
const btn     = { padding: '10px 24px', borderRadius: '8px', border: 'none', color: '#FFFFFF', cursor: 'pointer', fontSize: '14px', fontWeight: 600 };
const backBtn = { padding: '10px 24px', borderRadius: '8px', border: '1px solid #E5E7EB', background: '#FFFFFF', color: '#6B7280', cursor: 'pointer', fontSize: '14px', fontWeight: 600 };
