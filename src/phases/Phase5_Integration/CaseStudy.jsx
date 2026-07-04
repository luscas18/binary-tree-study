import { useState, useRef } from 'react';
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
  // answers[i] = { choice, result } or null
  const [answers, setAnswers] = useState(Array(SCENARIOS.length).fill(null));
  const [pendingChoice, setPendingChoice] = useState(null);
  const reportedRef = useRef(false);

  const current = answers[idx];
  const score = answers.filter((a) => a?.result?.correct).length;
  const finished = idx >= SCENARIOS.length;

  function submit() {
    if (!pendingChoice || current) return;
    const scenario = SCENARIOS[idx];
    const graded = gradeCaseStudy(scenario.correct, pendingChoice);
    const next = [...answers];
    next[idx] = { choice: pendingChoice, result: graded };
    setAnswers(next);
    if (next.every(Boolean) && !reportedRef.current) {
      reportedRef.current = true;
      onComplete?.(next.filter((a) => a.result.correct).length, SCENARIOS.length);
    }
  }

  function goNext() {
    setPendingChoice(null);
    setIdx((i) => i + 1);
  }

  function goBack() {
    setPendingChoice(null);
    setIdx((i) => Math.max(0, i - 1));
  }

  // Sync pendingChoice when navigating to an already-answered question
  function handleChoiceClick(opt) {
    if (current) return;
    setPendingChoice(opt);
  }

  if (finished) {
    return (
      <section style={card}>
        <h3 style={{ marginTop: 0, marginBottom: '8px' }}>Estudo de caso</h3>
        <p style={{ color: '#10B981', fontWeight: 600, fontSize: '14px', marginBottom: '12px' }}>
          Concluído — {score}/{SCENARIOS.length} análises corretas.
        </p>
        <button onClick={goBack} style={backBtn}>← Rever respostas</button>
      </section>
    );
  }

  const scenario = SCENARIOS[idx];
  const displayChoice = current?.choice ?? pendingChoice;

  return (
    <section style={card}>
      <h3 style={{ marginTop: 0, marginBottom: '8px' }}>
        Estudo de caso {idx + 1}/{SCENARIOS.length} — {scenario.title}
      </h3>
      <p style={scenarioBox}>{scenario.text}</p>
      <p style={{ color: '#374151', fontSize: '14px', margin: '12px 0' }}>A ABB é a estrutura adequada para este cenário?</p>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
        {['adequate', 'inadequate'].map((opt) => (
          <button
            key={opt}
            onClick={() => handleChoiceClick(opt)}
            disabled={!!current}
            style={{
              ...btn,
              background: displayChoice === opt ? (opt === 'adequate' ? '#10B981' : '#EF4444') : '#F3F4F6',
              color: displayChoice === opt ? '#FFFFFF' : '#374151',
              border: displayChoice === opt ? 'none' : '1px solid #E5E7EB',
            }}
          >
            {opt === 'adequate' ? 'Adequada' : 'Inadequada'}
          </button>
        ))}
      </div>

      {!current ? (
        <div style={{ display: 'flex', justifyContent: idx > 0 ? 'space-between' : 'flex-start', alignItems: 'center' }}>
          {idx > 0 && <button onClick={goBack} style={backBtn}>← Voltar</button>}
          <button
            onClick={submit}
            disabled={!pendingChoice}
            style={{ ...btn, background: '#2D60FF', color: '#FFFFFF', opacity: !pendingChoice ? 0.5 : 1 }}
          >
            Enviar análise
          </button>
        </div>
      ) : (
        <>
          <FeedbackBanner
            type={current.result.correct ? 'correct' : 'incorrect'}
            message={current.result.correct ? `Correto! ${scenario.rationale}` : `Escolha incorreta. ${scenario.rationale}`}
          />
          <div style={{ display: 'flex', justifyContent: idx > 0 ? 'space-between' : 'flex-end', alignItems: 'center' }}>
            {idx > 0 && <button onClick={goBack} style={backBtn}>← Voltar</button>}
            <button onClick={goNext} style={{ ...btn, background: '#2D60FF', color: '#FFFFFF' }}>
              {idx + 1 < SCENARIOS.length ? 'Próximo →' : 'Concluir →'}
            </button>
          </div>
        </>
      )}
    </section>
  );
}

const card        = { background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '24px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' };
const btn         = { padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: 600 };
const backBtn     = { padding: '10px 20px', borderRadius: '8px', border: '1px solid #E5E7EB', background: '#FFFFFF', color: '#6B7280', cursor: 'pointer', fontSize: '14px', fontWeight: 600 };
const scenarioBox = { color: '#374151', background: '#F8FAFC', padding: '12px 16px', borderRadius: '8px', borderLeft: '3px solid #2D60FF', fontSize: '14px', lineHeight: 1.6 };
