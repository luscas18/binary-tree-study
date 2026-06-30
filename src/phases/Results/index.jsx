
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
  if (pct >= 90) return { label: 'Especialista', color: '#10B981' };
  if (pct >= 75) return { label: 'Avançado',    color: '#22D3EE' };
  if (pct >= 50) return { label: 'Intermediário', color: '#F59E0B' };
  return { label: 'Iniciante', color: '#EF4444' };
}

export default function Results() {
  const { score, phaseResults, restart } = useApp();
  const pct = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;
  const level = classify(pct);

  const weakPhases = Object.entries(phaseResults)
    .filter(([, r]) => r.total > 0 && r.correct / r.total < 1)
    .map(([phase]) => Number(phase));

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>Resultados Finais</h2>

      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', margin: '24px 0' }}>
        <ScoreChart percentage={pct} color={level.color} />
        <div>
          <p style={{ color: '#6B7280', margin: 0, fontSize: '14px' }}>Classificação</p>
          <p style={{ color: level.color, fontSize: '28px', fontWeight: 'bold', margin: '4px 0' }}>{level.label}</p>
          <p style={{ color: '#374151', margin: 0, fontSize: '14px' }}>{score.correct} de {score.total} atividades corretas</p>
        </div>
      </div>

      <section style={card}>
        <h3 style={{ marginTop: 0, marginBottom: '12px' }}>Estatísticas por fase</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', color: '#6B7280', fontSize: '13px' }}>
              <th style={th}>Fase</th><th style={th}>Acertos</th><th style={th}>Desempenho</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5].map((p) => {
              const r = phaseResults[p];
              const ratio = r && r.total > 0 ? r.correct / r.total : null;
              return (
                <tr key={p} style={{ borderTop: '1px solid #F3F4F6' }}>
                  <td style={td}>{p}. {PHASE_NAMES[p]}</td>
                  <td style={td}>{r ? `${r.correct}/${r.total}` : '—'}</td>
                  <td style={td}>
                    {ratio === null ? '—' : (
                      <div style={{ background: '#F3F4F6', borderRadius: '4px', overflow: 'hidden', height: '8px', width: '120px' }}>
                        <div style={{ width: `${ratio * 100}%`, height: '100%', borderRadius: '4px', background: ratio === 1 ? '#10B981' : ratio >= 0.5 ? '#F59E0B' : '#EF4444' }} />
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      {weakPhases.length > 0 && (
        <section style={card}>
          <h3 style={{ marginTop: 0, marginBottom: '12px' }}>Dicas de revisão</h3>
          <ul style={{ color: '#374151', lineHeight: 1.7, paddingLeft: '20px', fontSize: '14px' }}>
            {weakPhases.map((p) => (
              <li key={p}><strong style={{ color: '#F59E0B' }}>{PHASE_NAMES[p]}:</strong> {TIPS[p]}</li>
            ))}
          </ul>
        </section>
      )}

      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <button onClick={restart} style={{ ...btn, background: '#2D60FF', padding: '14px 32px', fontSize: '15px' }}>
          Praticar Novamente
        </button>
      </div>
    </div>
  );
}

const card     = { background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '24px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' };
const th       = { padding: '8px', fontWeight: 500 };
const td       = { padding: '10px 8px', fontSize: '14px', color: '#374151' };
const btn      = { padding: '10px 20px', borderRadius: '8px', border: 'none', color: '#FFFFFF', cursor: 'pointer', fontSize: '14px', fontWeight: 600 };
