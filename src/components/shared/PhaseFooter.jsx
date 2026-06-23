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
          background: enabled ? '#2d6a4f' : '#21262d',
          color: enabled ? '#fff' : '#484f58',
          cursor: enabled ? 'pointer' : 'not-allowed',
          fontSize: '15px',
          fontWeight: 'bold',
          transition: 'background 0.2s',
        }}
      >
        {label}
      </button>
    </div>
  );
}
