// Implemented in Etapa 3
import { useApp } from '../context/appContextValue';

const PHASES = [
  { id: 1, label: 'Introdução' },
  { id: 2, label: 'Algoritmos' },
  { id: 3, label: 'Percursos' },
  { id: 4, label: 'Complexidade' },
  { id: 5, label: 'Integração' },
];

export default function Navigation() {
  const { currentPhase } = useApp();

  return (
    <nav style={{ display: 'flex', gap: '8px', padding: '16px', background: '#1a1a2e' }}>
      {PHASES.map(({ id, label }) => (
        <div
          key={id}
          style={{
            padding: '6px 12px',
            borderRadius: '4px',
            background: currentPhase === id ? '#e94560' : currentPhase > id ? '#16213e' : '#0f3460',
            color: '#fff',
            fontWeight: currentPhase === id ? 'bold' : 'normal',
          }}
        >
          {id}. {label}
        </div>
      ))}
    </nav>
  );
}
