// Resultados Finais — Avaliação e desempenho (RA12)
import { useState } from 'react';
import { useApp } from '../../context/appContextValue';
import ScoreChart from './ScoreChart';

const PHASE_NAMES = {
  1: 'Introdução',
  2: 'Algoritmos',
  3: 'Percursos',
  4: 'Complexidade',
  5: 'Integração',
};

const TIPS = {
  1: 'Revise a propriedade esquerda < raiz < direita e a diferença entre raiz, nó interno e folha.',
  2: 'Pratique o caminho de inserção/busca: a cada nó, compare o valor e desça para o lado correto.',
  3: 'Memorize a ordem de visita: em ordem (E→raiz→D), pré-ordem (raiz→E→D), pós-ordem (E→D→raiz).',
  4: 'Lembre que inserir dados ordenados degenera a árvore (O(n)); o balanceamento garante O(log n).',
  5: 'Avalie o tipo de operação e a ordem dos dados antes de escolher a ABB para um problema real.',
};

function classify(pct) {
  if (pct >= 90) return { label: 'Especialista', color: '#52b788' };
  if (pct >= 75) return { label: 'Avançado',    color: '#76c893' };
  if (pct >= 50) return { label: 'Intermediário', color: '#f4a261' };
  return { label: 'Iniciante', color: '#e94560' };
}

export default function Results() {
  const { score, phaseResults, restart } = useApp();
  const [argument, setArgument] = useState('');
  const [argSubmitted, setArgSubmitted] = useState(false);

  const pct = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;
  const level = classify(pct);

  const weakPhases = Object.entries(phaseResults)
    .filter(([, r]) => r.total > 0 && r.correct / r.total < 1)
    .map(([phase]) => Number(phase));

  return (
    <div>
      <h2 style={{ color: '#e6edf3', textAlign: 'center' }}>Resultados Finais</h2>

      {/* Pontuação + Classificação */}
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', margin: '24px 0' }}>
        <ScoreChart percentage={pct} color={level.color} />
        <div>
          <p style={{ color: '#8b949e', margin: 0 }}>Classificação</p>
          <p style={{ color: level.color, fontSize: '28px', fontWeight: 'bold', margin: '4px 0' }}>{level.label}</p>
          <p style={{ color: '#e6edf3', margin: 0 }}>{score.correct} de {score.total} atividades corretas</p>
        </div>
      </div>

      {/* Estatísticas por fase */}
      <section style={card}>
        <h3 style={{ marginTop: 0, color: '#e6edf3' }}>Estatísticas por fase</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', color: '#c9d1d9' }}>
          <thead>
            <tr style={{ textAlign: 'left', color: '#8b949e' }}>
              <th style={th}>Fase</th><th style={th}>Acertos</th><th style={th}>Desempenho</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5].map((p) => {
              const r = phaseResults[p];
              const ratio = r && r.total > 0 ? r.correct / r.total : null;
              return (
                <tr key={p} style={{ borderTop: '1px solid #30363d' }}>
                  <td style={td}>{p}. {PHASE_NAMES[p]}</td>
                  <td style={td}>{r ? `${r.correct}/${r.total}` : '—'}</td>
                  <td style={td}>
                    {ratio === null ? '—' : (
                      <div style={{ background: '#0d1117', borderRadius: '4px', overflow: 'hidden', height: '10px', width: '120px' }}>
                        <div style={{ width: `${ratio * 100}%`, height: '100%', background: ratio === 1 ? '#52b788' : ratio >= 0.5 ? '#f4a261' : '#e94560' }} />
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      {/* Dicas */}
      {weakPhases.length > 0 && (
        <section style={card}>
          <h3 style={{ marginTop: 0, color: '#e6edf3' }}>Dicas de revisão</h3>
          <ul style={{ color: '#c9d1d9', lineHeight: 1.7, paddingLeft: '20px' }}>
            {weakPhases.map((p) => (
              <li key={p}><strong style={{ color: '#f4a261' }}>{PHASE_NAMES[p]}:</strong> {TIPS[p]}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Argumentação RA12 */}
      <section style={card}>
        <h3 style={{ marginTop: 0, color: '#e6edf3' }}>Argumentação técnica (RA12)</h3>
        <p style={{ color: '#8b949e', marginTop: 0 }}>
          Em poucas linhas, justifique quando você usaria uma Árvore Binária de Busca em vez de uma lista ou de uma tabela hash.
        </p>
        <textarea
          value={argument}
          onChange={(e) => setArgument(e.target.value)}
          disabled={argSubmitted}
          placeholder="Escreva sua argumentação..."
          style={textarea}
        />
        {!argSubmitted ? (
          <button
            onClick={() => setArgSubmitted(true)}
            disabled={argument.trim().length < 20}
            style={{ ...btn, background: '#0f3460', marginTop: '12px', opacity: argument.trim().length < 20 ? 0.5 : 1 }}
          >
            Registrar argumentação
          </button>
        ) : (
          <p style={{ color: '#52b788', fontWeight: 'bold' }}>✓ Argumentação registrada.</p>
        )}
      </section>

      {/* Reiniciar */}
      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <button onClick={restart} style={{ ...btn, background: '#e94560', padding: '14px 32px', fontSize: '16px' }}>
          ↻ Praticar Novamente
        </button>
      </div>
    </div>
  );
}

const card     = { background: '#161b22', border: '1px solid #30363d', borderRadius: '10px', padding: '20px', marginBottom: '24px' };
const th       = { padding: '8px', fontWeight: 'normal' };
const td       = { padding: '10px 8px' };
const btn      = { padding: '12px 20px', borderRadius: '6px', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold' };
const textarea = { width: '100%', minHeight: '80px', padding: '10px', borderRadius: '6px', border: '1px solid #30363d', background: '#0d1117', color: '#e6edf3', fontSize: '14px', fontFamily: 'inherit', resize: 'vertical', boxSizing: 'border-box' };
