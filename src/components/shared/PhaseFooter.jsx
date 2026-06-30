import { useApp } from '../../context/appContextValue';

export default function PhaseFooter({ enabled, label = 'Avançar →' }) {
  const { advancePhase } = useApp();

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
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
