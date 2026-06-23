import { useEffect, useRef, useState } from 'react';
import TreeSVG from '../../components/TreeSVG';
import { insert, remove, insertSteps, searchSteps, removeSteps } from '../../utils/bst';

const STEP_MS = 650;

export default function BSTSimulator({ root, setRoot, onAnyAction }) {
  const [value, setValue]   = useState('');
  const [steps, setSteps]   = useState([]);
  const [stepIdx, setStepIdx] = useState(0);
  const [running, setRunning] = useState(false);
  const [foundNode, setFoundNode] = useState(null);
  const pending = useRef(null); // tree to commit after animation
  const timer   = useRef(null);

  const activeNode = running && stepIdx > 0 ? steps[stepIdx - 1]?.nodeValue : null;
  const pathNodes  = steps.slice(0, stepIdx).map((s) => s.nodeValue).filter((v) => v !== null);

  useEffect(() => {
    if (!running || stepIdx >= steps.length) return;
    const isLast = stepIdx + 1 >= steps.length;
    timer.current = setTimeout(() => {
      setStepIdx(stepIdx + 1);
      if (isLast) {
        // animation finished: commit any pending tree change
        const last = steps[steps.length - 1];
        if (last?.action === 'found') setFoundNode(last.nodeValue);
        if (pending.current !== null) { setRoot(pending.current); pending.current = null; }
        setRunning(false);
      }
    }, STEP_MS);
    return () => clearTimeout(timer.current);
  }, [running, stepIdx, steps, setRoot]);

  function run(operation) {
    const v = parseInt(value, 10);
    if (Number.isNaN(v)) return;
    clearTimeout(timer.current);
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

    setSteps(generatedSteps);
    setStepIdx(0);
    setRunning(true);
    onAnyAction?.();
    setValue('');
  }

  const visibleLog = steps.slice(0, Math.max(stepIdx, running ? 0 : steps.length));

  return (
    <section style={card}>
      <h3 style={{ marginTop: 0, color: '#e6edf3' }}>Simulador — Operações passo a passo</h3>
      <p style={{ color: '#8b949e', marginTop: 0 }}>
        Digite um valor e execute uma operação. Observe o caminho percorrido e o log das comparações.
      </p>

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="valor"
          disabled={running}
          style={input}
          onKeyDown={(e) => e.key === 'Enter' && run('insert')}
        />
        <button onClick={() => run('insert')} disabled={running} style={{ ...btn, background: '#0f3460' }}>Inserir</button>
        <button onClick={() => run('search')} disabled={running} style={{ ...btn, background: '#1d3557' }}>Buscar</button>
        <button onClick={() => run('remove')} disabled={running} style={{ ...btn, background: '#6b2737' }}>Remover</button>
      </div>

      <TreeSVG
        root={root}
        highlightedNodes={activeNode !== null ? [activeNode] : []}
        visitedNodes={pathNodes}
        foundNode={foundNode}
      />

      {steps.length > 0 && (
        <div style={logBox}>
          {visibleLog.map((s, i) => (
            <div key={i} style={{ color: '#a8dadc', fontFamily: 'monospace', fontSize: '13px', padding: '2px 0' }}>
              › {s.message}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

const card  = { background: '#161b22', border: '1px solid #30363d', borderRadius: '10px', padding: '20px', marginBottom: '24px' };
const btn   = { padding: '10px 16px', borderRadius: '6px', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold' };
const input = { padding: '10px 12px', borderRadius: '6px', border: '1px solid #30363d', background: '#0d1117', color: '#e6edf3', width: '90px', fontSize: '14px' };
const logBox = { marginTop: '16px', background: '#0d1117', border: '1px solid #30363d', borderRadius: '6px', padding: '12px', maxHeight: '160px', overflowY: 'auto' };
