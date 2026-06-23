import { useState } from 'react';
import { gradeCaseStudy } from '../../utils/bst';
import FeedbackBanner from '../../components/shared/FeedbackBanner';

const SCENARIOS = [
  {
    id: 'library',
    title: 'Catálogo de biblioteca',
    text: 'Uma biblioteca mantém milhares de livros identificados por um código numérico. As consultas são frequentes (buscar um livro pelo código) e as inserções/remoções são raras e variadas.',
    correct: 'adequate',
    rationale: 'A ABB é adequada: as buscas são frequentes e os códigos chegam variados, mantendo a árvore razoavelmente balanceada com busca O(log n).',
  },
  {
    id: 'hospital',
    title: 'Fila de senhas por ordem de chegada',
    text: 'Um posto de saúde gera senhas sequenciais (1, 2, 3, ...) e atende sempre a próxima senha em ordem crescente, removendo-a no início.',
    correct: 'inadequate',
    rationale: 'A ABB é inadequada: inserir senhas já ordenadas degenera a árvore numa lista (O(n)). Uma fila simples resolve o problema em O(1).',
  },
];

export default function CaseStudy({ onComplete }) {
  const [idx, setIdx] = useState(0);
  const [choice, setChoice] = useState(null);
  const [result, setResult] = useState(null);
  const [score, setScore] = useState(0);

  const scenario = SCENARIOS[idx];
  const finished = idx >= SCENARIOS.length;

  function submit() {
    if (!choice || result) return;
    const graded = gradeCaseStudy(scenario.correct, choice);
    setResult(graded);
    if (graded.correct) setScore((s) => s + 1);
  }

  function next() {
    setResult(null);
    setChoice(null);
    if (idx + 1 >= SCENARIOS.length) onComplete?.(score, SCENARIOS.length);
    setIdx((i) => i + 1);
  }

  if (finished) {
    return (
      <section style={card}>
        <h3 style={{ marginTop: 0, color: '#e6edf3' }}>Estudo de caso</h3>
        <p style={{ color: '#52b788', fontWeight: 'bold' }}>✓ Concluído — {score}/{SCENARIOS.length} análises completas.</p>
      </section>
    );
  }

  return (
    <section style={card}>
      <h3 style={{ marginTop: 0, color: '#e6edf3' }}>Estudo de caso {idx + 1}/{SCENARIOS.length} — {scenario.title}</h3>
      <p style={{ color: '#c9d1d9', background: '#0d1117', padding: '12px', borderRadius: '6px', borderLeft: '3px solid #457b9d' }}>
        {scenario.text}
      </p>
      <p style={{ color: '#e6edf3' }}>A ABB é a estrutura adequada para este cenário?</p>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
        {['adequate', 'inadequate'].map((opt) => (
          <button
            key={opt}
            onClick={() => !result && setChoice(opt)}
            disabled={!!result}
            style={{
              ...btn,
              background: choice === opt ? (opt === 'adequate' ? '#2d6a4f' : '#6b2737') : '#21262d',
              outline: choice === opt ? '2px solid #fff' : 'none',
            }}
          >
            {opt === 'adequate' ? '✓ Adequada' : '✗ Inadequada'}
          </button>
        ))}
      </div>

      {!result ? (
        <button onClick={submit} disabled={!choice} style={{ ...btn, background: '#e94560', marginTop: '12px', opacity: !choice ? 0.5 : 1 }}>
          Enviar análise
        </button>
      ) : (
        <>
          <FeedbackBanner
            type={result.correct ? 'correct' : 'incorrect'}
            message={
              result.correct
                ? `Correto! ${scenario.rationale}`
                : `Escolha incorreta. ${scenario.rationale}`
            }
          />
          <button onClick={next} style={{ ...btn, background: '#0f3460' }}>Próximo →</button>
        </>
      )}
    </section>
  );
}

const card     = { background: '#161b22', border: '1px solid #30363d', borderRadius: '10px', padding: '20px', marginBottom: '24px' };
const btn      = { padding: '12px 20px', borderRadius: '6px', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold' };
