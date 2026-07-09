import { useApp } from '../../context/appContextValue';

export default function PhaseFooter({ enabled, label = 'Avançar →', onNext, onBack }) {
  const { advancePhase, goBack, flowIndex } = useApp();
  const showBack = flowIndex > 0 || !!onBack;

  const handleBack = onBack || goBack;
  const handleNext = onNext || advancePhase;

  return (
    <div style={{ display: 'flex', justifyContent: showBack ? 'space-between' : 'flex-end', marginTop: '24px' }}>
      {showBack && (
        <button onClick={handleBack} style={backBtn}>
          ← Voltar
        </button>
      )}
      <button
        onClick={handleNext}
        disabled={!enabled}
        style={{
          padding: '12px 28px',
          borderRadius: '8px',
          border: 'none',
          background: enabled ? 'var(--primary)' : 'var(--border)',
          color: enabled ? '#FFFFFF' : 'var(--text-secondary)',
          cursor: enabled ? 'pointer' : 'not-allowed',
          fontSize: '15px',
          fontWeight: 600,
          transition: 'all 0.2s',
        }}
      >
        {label}
      </button>
    </div>
  );
}

const backBtn = {
  padding: '12px 28px',
  borderRadius: '8px',
  border: '1px solid var(--border)',
  background: 'var(--card)',
  color: 'var(--text-secondary)',
  cursor: 'pointer',
  fontSize: '15px',
  fontWeight: 600,
  transition: 'all 0.2s',
};

