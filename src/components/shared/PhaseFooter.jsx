import { useApp } from '../../context/appContextValue';

export default function PhaseFooter({ enabled, label = 'Avançar →' }) {
  const { advancePhase, goBack, flowIndex } = useApp();
  const canGoBack = flowIndex > 0;

  return (
    <div style={{ display: 'flex', justifyContent: canGoBack ? 'space-between' : 'flex-end', marginTop: '24px' }}>
      {canGoBack && (
        <button onClick={goBack} style={backBtn}>
          ← Voltar
        </button>
      )}
      <button
        onClick={advancePhase}
        disabled={!enabled}
        style={{
          padding: '12px 28px',
          borderRadius: '8px',
          border: 'none',
          background: enabled ? '#2D60FF' : '#E5E7EB',
          color: enabled ? '#FFFFFF' : '#9CA3AF',
          cursor: enabled ? 'pointer' : 'not-allowed',
          fontSize: '15px',
          fontWeight: 600,
          transition: 'all 0.2s',
          boxShadow: enabled ? '0 2px 8px rgba(45,96,255,0.25)' : 'none',
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
  border: '1px solid #E5E7EB',
  background: '#FFFFFF',
  color: '#6B7280',
  cursor: 'pointer',
  fontSize: '15px',
  fontWeight: 600,
  transition: 'all 0.2s',
};
