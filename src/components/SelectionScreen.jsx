import { useApp } from '../context/appContextValue';

const OPTIONS = [
  {
    phase: 4,
    title: 'Complexidade',
    description: 'Analise a complexidade das operações, compare árvores balanceadas vs. degeneradas e entenda o pior caso.',
    icon: '⚡',
  },
  {
    phase: 5,
    title: 'Integração',
    description: 'Aplique seus conhecimentos em estudos de caso reais e explore a ABB livremente.',
    icon: '🔗',
  },
];

export default function SelectionScreen() {
  const { selectPhase } = useApp();

  return (
    <div style={{ textAlign: 'center', paddingTop: '40px' }}>
      <h2 style={{ fontSize: '24px', marginBottom: '8px' }}>Escolha sua próxima etapa</h2>
      <p style={{ color: '#6B7280', marginBottom: '32px', fontSize: '15px' }}>
        Você completou as fases 1, 2 e 3. Agora escolha por qual fase continuar.
        <br />Depois de completar a escolhida, você fará a outra automaticamente.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', maxWidth: '600px', margin: '0 auto' }}>
        {OPTIONS.map((opt) => (
          <button key={opt.phase} onClick={() => selectPhase(opt.phase)} style={card}>
            <span style={{ fontSize: '32px', display: 'block', marginBottom: '12px' }}>{opt.icon}</span>
            <h3 style={{ fontSize: '18px', marginBottom: '8px', color: '#1A1D29' }}>
              Fase {opt.phase} — {opt.title}
            </h3>
            <p style={{ color: '#6B7280', fontSize: '14px', lineHeight: 1.5 }}>
              {opt.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}

const card = {
  background: '#FFFFFF',
  border: '2px solid #E5E7EB',
  borderRadius: '16px',
  padding: '28px 20px',
  cursor: 'pointer',
  textAlign: 'center',
  transition: 'all 0.2s',
  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
  fontFamily: 'inherit',
};
