import { useApp } from '../context/appContextValue';

const STEPS = [
  { id: 1, label: 'Introdução' },
  { id: 2, label: 'Algoritmos' },
  { id: 3, label: 'Percursos' },
  { id: 'select', label: 'Escolha' },
  { id: '4/5', label: 'Fase 4' },
  { id: '5/4', label: 'Fase 5' },
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
    } else if (step.id === '4/5') {
      const phase = flow[4];
      active = typeof currentStep === 'number' && currentStep === phase;
      done = phase !== undefined && flowIndex > 4;
      return { ...step, label: phase ? `Fase ${phase}` : 'Fase ?', active, done };
    } else if (step.id === '5/4') {
      const phase = flow[5];
      active = typeof currentStep === 'number' && currentStep === phase;
      done = phase !== undefined && flowIndex > 5;
      return { ...step, label: phase ? `Fase ${phase}` : 'Fase ?', active, done };
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
                {step.done ? '✓' : ''} {step.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}

const nav = {
  background: '#FFFFFF',
  borderBottom: '1px solid #E5E7EB',
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
  color: '#2D60FF',
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
  background: done ? '#2D60FF' : '#E5E7EB',
  flexShrink: 0,
});

const pill = (active, done) => ({
  padding: '4px 12px',
  borderRadius: '20px',
  fontSize: '12px',
  fontWeight: active ? 600 : 500,
  whiteSpace: 'nowrap',
  background: active ? '#2D60FF' : done ? '#EBF0FF' : '#F3F4F6',
  color: active ? '#FFFFFF' : done ? '#2D60FF' : '#6B7280',
  transition: 'all 0.2s',
});
