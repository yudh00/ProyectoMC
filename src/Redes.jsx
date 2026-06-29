// Redes.jsx — Sección B, Tema 3
// Ejercicio A: Ruta más corta — Algoritmo de Dijkstra (A→F, 9 km)
// Ejercicio B: Árbol de Expansión Mínima — Algoritmo de Kruskal (17 km)
import { BlockMath, InlineMath } from './Katex'

const th = {
  border: '1px solid var(--border-color)',
  padding: '0.3rem 0.55rem',
  textAlign: 'center',
  fontSize: '0.8rem',
  background: 'var(--surface-soft)',
}
const td = {
  border: '1px solid var(--border-color)',
  padding: '0.28rem 0.5rem',
  textAlign: 'center',
  fontSize: '0.8rem',
}

// ── Grafo SVG con 6 nodos ────────────────────────────────────────────────────
// Nodos: A=Puerto Limón, B, C, D, E, F=Centro Distribución SJ
// Aristas: A-B=7, A-C=5, A-D=6, B-C=2, B-E=4, C-E=6, C-F=4, D-C=3, D-F=8, E-F=3
const NODES = {
  A: { x: 50,  y: 120, label: 'A\nPuerto\nLimón' },
  B: { x: 160, y: 45  },
  C: { x: 200, y: 120 },
  D: { x: 140, y: 200 },
  E: { x: 290, y: 50  },
  F: { x: 330, y: 130, label: 'F\nC. Dist\nSJ' },
}
const EDGES = [
  ['A','B', 7], ['A','C', 5], ['A','D', 6],
  ['B','C', 2], ['B','E', 4],
  ['C','E', 6], ['C','F', 4],
  ['D','C', 3], ['D','F', 8],
  ['E','F', 3],
]

function GrafoSVG({ highlight = [], mstEdges = [] }) {
  return (
    <svg viewBox="0 0 390 250" width="100%" style={{ maxWidth: 390, display: 'block', margin: '0.6rem auto' }}>
      {/* Aristas */}
      {EDGES.map(([a, b, w]) => {
        const na = NODES[a], nb = NODES[b]
        const key = `${a}-${b}`
        const isHL = highlight.some(([x, y]) => (x === a && y === b) || (x === b && y === a))
        const isMST = mstEdges.some(([x, y]) => (x === a && y === b) || (x === b && y === a))
        const mx = (na.x + nb.x) / 2
        const my = (na.y + nb.y) / 2
        return (
          <g key={key}>
            <line
              x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
              stroke={isHL ? '#f472b6' : isMST ? '#a78bfa' : 'var(--border-color)'}
              strokeWidth={isHL || isMST ? 2.5 : 1.5}
            />
            <rect x={mx - 8} y={my - 8} width={16} height={13} rx={3} fill="var(--panel-bg)" opacity="0.85" />
            <text x={mx} y={my + 2} textAnchor="middle" fontSize="10"
              fill={isHL ? '#f472b6' : isMST ? '#a78bfa' : 'var(--muted-text)'}
              fontWeight={isHL || isMST ? '700' : '400'}>
              {w}
            </text>
          </g>
        )
      })}
      {/* Nodos */}
      {Object.entries(NODES).map(([id, { x, y }]) => {
        const isStart = id === 'A'
        const isEnd = id === 'F'
        const isPath = highlight.some(([a, b]) => a === id || b === id)
        return (
          <g key={id}>
            <circle
              cx={x} cy={y} r={18}
              fill={isStart || isEnd ? 'var(--accent-soft)' : isPath ? 'rgba(164,215,252,0.18)' : 'var(--surface-soft)'}
              stroke={isStart || isEnd ? 'var(--accent)' : 'var(--border-color)'}
              strokeWidth={isStart || isEnd ? 2 : 1}
            />
            <text x={x} y={y + 4} textAnchor="middle" fontSize="12" fontWeight="700"
              fill={isStart || isEnd ? 'var(--accent)' : 'var(--text-color)'}>
              {id}
            </text>
          </g>
        )
      })}
      {/* Leyendas */}
      <text x={8} y={238} fontSize="8" fill="var(--muted-text)">Distancias en km</text>
    </svg>
  )
}

// ── EJERCICIO A — Dijkstra ────────────────────────────────────────────────────
function EjercicioDijkstra() {
  const pathEdges = [['A','C'], ['C','F']]
  return (
    <div>
      <div className="enunciado">
        <h4 className="exec-subtitle">Ejercicio A — Ruta Más Corta (Algoritmo de Dijkstra)</h4>
        <p>
          Una empresa de transporte debe enviar mercancía desde el <strong>Puerto de Limón (A)</strong>{' '}
          hasta el <strong>Centro de Distribución en San José (F)</strong>. Las conexiones son
          bidireccionales. ¿Cuál es la ruta más eficiente?
        </p>
        <GrafoSVG highlight={pathEdges} />
        <div style={{ overflowX: 'auto', margin: '0.5rem 0' }}>
          <table style={{ borderCollapse: 'collapse', fontSize: '0.82rem' }}>
            <thead>
              <tr style={{ background: 'var(--surface-soft)' }}>
                <th style={th}>Conexión</th><th style={th}>km</th>
                <th style={th}>Conexión</th><th style={th}>km</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['A–B', 7, 'C–E', 6],
                ['A–C', 5, 'C–F', 4],
                ['A–D', 6, 'D–C', 3],
                ['B–C', 2, 'D–F', 8],
                ['B–E', 4, 'E–F', 3],
              ].map(([c1, d1, c2, d2]) => (
                <tr key={c1}>
                  <td style={td}>{c1}</td><td style={td}>{d1}</td>
                  <td style={td}>{c2}</td><td style={td}>{d2}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="solucion">
        <h4 className="exec-subtitle">Desarrollo Paso a Paso</h4>

        {[
          {
            paso: 1, nodo: 'A (inicio)',
            desc: 'Distancia actual: 0 km. Evaluamos salidas: B=7 km, C=5 km, D=6 km.',
            decision: 'Nos movemos al Nodo C — distancia acumulada: 5 km'
          },
          {
            paso: 2, nodo: 'C (acumulado: 5 km)',
            desc: 'Desde C sumamos a rutas: B=5+2=7, D=5+3=8, E=5+6=11, F=5+4=9.',
            decision: 'Encontramos ruta potencial A→C→F = 9 km'
          },
          {
            paso: 3, nodo: 'Comprobación de rutas alternativas',
            desc: 'Ruta por D: A→D(6)+D→F(8)=14 km. Ruta por B: A→B(7)+B→E(4)+E→F(3)=14 km.',
            decision: 'Ambas alternativas superan los 9 km — se descartan'
          },
        ].map(({ paso, nodo, desc, decision }) => (
          <div key={paso} className="formula-item" style={{ marginBottom: '0.5rem' }}>
            <span className="formula-label">Paso {paso} — Nodo {nodo}</span>
            <p style={{ margin: '0.25rem 0 0.1rem', fontSize: '0.83rem' }}>{desc}</p>
            <p style={{ margin: 0, fontSize: '0.83rem', color: 'var(--accent)', fontWeight: 700 }}>→ {decision}</p>
          </div>
        ))}

        <div className="exec-conclusion">
          <strong>Ruta óptima:</strong> <InlineMath math="A \to C \to F" />
          <BlockMath math="d_{\min}(A \to F) = 5 + 4 = 9 \text{ km}" />
        </div>
      </div>
    </div>
  )
}

// ── EJERCICIO B — Kruskal MST ────────────────────────────────────────────────
function EjercicioKruskal() {
  const mstEdges = [['B','C'], ['C','D'], ['E','F'], ['C','F'], ['A','C']]
  return (
    <div>
      <div className="enunciado">
        <h4 className="exec-subtitle">Ejercicio B — Árbol de Expansión Mínima (Algoritmo de Kruskal)</h4>
        <p>
          Usando el mismo grafo, encontrar el subconjunto de aristas que conecte{' '}
          <strong>todos los nodos</strong> con la <strong>menor distancia total</strong>, sin
          formar ciclos (árbol de expansión mínima).
        </p>
        <GrafoSVG mstEdges={mstEdges} />
      </div>

      <div className="solucion">
        <h4 className="exec-subtitle">Aristas ordenadas por peso</h4>
        <div style={{ overflowX: 'auto', margin: '0.6rem 0' }}>
          <table style={{ borderCollapse: 'collapse', fontSize: '0.82rem' }}>
            <thead>
              <tr style={{ background: 'var(--surface-soft)' }}>
                <th style={th}>Arista</th><th style={th}>km</th><th style={th}>¿Incluir?</th><th style={th}>Razón</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['B–C', 2, '✓', 'Menor peso, no forma ciclo → acumulado: 2'],
                ['C–D', 3, '✓', 'No forma ciclo → acumulado: 5'],
                ['E–F', 3, '✓', 'No forma ciclo (grupo separado) → acumulado: 8'],
                ['B–E', 4, '✗', 'Formaría ciclo B-C-F-E'],
                ['C–F', 4, '✓', 'Conecta grupo B-C-D con E-F → acumulado: 12'],
                ['A–C', 5, '✓', 'Conecta nodo A al árbol → acumulado: 17'],
                ['A–D', 6, '✗', 'A ya está conectado'],
                ['C–E', 6, '✗', 'Formaría ciclo'],
                ['A–B', 7, '✗', 'A ya está conectado'],
                ['D–F', 8, '✗', 'Todos conectados'],
              ].map(([a, d, inc, r]) => (
                <tr key={a} style={{ background: inc === '✓' ? 'var(--accent-soft)' : undefined }}>
                  <td style={td}><strong>{a}</strong></td>
                  <td style={td}>{d}</td>
                  <td style={td} style={{ color: inc === '✓' ? 'var(--accent)' : 'var(--muted-text)', fontWeight: 700 }}>{inc}</td>
                  <td style={{ ...td, textAlign: 'left' }}>{r}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h4 className="exec-subtitle">Árbol de Expansión Mínima</h4>
        <p>Aristas seleccionadas: <strong>B–C, C–D, E–F, C–F, A–C</strong> (5 aristas para 6 nodos).</p>
        <BlockMath math="\text{MST} = \{B\!-\!C,\; C\!-\!D,\; E\!-\!F,\; C\!-\!F,\; A\!-\!C\}" />

        <div className="exec-conclusion">
          <BlockMath math="d_{\text{MST}} = 2 + 3 + 3 + 4 + 5 = 17 \text{ km}" />
          El árbol de expansión mínima conecta los 6 nodos sin ciclos con solo 17 km de
          infraestructura, minimizando el costo total de construcción de rutas.
        </div>
      </div>
    </div>
  )
}

// ── Componente principal ──────────────────────────────────────────────────────
export default function Redes() {
  return (
    <div style={{ display: 'grid', gap: '1.5rem' }}>
      <EjercicioDijkstra />
      <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)' }} />
      <EjercicioKruskal />
    </div>
  )
}
