const codeBlock = {
  background: '#F8FAFC',
  padding: '16px',
  borderRadius: '8px',
  color: '#334155',
  overflow: 'auto',
  border: '1px solid #E5E7EB',
  fontSize: '13px',
  lineHeight: 1.6,
};

const heading = { color: '#2D60FF', marginTop: '20px' };

export const phaseContent = {
  1: {
    title: 'Estrutura da Árvore Binária de Busca',
    content: (
      <>
        <h3 style={heading}>O que é uma ABB?</h3>
        <p>
          Uma <strong>Árvore Binária de Busca</strong> é uma estrutura de dados hierárquica onde cada nó
          possui no máximo dois filhos (esquerdo e direito), seguindo uma propriedade fundamental:
        </p>
        <ul style={{ color: '#374151', lineHeight: 1.8 }}>
          <li>Todos os valores na <strong>subárvore esquerda</strong> são <strong>menores</strong> que o nó atual.</li>
          <li>Todos os valores na <strong>subárvore direita</strong> são <strong>maiores</strong> que o nó atual.</li>
        </ul>

        <h3 style={heading}>Terminologia Essencial</h3>
        <ul style={{ color: '#374151', lineHeight: 1.8 }}>
          <li><strong>Raiz:</strong> o nó no topo da árvore, sem pai.</li>
          <li><strong>Folha:</strong> um nó que não possui filhos.</li>
          <li><strong>Nó interno:</strong> um nó que possui pelo menos um filho.</li>
          <li><strong>Altura:</strong> o comprimento do maior caminho da raiz até uma folha.</li>
          <li><strong>Profundidade:</strong> a distância de um nó até a raiz.</li>
        </ul>

        <h3 style={heading}>Propriedade de Ordenação</h3>
        <p>
          O percurso em ordem (in-order) de uma ABB sempre produz os elementos em <strong>ordem crescente</strong>.
          Isso torna a busca eficiente — podemos descartar metade dos nós a cada comparação.
        </p>

        <pre style={codeBlock}>
{`        50
       /  \\
     30    70
    /  \\  /  \\
  20  40 60  80

• 20, 40 < 50 → subárvore esquerda ✓
• 60, 80 > 50 → subárvore direita  ✓`}
        </pre>
      </>
    ),
  },

  2: {
    title: 'Algoritmos: Inserção, Busca e Remoção',
    content: (
      <>
        <h3 style={heading}>Inserção</h3>
        <p>
          Para inserir um valor, percorremos a árvore a partir da raiz: se o valor é menor,
          vamos para a esquerda; se é maior, para a direita. Quando encontramos uma posição
          vazia, inserimos o novo nó ali.
        </p>
        <pre style={codeBlock}>
{`Inserir 45:
  50 → esquerda (45 < 50)
  30 → direita  (45 > 30)
  40 → direita  (45 > 40)
  null → inserir aqui!`}
        </pre>

        <h3 style={heading}>Busca</h3>
        <p>
          A busca segue a mesma lógica: comparamos o valor procurado com o nó
          atual e descemos para esquerda ou direita. Complexidade: <strong>O(h)</strong>,
          onde h é a altura da árvore.
        </p>

        <h3 style={heading}>Remoção</h3>
        <p>A remoção tem três casos:</p>
        <ol style={{ color: '#374151', lineHeight: 1.8 }}>
          <li><strong>Nó folha:</strong> simplesmente removemos o nó.</li>
          <li><strong>Nó com um filho:</strong> substituímos o nó pelo seu único filho.</li>
          <li>
            <strong>Nó com dois filhos:</strong> encontramos o sucessor em ordem
            (menor valor da subárvore direita), copiamos seu valor e removemos o sucessor.
          </li>
        </ol>
      </>
    ),
  },

  3: {
    title: 'Percursos: Em Ordem, Pré-Ordem e Pós-Ordem',
    content: (
      <>
        <h3 style={heading}>Em Ordem (In-Order)</h3>
        <p>Esquerda → Raiz → Direita. Em uma ABB, produz os valores em <strong>ordem crescente</strong>.</p>
        <pre style={codeBlock}>{`Resultado: 20, 30, 40, 50, 60, 70, 80`}</pre>

        <h3 style={heading}>Pré-Ordem (Pre-Order)</h3>
        <p>Raiz → Esquerda → Direita. Útil para copiar/serializar a árvore.</p>
        <pre style={codeBlock}>{`Resultado: 50, 30, 20, 40, 70, 60, 80`}</pre>

        <h3 style={heading}>Pós-Ordem (Post-Order)</h3>
        <p>Esquerda → Direita → Raiz. Útil para deletar a árvore ou avaliar expressões.</p>
        <pre style={codeBlock}>{`Resultado: 20, 40, 30, 60, 80, 70, 50`}</pre>
      </>
    ),
  },

  4: {
    title: 'Complexidade: Caso Médio, Pior Caso e Degeneração',
    content: (
      <>
        <h3 style={heading}>Caso Médio — O(log n)</h3>
        <p>
          Quando os elementos são inseridos de forma aleatória, a árvore tende a ficar
          balanceada, com altura proporcional a log₂(n).
        </p>

        <h3 style={heading}>Pior Caso — O(n)</h3>
        <p>
          Se os elementos são inseridos em ordem, a árvore degenera em uma lista ligada,
          e todas as operações passam a ser <strong>O(n)</strong>.
        </p>

        <pre style={codeBlock}>
{`Balanceada:          Degenerada:
     50               10
    /  \\                \\
  30    70               20
 /  \\  /  \\               \\
20 40 60  80              30
                            \\
Altura: 2                   40
                        Altura: 3`}
        </pre>

        <h3 style={heading}>Tabela de Complexidades</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '8px', fontSize: '14px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #E5E7EB' }}>
              <th style={{ textAlign: 'left', padding: '8px', color: '#6B7280' }}>Operação</th>
              <th style={{ textAlign: 'center', padding: '8px', color: '#6B7280' }}>Caso Médio</th>
              <th style={{ textAlign: 'center', padding: '8px', color: '#6B7280' }}>Pior Caso</th>
            </tr>
          </thead>
          <tbody>
            {[['Busca', 'O(log n)', 'O(n)'], ['Inserção', 'O(log n)', 'O(n)'], ['Remoção', 'O(log n)', 'O(n)']].map(([op, avg, worst]) => (
              <tr key={op} style={{ borderBottom: '1px solid #F3F4F6' }}>
                <td style={{ padding: '8px', color: '#374151' }}>{op}</td>
                <td style={{ textAlign: 'center', padding: '8px', color: '#10B981', fontWeight: 600 }}>{avg}</td>
                <td style={{ textAlign: 'center', padding: '8px', color: '#EF4444', fontWeight: 600 }}>{worst}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    ),
  },

  5: {
    title: 'Integração: Estudo de Caso e Exploração',
    content: (
      <>
        <h3 style={heading}>Aplicações Práticas</h3>
        <ul style={{ color: '#374151', lineHeight: 1.8 }}>
          <li><strong>Bancos de dados:</strong> índices B-Tree são baseados em conceitos de ABB.</li>
          <li><strong>Sistemas de arquivos:</strong> organização hierárquica de diretórios.</li>
          <li><strong>Compiladores:</strong> árvores de sintaxe abstrata (AST).</li>
          <li><strong>Autocompletar:</strong> tries e árvores de prefixo.</li>
        </ul>

        <h3 style={heading}>Quando Usar uma ABB?</h3>
        <ul style={{ color: '#374151', lineHeight: 1.8 }}>
          <li>Busca, inserção e remoção eficientes em O(log n).</li>
          <li>Dados mantidos em ordem.</li>
          <li>Operações de intervalo (encontrar valores entre A e B).</li>
        </ul>

        <h3 style={heading}>Quando NÃO Usar?</h3>
        <ul style={{ color: '#374151', lineHeight: 1.8 }}>
          <li>Dados já ordenados → use árvore balanceada (AVL, Red-Black).</li>
          <li>Apenas busca → hash table oferece O(1).</li>
          <li>Conjunto pequeno → array simples pode ser melhor.</li>
        </ul>
      </>
    ),
  },
};
