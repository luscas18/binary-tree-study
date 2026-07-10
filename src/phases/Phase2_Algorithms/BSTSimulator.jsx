import { useRef, useState } from 'react';
import TreeSVG from '../../components/TreeSVG';
import PlaybackControls from '../../components/shared/PlaybackControls';
import { usePlayback } from '../../hooks/usePlayback';
import { insert, remove, insertSteps, searchSteps, removeSteps } from '../../utils/bst';

export default function BSTSimulator({ root, setRoot, onAnyAction }) {
  const [value, setValue]   = useState('');
  const [steps, setSteps]   = useState([]);
  const [foundNode, setFoundNode] = useState(null);
  const pending = useRef(null);

  function handleComplete() {
    const last = steps[steps.length - 1];
    if (last?.action === 'found') setFoundNode(last.nodeValue);
    if (pending.current !== null) { setRoot(pending.current); pending.current = null; }
  }

  const { stepIdx, playing, speed, setSpeed, play, pause, stepForward, stepBack, reset } =
    usePlayback(steps.length, handleComplete);

  const activeNode = stepIdx > 0 ? steps[stepIdx - 1]?.nodeValue : null;
  const pathNodes  = steps.slice(0, stepIdx).map((s) => s.nodeValue).filter((v) => v !== null);

  function run(operation) {
    const v = parseInt(value, 10);
    if (Number.isNaN(v)) return;
    setFoundNode(null);

    let generatedSteps;
    if (operation === 'insert') {
      generatedSteps = insertSteps(root, v);
      pending.current = insert(root, v);
    } else if (operation === 'search') {
      generatedSteps = searchSteps(root, v);
      pending.current = null;
    } else {
      generatedSteps = removeSteps(root, v);
      pending.current = remove(root, v);
    }

    reset();
    setSteps(generatedSteps);
    play();
    onAnyAction?.();
    setValue('');
  }

  const visibleLog = steps.slice(0, stepIdx);

  return (
    <section style={card}>
      <h3 style={{ marginTop: 0, marginBottom: '4px' }}>Simulador — Operações passo a passo</h3>
      <p style={{ color: '#6B7280', marginTop: 0, marginBottom: '16px', fontSize: '14px' }}>
        Digite um valor e execute uma operação. Use os controles para avançar, voltar ou reproduzir automaticamente.
      </p>

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="valor"
          disabled={playing}
          style={input}
          onKeyDown={(e) => e.key === 'Enter' && run('insert')}
        />
        <button onClick={() => run('insert')} disabled={playing} style={{ ...btn, background: '#2D60FF' }}>Inserir</button>
        <button onClick={() => run('search')} disabled={playing} style={{ ...btn, background: '#6366F1' }}>Buscar</button>
        <button onClick={() => run('remove')} disabled={playing} style={{ ...btn, background: '#EF4444' }}>Remover</button>
      </div>

      <TreeSVG
        root={root}
        highlightedNodes={activeNode !== null ? [activeNode] : []}
        visitedNodes={pathNodes}
        foundNode={foundNode}
      />

      {steps.length > 0 && (
        <PlaybackControls
          stepIdx={stepIdx}
          total={steps.length}
          playing={playing}
          speed={speed}
          setSpeed={setSpeed}
          play={play}
          pause={pause}
          stepForward={stepForward}
          stepBack={stepBack}
        />
      )}

      {steps.length > 0 && (
        <div style={logBox}>
          {visibleLog.map((s, i) => (
            <div key={i} style={{ color: '#374151', fontFamily: 'var(--mono, monospace)', fontSize: '13px', padding: '2px 0' }}>
              › {s.message}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

const card   = { background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '24px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' };
const btn    = { padding: '10px 16px', borderRadius: '8px', border: 'none', color: '#FFFFFF', cursor: 'pointer', fontSize: '14px', fontWeight: 600 };
const input  = { padding: '10px 12px', borderRadius: '8px', border: '1px solid #E5E7EB', background: '#FAFBFC', color: '#1A1D29', width: '90px', fontSize: '14px' };
const logBox = { marginTop: '16px', background: '#F8FAFC', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '12px', maxHeight: '160px', overflowY: 'auto' };
