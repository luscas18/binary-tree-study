export default function PlaybackControls({ stepIdx, total, playing, speed, setSpeed, play, pause, stepForward, stepBack }) {
  const atStart  = stepIdx <= 0;
  const atEnd    = stepIdx >= total;

  return (
    <div style={row}>
      <button onClick={stepBack} disabled={atStart} style={{ ...btn, opacity: atStart ? 0.5 : 1 }} title="Voltar um passo">
        ⏮ Voltar
      </button>

      {playing ? (
        <button onClick={pause} style={{ ...btn, background: '#F59E0B', color: '#FFFFFF' }} title="Pausar">
          ⏸ Pausar
        </button>
      ) : (
        <button onClick={play} disabled={atEnd} style={{ ...btn, background: '#2D60FF', color: '#FFFFFF', opacity: atEnd ? 0.5 : 1 }} title="Reproduzir automaticamente">
          ▶ Play
        </button>
      )}

      <button onClick={stepForward} disabled={atEnd} style={{ ...btn, opacity: atEnd ? 0.5 : 1 }} title="Avançar um passo">
        Avançar ⏭
      </button>

      <span style={{ color: '#9CA3AF', fontSize: '12px', margin: '0 4px' }}>
        {Math.min(stepIdx, total)}/{total}
      </span>

      <select value={speed} onChange={(e) => setSpeed(e.target.value)} style={select} title="Velocidade">
        <option value="slow">Velocidade: Lenta</option>
        <option value="normal">Velocidade: Normal</option>
        <option value="fast">Velocidade: Rápida</option>
      </select>
    </div>
  );
}

const row    = { display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center', marginTop: '12px' };
const btn    = { padding: '8px 14px', borderRadius: '8px', border: '1px solid #E5E7EB', background: '#F3F4F6', color: '#374151', cursor: 'pointer', fontSize: '13px', fontWeight: 600 };
const select = { padding: '8px 10px', borderRadius: '8px', border: '1px solid #E5E7EB', background: '#FAFBFC', color: '#374151', fontSize: '13px' };
