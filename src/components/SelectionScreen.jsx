import { useApp } from '../context/appContextValue';
import { t } from '../data/translations';

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
      <h2 style={{ fontSize: '24px', marginBottom: '8px', color: 'var(--text)' }}>{t('choosePhase')}</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', fontSize: '15px' }}>
        {t('chooseDesc')}
        <br />{t('chooseDescSub')}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', maxWidth: '600px', margin: '0 auto' }}>
        {OPTIONS.map((opt) => (
          <button 
            key={opt.phase} 
            onClick={() => selectPhase(opt.phase)} 
            style={card}
            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--primary-light)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'var(--card)'}
          >
            <span style={{ fontSize: '32px', display: 'block', marginBottom: '12px' }}>{opt.icon}</span>
            <h3 style={{ fontSize: '18px', marginBottom: '8px', color: 'var(--text)' }}>
              Fase {opt.phase} — {opt.title}
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.5 }}>
              {opt.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}

const card = {
  background: 'var(--card)',
  borderRadius: '16px',
  padding: '28px 20px',
  cursor: 'pointer',
  textAlign: 'center',
  transition: 'all 0.2s',
  fontFamily: 'inherit',
  border: 'none',
  boxShadow: 'none',
};
