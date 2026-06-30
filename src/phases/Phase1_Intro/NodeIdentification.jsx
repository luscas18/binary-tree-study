import { useMemo, useState } from 'react';
import TreeSVG from '../../components/TreeSVG';
import { insert } from '../../utils/bst';
import FeedbackBanner from '../../components/shared/FeedbackBanner';

const VALUES = [8, 4, 12, 2, 6, 10, 14];

const QUESTIONS = [
  { id: 'root', prompt: 'Clique na RAIZ da árvore.', test: (node, root) => node.value === root.value },
  { id: 'leaf', prompt: 'Clique em uma FOLHA (nó sem filhos).', test: (node) => !node.left && !node.right },
  { id: 'internal', prompt: 'Clique em um nó INTERNO (com pelo menos um filho, que não seja a raiz).', test: (node, root) => node.value !== root.value && (node.left || node.right) },
];

function findNode(node, value) {
  if (!node) return null;
  if (node.value === value) return node;
  return findNode(node.left, value) || findNode(node.right, value);
}

export default function NodeIdentification({ onComplete }) {
  const root = useMemo(() => VALUES.reduce((r, v) => insert(r, v), null), []);
  const [qIdx, setQIdx] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [highlighted, setHighlighted] = useState([]);
  const [correctNode, setCorrectNode] = useState([]);
  const [correctCount, setCorrectCount] = useState(0);

  const question = QUESTIONS[qIdx];
  const finished = qIdx >= QUESTIONS.length;

  function handleClick(value) {
    if (finished || feedback?.locked) return;
    const node = findNode(root, value);
    const ok = question.test(node, root);

    if (ok) {
      setHighlighted([]);
      setCorrectNode([value]);
      const nextCount = correctCount + 1;
      setCorrectCount(nextCount);
      setFeedback({ type: 'correct', message: 'Correto! Avançando...', locked: true });
      setTimeout(() => {
        setFeedback(null);
        setHighlighted([]);
        setCorrectNode([]);
        if (qIdx + 1 >= QUESTIONS.length) {
          onComplete?.(nextCount, QUESTIONS.length);
        }
        setQIdx((i) => i + 1);
      }, 900);
    } else {
      setHighlighted([value]);
      setCorrectNode([]);
      setFeedback({ type: 'incorrect', message: 'Esse nó não corresponde. Tente outro.' });
    }
  }

  return (
    <section style={card}>
      <h3 style={{ marginTop: 0, marginBottom: '8px' }}>Identifique as partes da árvore</h3>
      {!finished ? (
        <p style={{ color: '#6B7280', fontSize: '14px', marginBottom: '12px' }}>
          <strong style={{ color: '#2D60FF' }}>Tarefa {qIdx + 1}/{QUESTIONS.length}:</strong> {question.prompt}
        </p>
      ) : (
        <p style={{ color: '#10B981', fontWeight: 600, fontSize: '14px' }}>
          Identificação concluída — {correctCount}/{QUESTIONS.length} corretas na primeira tentativa.
        </p>
      )}

      <TreeSVG root={root} highlightedNodes={highlighted} visitedNodes={correctNode} onNodeClick={handleClick} />

      <p style={{ color: '#9CA3AF', fontSize: '13px', marginTop: '12px' }}>
        Propriedade da ABB: para todo nó, <code>esquerda &lt; raiz &lt; direita</code>.
      </p>

      {feedback && <FeedbackBanner type={feedback.type} message={feedback.message} />}
    </section>
  );
}

const card = { background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '24px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' };
