import { useState } from 'react';
import BSTSimulator from '../Phase2_Algorithms/BSTSimulator';
import FeedbackBanner from '../../components/shared/FeedbackBanner';

export default function FreeExploration({ onComplete }) {
  const [root, setRoot] = useState(null);
  const [actionCount, setActionCount] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const canSubmit = actionCount >= 3;

  function submit() {
    if (!canSubmit) return;
    setSubmitted(true);
    onComplete?.();
  }

  return (
    <section style={card}>
      <h3 style={{ marginTop: 0, color: '#e6edf3' }}>Exploração livre</h3>
      <p style={{ color: '#8b949e', marginTop: 0 }}>
        Modo livre: experimente suas próprias sequências de inserção, busca e remoção. Depois registre o que observou.
      </p>

      <BSTSimulator root={root} setRoot={setRoot} onAnyAction={() => setActionCount((c) => c + 1)} />

      <div style={{ marginTop: '8px', color: '#8b949e', fontSize: '13px' }}>
        Operações realizadas: {actionCount} (mín. 3)
      </div>

      {!submitted ? (
        <button onClick={submit} disabled={!canSubmit} style={{ ...btn, marginTop: '12px', opacity: canSubmit ? 1 : 0.5 }}>
          Registrar exploração
        </button>
      ) : (
        <FeedbackBanner type="correct" message="Exploração registrada! Sua autonomia experimental foi concluída." />
      )}
    </section>
  );
}

const card     = { background: '#161b22', border: '1px solid #30363d', borderRadius: '10px', padding: '20px', marginBottom: '24px' };
const btn      = { padding: '12px 20px', borderRadius: '6px', border: 'none', background: '#2d6a4f', color: '#fff', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold' };
