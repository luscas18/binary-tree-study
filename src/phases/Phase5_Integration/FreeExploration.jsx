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
      <h3 style={{ marginTop: 0, marginBottom: '4px' }}>Exploração livre</h3>
      <p style={{ color: '#6B7280', marginTop: 0, marginBottom: '16px', fontSize: '14px' }}>
        Modo livre: experimente suas próprias sequências de inserção, busca e remoção.
      </p>

      <BSTSimulator root={root} setRoot={setRoot} onAnyAction={() => setActionCount((c) => c + 1)} />

      <div style={{ marginTop: '8px', color: '#6B7280', fontSize: '13px' }}>
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

const card = { background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '24px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' };
const btn  = { padding: '10px 20px', borderRadius: '8px', border: 'none', background: '#10B981', color: '#FFFFFF', cursor: 'pointer', fontSize: '14px', fontWeight: 600 };
