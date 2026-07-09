import { useApp } from '../context/appContextValue';

const STEPS = [
  { id: 1, label: 'Introdução' },
  { id: 2, label: 'Algoritmos' },
  { id: 3, label: 'Percursos' },
  { id: 'select', label: 'Escolha' },
  { id: 'advanced', label: 'Fase Avançada' },
];

export default function Navigation() {
  const { currentStep, flowIndex, flow } = useApp();

  const displaySteps = STEPS.map((step) => {
    let active = false;
    let done = false;

    if (typeof step.id === 'number') {
      const stepFlowIdx = flow.indexOf(step.id);
      active = currentStep === step.id;
      done = stepFlowIdx !== -1 && stepFlowIdx < flowIndex;
    } else if (step.id === 'select') {
      active = currentStep === 'select';
      done = flow.indexOf('select') < flowIndex;
    } else if (step.id === 'advanced') {
      const phase = flow[4];
      active = typeof currentStep === 'number' && (currentStep === 4 || currentStep === 5);
      done = flowIndex > 4;
      return { ...step, label: phase ? `Fase ${phase}` : 'Fase Avançada', active, done };
    }

    return { ...step, active, done };
  });

  return (
    <nav style={nav}>
      <div style={inner}>
        <span style={logo}>ABB Study</span>
        <div style={steps}>
          {displaySteps.map((step, i) => (
            <div key={step.id} style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
              {i > 0 && <div style={connector(step.done)} />}
              <div style={pill(step.active, step.done)}>
                {step.done ? '✓ ' : ''}{step.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}

const nav = {
  background: 'var(--card)',
  borderBottom: '1px solid var(--border)',
  padding: '0 24px',
  position: 'sticky',
  top: 0,
  zIndex: 100,
};

const inner = {
  maxWidth: '880px',
  margin: '0 auto',
  display: 'flex',
  alignItems: 'center',
  gap: '24px',
  height: '56px',
};

const logo = {
  fontWeight: 700,
  fontSize: '16px',
  color: 'var(--primary)',
  whiteSpace: 'nowrap',
  flexShrink: 0,
};

const steps = {
  display: 'flex',
  alignItems: 'center',
  gap: '0',
  overflow: 'auto',
  flex: 1,
};

const connector = (done) => ({
  width: '20px',
  height: '2px',
  background: done ? 'var(--primary)' : 'var(--border)',
  flexShrink: 0,
});

const pill = (active, done) => ({
  padding: '4px 12px',
  borderRadius: '20px',
  fontSize: '12px',
  fontWeight: active ? 600 : 500,
  whiteSpace: 'nowrap',
  background: active ? 'var(--primary)' : done ? 'var(--primary-light)' : 'var(--bg)',
  color: active ? '#FFFFFF' : done ? 'var(--primary)' : 'var(--text-secondary)',
  transition: 'all 0.2s',
});
