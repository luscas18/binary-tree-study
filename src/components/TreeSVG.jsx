import { toLayoutTree } from '../utils/bst';

const NODE_RADIUS = 22;

const COLORS = {
  default:     { fill: '#1d3557', stroke: '#457b9d', text: '#e6edf3' },
  highlighted: { fill: '#e94560', stroke: '#ff6b6b', text: '#fff' },
  visited:     { fill: '#2d6a4f', stroke: '#52b788', text: '#fff' },
  found:       { fill: '#f4a261', stroke: '#e76f51', text: '#fff' },
  violation:   { fill: '#6b2737', stroke: '#c1121f', text: '#fff' },
};

function getNodeColor(value, { highlightedNodes, visitedNodes, foundNode, violatingNodes }) {
  if (foundNode === value)              return COLORS.found;
  if (highlightedNodes?.includes(value)) return COLORS.highlighted;
  if (violatingNodes?.includes(value))   return COLORS.violation;
  if (visitedNodes?.includes(value))     return COLORS.visited;
  return COLORS.default;
}

function collectEdges(node) {
  if (!node) return [];
  const edges = [];
  if (node.left)  edges.push({ x1: node.x, y1: node.y, x2: node.left.x,  y2: node.left.y  });
  if (node.right) edges.push({ x1: node.x, y1: node.y, x2: node.right.x, y2: node.right.y });
  return [...edges, ...collectEdges(node.left), ...collectEdges(node.right)];
}

function collectNodes(node) {
  if (!node) return [];
  return [node, ...collectNodes(node.left), ...collectNodes(node.right)];
}

function getTreeHeight(node) {
  if (!node) return 0;
  return 1 + Math.max(getTreeHeight(node.left), getTreeHeight(node.right));
}

export default function TreeSVG({
  root,
  highlightedNodes = [],
  visitedNodes     = [],
  foundNode        = null,
  violatingNodes   = [],
  onNodeClick      = null,
  width            = 700,
}) {
  if (!root) {
    return (
      <div style={{ textAlign: 'center', color: '#4a4e69', padding: '32px', border: '2px dashed #4a4e69', borderRadius: '8px' }}>
        Árvore vazia
      </div>
    );
  }

  const laid     = toLayoutTree(root, width);
  const height   = Math.max(getTreeHeight(laid) * 70 + 60, 120);
  const edges    = collectEdges(laid);
  const nodes    = collectNodes(laid);
  const colorCtx = { highlightedNodes, visitedNodes, foundNode, violatingNodes };

  return (
    <svg
      width={width}
      height={height}
      style={{ display: 'block', margin: '0 auto', overflow: 'visible' }}
      aria-label="Árvore Binária de Busca"
    >
      {/* Edges */}
      {edges.map((e, i) => (
        <line
          key={i}
          x1={e.x1} y1={e.y1}
          x2={e.x2} y2={e.y2}
          stroke="#4a4e69"
          strokeWidth={2}
        />
      ))}

      {/* Nodes */}
      {nodes.map((node) => {
        const color    = getNodeColor(node.value, colorCtx);
        const cursor   = onNodeClick ? 'pointer' : 'default';
        return (
          <g
            key={node.value}
            transform={`translate(${node.x}, ${node.y})`}
            onClick={() => onNodeClick?.(node.value)}
            style={{ cursor }}
          >
            <circle
              r={NODE_RADIUS}
              fill={color.fill}
              stroke={color.stroke}
              strokeWidth={2.5}
            />
            <text
              textAnchor="middle"
              dominantBaseline="central"
              fill={color.text}
              fontSize={14}
              fontWeight="bold"
              fontFamily="monospace"
            >
              {node.value}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
