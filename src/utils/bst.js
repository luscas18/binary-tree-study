// ─── Node factory ────────────────────────────────────────────────────────────

export const makeNode = (value) => ({ value, left: null, right: null });

// ─── Core operations (pure, immutable) ───────────────────────────────────────

export function insert(root, value) {
  if (root === null) return makeNode(value);
  if (value < root.value) return { ...root, left: insert(root.left, value) };
  if (value > root.value) return { ...root, right: insert(root.right, value) };
  return root; // duplicate: ignore
}

export function search(root, value) {
  if (root === null) return false;
  if (value === root.value) return true;
  return value < root.value ? search(root.left, value) : search(root.right, value);
}

export function remove(root, value) {
  if (root === null) return null;
  if (value < root.value) return { ...root, left: remove(root.left, value) };
  if (value > root.value) return { ...root, right: remove(root.right, value) };

  // Node found
  if (root.left === null) return root.right;
  if (root.right === null) return root.left;

  // Two children: replace with in-order successor (min of right subtree)
  const successor = minNode(root.right);
  return { ...root, value: successor.value, right: remove(root.right, successor.value) };
}

function minNode(node) {
  return node.left === null ? node : minNode(node.left);
}

// ─── Traversals ───────────────────────────────────────────────────────────────

export function inOrder(root) {
  if (root === null) return [];
  return [...inOrder(root.left), root.value, ...inOrder(root.right)];
}

export function preOrder(root) {
  if (root === null) return [];
  return [root.value, ...preOrder(root.left), ...preOrder(root.right)];
}

export function postOrder(root) {
  if (root === null) return [];
  return [...postOrder(root.left), ...postOrder(root.right), root.value];
}

// ─── Step-by-step operations ─────────────────────────────────────────────────
// Each step: { nodeValue, direction, action, message }
// Used for animations and for generating the expected answer key for grading.

export function insertSteps(root, value) {
  const steps = [];

  function walk(node) {
    if (node === null) {
      steps.push({ nodeValue: null, direction: null, action: 'insert', message: `Posição encontrada! Inserindo ${value}.` });
      return;
    }
    if (value === node.value) {
      steps.push({ nodeValue: node.value, direction: null, action: 'duplicate', message: `Valor ${value} já existe na árvore.` });
      return;
    }
    const direction = value < node.value ? 'left' : 'right';
    const label = direction === 'left' ? 'esquerda' : 'direita';
    steps.push({
      nodeValue: node.value,
      direction,
      action: 'compare',
      message: `${value} < ${node.value}? ${direction === 'left' ? 'Sim' : 'Não'} → vá para a ${label}.`,
    });
    walk(direction === 'left' ? node.left : node.right);
  }

  walk(root);
  return steps;
}

export function searchSteps(root, value) {
  const steps = [];

  function walk(node) {
    if (node === null) {
      steps.push({ nodeValue: null, direction: null, action: 'not-found', message: `${value} não encontrado na árvore.` });
      return;
    }
    if (value === node.value) {
      steps.push({ nodeValue: node.value, direction: null, action: 'found', message: `${value} encontrado!` });
      return;
    }
    const direction = value < node.value ? 'left' : 'right';
    const label = direction === 'left' ? 'esquerda' : 'direita';
    steps.push({
      nodeValue: node.value,
      direction,
      action: 'compare',
      message: `${value} < ${node.value}? ${direction === 'left' ? 'Sim' : 'Não'} → vá para a ${label}.`,
    });
    walk(direction === 'left' ? node.left : node.right);
  }

  walk(root);
  return steps;
}

export function removeSteps(root, value) {
  const steps = [];

  function walk(node) {
    if (node === null) {
      steps.push({ nodeValue: null, direction: null, action: 'not-found', message: `${value} não encontrado.` });
      return;
    }
    if (value < node.value) {
      steps.push({ nodeValue: node.value, direction: 'left', action: 'compare', message: `${value} < ${node.value} → vá para a esquerda.` });
      walk(node.left);
    } else if (value > node.value) {
      steps.push({ nodeValue: node.value, direction: 'right', action: 'compare', message: `${value} > ${node.value} → vá para a direita.` });
      walk(node.right);
    } else {
      const kind = !node.left && !node.right ? 'leaf'
        : !node.left || !node.right ? 'one-child'
        : 'two-children';
      const successorVal = kind === 'two-children' ? minNode(node.right).value : null;
      steps.push({
        nodeValue: node.value,
        direction: null,
        action: 'remove',
        kind,
        successorValue: successorVal,
        message: kind === 'leaf'
          ? `Nó ${value} é folha. Remova diretamente.`
          : kind === 'one-child'
          ? `Nó ${value} tem um filho. Substitua pelo filho.`
          : `Nó ${value} tem dois filhos. Substitua pelo sucessor em-ordem (${successorVal}).`,
      });
    }
  }

  walk(root);
  return steps;
}

// ─── Traversal step-by-step (for animation) ──────────────────────────────────

export function traversalSteps(root, type) {
  const steps = [];

  const visitors = {
    inOrder: (node) => {
      if (!node) return;
      visitors.inOrder(node.left);
      steps.push({ nodeValue: node.value, message: `Visitar ${node.value}` });
      visitors.inOrder(node.right);
    },
    preOrder: (node) => {
      if (!node) return;
      steps.push({ nodeValue: node.value, message: `Visitar ${node.value}` });
      visitors.preOrder(node.left);
      visitors.preOrder(node.right);
    },
    postOrder: (node) => {
      if (!node) return;
      visitors.postOrder(node.left);
      visitors.postOrder(node.right);
      steps.push({ nodeValue: node.value, message: `Visitar ${node.value}` });
    },
  };

  visitors[type]?.(root);
  return steps;
}

// ─── Automated grading ───────────────────────────────────────────────────────
// Compares the student's sequence of directions against the expected answer key.
// Returns { correct: bool, mistakes: [{ stepIndex, expected, given }] }

export function gradeDirections(expectedSteps, studentAnswers) {
  const compareSteps = expectedSteps.filter((s) => s.action === 'compare');
  const mistakes = [];

  compareSteps.forEach((step, i) => {
    const given = studentAnswers[i];
    if (given !== step.direction) {
      mistakes.push({ stepIndex: i, nodeValue: step.nodeValue, expected: step.direction, given });
    }
  });

  return { correct: mistakes.length === 0, mistakes, total: compareSteps.length };
}

// Grades traversal sequence ordering exercise.
export function gradeTraversalOrder(root, type, studentSequence) {
  const expected = type === 'inOrder' ? inOrder(root)
    : type === 'preOrder' ? preOrder(root)
    : postOrder(root);

  const mistakes = studentSequence
    .map((val, i) => (val !== expected[i] ? { index: i, expected: expected[i], given: val } : null))
    .filter(Boolean);

  return { correct: mistakes.length === 0, mistakes, expected };
}

// Grades BST validity quiz (is this tree a valid BST?).
export function gradeValidity(root, studentAnswer) {
  const correct = isValidBST(root) === (studentAnswer === 'valid');
  return { correct, violatingNodes: correct ? [] : getViolatingNodes(root) };
}

// Grades case study choice (ABB adequada/inadequada).
export function gradeCaseStudy(correctAnswer, studentAnswer) {
  return { correct: studentAnswer === correctAnswer };
}

// ─── BST validation ───────────────────────────────────────────────────────────

export function isValidBST(root, min = -Infinity, max = Infinity) {
  if (root === null) return true;
  if (root.value <= min || root.value >= max) return false;
  return isValidBST(root.left, min, root.value) && isValidBST(root.right, root.value, max);
}

export function getViolatingNodes(root, min = -Infinity, max = Infinity) {
  if (root === null) return [];
  const violations = root.value <= min || root.value >= max ? [root.value] : [];
  return [
    ...violations,
    ...getViolatingNodes(root.left, min, root.value),
    ...getViolatingNodes(root.right, root.value, max),
  ];
}

// ─── Complexity metrics ───────────────────────────────────────────────────────

export function getHeight(root) {
  if (root === null) return 0;
  return 1 + Math.max(getHeight(root.left), getHeight(root.right));
}

export function countComparisons(root, value) {
  let count = 0;
  let node = root;
  while (node !== null) {
    count++;
    if (value === node.value) return count;
    node = value < node.value ? node.left : node.right;
  }
  return count; // not found but counted comparisons
}

export function isDegenerate(root) {
  let node = root;
  while (node !== null) {
    if (node.left !== null && node.right !== null) return false;
    node = node.left ?? node.right;
  }
  return true;
}

export function countNodes(root) {
  if (root === null) return 0;
  return 1 + countNodes(root.left) + countNodes(root.right);
}

// ─── Layout (x/y for SVG rendering) ──────────────────────────────────────────
// Returns a new tree with x, y, depth added to every node.

export function toLayoutTree(root, containerWidth = 800) {
  if (!root) return null;

  const positions = new Map();
  let counter = 0;

  // In-order traversal to assign horizontal ranks
  function assignX(node) {
    if (!node) return;
    assignX(node.left);
    positions.set(node, counter++);
    assignX(node.right);
  }

  assignX(root);

  const nodeCount = counter;
  const VERTICAL_GAP = 70;
  const horizontalStep = nodeCount > 1 ? containerWidth / nodeCount : containerWidth / 2;

  function buildLayout(node, depth) {
    if (!node) return null;
    const rank = positions.get(node);
    return {
      ...node,
      x: rank * horizontalStep + horizontalStep / 2,
      y: depth * VERTICAL_GAP + 40,
      depth,
      left: buildLayout(node.left, depth + 1),
      right: buildLayout(node.right, depth + 1),
    };
  }

  return buildLayout(root, 0);
}
