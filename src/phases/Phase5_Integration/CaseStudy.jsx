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
        <h3 style={{ marginTop: 0, marginBottom: '8px' }}>Estudo de caso</h3>
        <p style={{ color: '#10B981', fontWeight: 600, fontSize: '14px' }}>
          Concluído — {score}/{SCENARIOS.length} análises corretas.
        </p>
      </section>
    );
  }

  return (
    <section style={card}>
      <h3 style={{ marginTop: 0, marginBottom: '8px' }}>Estudo de caso {idx + 1}/{SCENARIOS.length} — {scenario.title}</h3>
      <p style={scenarioBox}>{scenario.text}</p>
      <p style={{ color: '#374151', fontSize: '14px', margin: '12px 0' }}>A ABB é a estrutura adequada para este cenário?</p>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
        {['adequate', 'inadequate'].map((opt) => (
          <button
            key={opt}
            onClick={() => !result && setChoice(opt)}
            disabled={!!result}
            style={{
              ...btn,
              background: choice === opt ? (opt === 'adequate' ? '#10B981' : '#EF4444') : '#F3F4F6',
              color: choice === opt ? '#FFFFFF' : '#374151',
              border: choice === opt ? 'none' : '1px solid #E5E7EB',
            }}
          >
            {opt === 'adequate' ? 'Adequada' : 'Inadequada'}
          </button>
        ))}
      </div>

      {!result ? (
        <button onClick={submit} disabled={!choice} style={{ ...btn, background: '#2D60FF', color: '#FFFFFF', marginTop: '8px', opacity: !choice ? 0.5 : 1 }}>
          Enviar análise
        </button>
      ) : (
        <>
          <FeedbackBanner
            type={result.correct ? 'correct' : 'incorrect'}
            message={result.correct ? `Correto! ${scenario.rationale}` : `Escolha incorreta. ${scenario.rationale}`}
          />
          <button onClick={next} style={{ ...btn, background: '#2D60FF', color: '#FFFFFF' }}>Próximo →</button>
        </>
      )}
    </section>
  );
}

const card = { background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '24px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' };
const btn  = { padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: 600 };
const scenarioBox = { color: '#374151', background: '#F8FAFC', padding: '12px 16px', borderRadius: '8px', borderLeft: '3px solid #2D60FF', fontSize: '14px', lineHeight: 1.6 };
