import { t } from '../../data/translations';

export default function PhaseStepper({ activeStep, steps = [] }) {
  return (
    <div style={container}>
      {steps.map((stepLabel, index) => {
        const isActive = index === activeStep;
        const isDone = index < activeStep;
        return (
          <div key={index} style={{ display: 'flex', alignItems: 'center', flex: index > 0 ? 1 : 0 }}>
            {index > 0 && <div style={connector(isDone || isActive)} />}
            <div style={stepItem}>
              <div style={badge(isActive, isDone)}>
                {isDone ? '✓' : index + 1}
              </div>
              <span style={label(isActive)}>{stepLabel}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

const container = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '8px',
  marginBottom: '24px',
  width: '100%',
  padding: '8px 0',
  overflowX: 'auto',
};

const stepItem = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
};

const connector = (highlighted) => ({
  flex: 1,
  height: '2px',
  background: highlighted ? 'var(--primary)' : 'var(--border)',
  margin: '0 8px',
  minWidth: '16px',
  transition: 'background 0.2s ease',
});

const badge = (active, done) => ({
  width: '22px',
  height: '22px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '11px',
  fontWeight: 600,
  background: active ? 'var(--primary)' : done ? 'var(--primary-light)' : 'var(--bg)',
  color: active ? '#FFFFFF' : done ? 'var(--primary)' : 'var(--text-secondary)',
  transition: 'all 0.2s ease',
});

const label = (active) => ({
  fontSize: '12px',
  fontWeight: active ? 600 : 500,
  color: active ? 'var(--text)' : 'var(--text-secondary)',
  whiteSpace: 'nowrap',
  transition: 'color 0.2s ease',
});
