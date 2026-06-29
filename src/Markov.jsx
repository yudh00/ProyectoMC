// Markov.jsx — Sección B, Tema 5
// Cadenas de Markov — Supermercados en Limón
// π(0), π(1), π(2) y estado estacionario
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

// ── Diagrama de transición SVG ────────────────────────────────────────────────
function DiagramaMarkov() {
  // Nodos: M(Masxmenos), G(Greit), L(Líder)
  // Posiciones en un triángulo
  const nodes = [
    { id: 'M', x: 120, y: 50,  label: 'Masxmenos', color: '#7dd3fc' },
    { id: 'G', x: 240, y: 170, label: 'Greit',      color: '#a78bfa' },
    { id: 'L', x:  20, y: 170, label: 'Líder',      color: '#f472b6' },
  ]
  // Probabilidades de transición
  const selfProbs = [
    { node: 'M', x: 120, y: 10, p: '0.88' },
    { node: 'G', x: 295, y: 195, p: '0.80' },
    { node: 'L', x: -30, y: 195, p: '0.75' },
  ]
  const arrows = [
    { from: 'M', to: 'G', p: '0.08', cx: 200, cy: 90 },
    { from: 'M', to: 'L', p: '0.04', cx: 55,  cy: 90 },
    { from: 'G', to: 'M', p: '0.10', cx: 200, cy: 140 },
    { from: 'G', to: 'L', p: '0.10', cx: 155, cy: 195 },
    { from: 'L', to: 'M', p: '0.15', cx: 55,  cy: 140 },
    { from: 'L', to: 'G', p: '0.10', cx: 155, cy: 175 },
  ]
  const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]))

  return (
    <svg viewBox="-50 0 380 230" width="100%" style={{ maxWidth: 340, display: 'block', margin: '0.6rem auto' }}>
      <defs>
        <marker id="arr" markerWidth="8" markerHeight="6" refX="6" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="var(--muted-text)" />
        </marker>
      </defs>

      {/* Self-loops (lazo) */}
      {selfProbs.map(({ node, x, y, p }) => {
        const n = nodeMap[node]
        return (
          <g key={node + 'self'}>
            <circle cx={n.x} cy={n.y} r={26} fill="none" stroke={n.color} strokeWidth="1.2"
              strokeDasharray="2 3" opacity="0.5" />
            <text x={x} y={y + 10} textAnchor="middle" fontSize="9" fill={n.color}>{p}</text>
          </g>
        )
      })}

      {/* Aristas de transición */}
      {arrows.map(({ from, to, p, cx, cy }) => {
        const nf = nodeMap[from], nt = nodeMap[to]
        return (
          <g key={from + to}>
            <line x1={nf.x} y1={nf.y} x2={nt.x} y2={nt.y}
              stroke="var(--border-color)" strokeWidth="1.2" markerEnd="url(#arr)" />
            <text x={cx} y={cy} textAnchor="middle" fontSize="9" fill="var(--muted-text)">{p}</text>
          </g>
        )
      })}

      {/* Nodos */}
      {nodes.map(({ id, x, y, label, color }) => (
        <g key={id}>
          <circle cx={x} cy={y} r={22} fill="var(--surface-soft)" stroke={color} strokeWidth="2" />
          <text x={x} y={y + 4} textAnchor="middle" fontSize="12" fontWeight="700" fill={color}>{id}</text>
          <text x={x} y={y + 18} textAnchor="middle" fontSize="7" fill="var(--muted-text)">{label}</text>
        </g>
      ))}
    </svg>
  )
}

// ── Gráfica de barras comparativa ────────────────────────────────────────────
function BarrasEstado({ datos, title }) {
  const stores = ['Masxmenos', 'Greit', 'Líder']
  const colors = ['#7dd3fc', '#a78bfa', '#f472b6']
  const W = 300, H = 130, PL = 30, PB = 28, PT = 14
  const bw = 38
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ maxWidth: W, display: 'block', margin: '0.4rem auto' }}>
      <text x={W / 2} y={10} textAnchor="middle" fontSize="9" fill="var(--muted-text)">{title}</text>
      {datos.map((v, i) => {
        const bh = Math.round((H - PB - PT - 10) * v)
        const x = PL + i * (bw + 24)
        const y = H - PB - bh
        return (
          <g key={i}>
            <rect x={x} y={y} width={bw} height={bh} rx={3} fill={colors[i]} opacity="0.8" />
            <text x={x + bw / 2} y={y - 3} textAnchor="middle" fontSize="9" fill={colors[i]} fontWeight="700">
              {(v * 100).toFixed(1)}%
            </text>
            <text x={x + bw / 2} y={H - PB + 11} textAnchor="middle" fontSize="8" fill="var(--muted-text)">
              {stores[i].split('')[0]}
            </text>
            <text x={x + bw / 2} y={H - PB + 20} textAnchor="middle" fontSize="7" fill="var(--muted-text)">
              {stores[i].slice(1, 4)}
            </text>
          </g>
        )
      })}
      <line x1={PL - 2} y1={PT + 8} x2={PL - 2} y2={H - PB} stroke="var(--border-color)" strokeWidth="1" />
      <line x1={PL - 2} y1={H - PB} x2={W - 10} y2={H - PB} stroke="var(--border-color)" strokeWidth="1" />
    </svg>
  )
}

export default function Markov() {
  return (
    <div style={{ display: 'grid', gap: '1.5rem' }}>

      {/* ── Enunciado ── */}
      <div className="enunciado">
        <h4 className="exec-subtitle">Cadenas de Markov — Competencia de Supermercados en Limón</h4>
        <p>
          En el mercado de supermercados de la provincia de Limón compiten tres cadenas:
          <strong> Masxmenos (M)</strong>, <strong>Greit (G)</strong> y <strong>Líder (L)</strong>.
          Un estudio reveló las probabilidades de que un cliente cambie de supermercado cada periodo.
          Se tiene la distribución inicial de cuotas de mercado y la matriz de transición.
        </p>
        <DiagramaMarkov />
      </div>

      {/* ── Datos ── */}
      <div className="solucion">
        <h4 className="exec-subtitle">Datos del Modelo</h4>

        <p><strong>Estado inicial</strong> <InlineMath math="\pi^{(0)}" />:</p>
        <BlockMath math="\pi^{(0)} = [0.45,\; 0.35,\; 0.20]" />

        <p><strong>Matriz de transición</strong> <InlineMath math="P" />:</p>
        <div style={{ overflowX: 'auto', margin: '0.6rem 0' }}>
          <table style={{ borderCollapse: 'collapse', fontSize: '0.82rem' }}>
            <thead>
              <tr style={{ background: 'var(--surface-soft)' }}>
                <th style={th}>Desde \ Hacia</th>
                <th style={th}>M</th><th style={th}>G</th><th style={th}>L</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['M (Masxmenos)', '0.88', '0.08', '0.04'],
                ['G (Greit)',     '0.10', '0.80', '0.10'],
                ['L (Líder)',     '0.15', '0.10', '0.75'],
              ].map(([r, m, g, l]) => (
                <tr key={r}>
                  <td style={td}><strong>{r}</strong></td>
                  <td style={td}>{m}</td>
                  <td style={td}>{g}</td>
                  <td style={td}>{l}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── π(1) ── */}
        <h4 className="exec-subtitle">Cálculo de <InlineMath math="\pi^{(1)} = \pi^{(0)} \cdot P" /></h4>
        <BlockMath math="\pi^{(1)}_M = 0.45(0.88)+0.35(0.10)+0.20(0.15) = 0.396+0.035+0.030 = 0.4610" />
        <BlockMath math="\pi^{(1)}_G = 0.45(0.08)+0.35(0.80)+0.20(0.10) = 0.036+0.280+0.020 = 0.3360" />
        <BlockMath math="\pi^{(1)}_L = 0.45(0.04)+0.35(0.10)+0.20(0.75) = 0.018+0.035+0.150 = 0.2030" />

        <div style={{ overflowX: 'auto', margin: '0.5rem 0' }}>
          <table style={{ borderCollapse: 'collapse', fontSize: '0.82rem' }}>
            <thead>
              <tr style={{ background: 'var(--surface-soft)' }}>
                <th style={th}>Periodo</th>
                <th style={th}>Masxmenos (M)</th>
                <th style={th}>Greit (G)</th>
                <th style={th}>Líder (L)</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['π⁽⁰⁾ (inicial)', '0.4500', '0.3500', '0.2000'],
                ['π⁽¹⁾',          '0.4610', '0.3360', '0.2030'],
              ].map(([p, m, g, l]) => (
                <tr key={p}>
                  <td style={td}><strong>{p}</strong></td>
                  <td style={td}>{m}</td>
                  <td style={td}>{g}</td>
                  <td style={td}>{l}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── π(2) ── */}
        <h4 className="exec-subtitle">Cálculo de <InlineMath math="\pi^{(2)} = \pi^{(1)} \cdot P" /></h4>
        <BlockMath math="\pi^{(2)}_M = 0.4610(0.88)+0.3360(0.10)+0.2030(0.15) = 0.40568+0.03360+0.03045 = 0.4697" />
        <BlockMath math="\pi^{(2)}_G = 0.4610(0.08)+0.3360(0.80)+0.2030(0.10) = 0.03688+0.26880+0.02030 = 0.3260" />
        <BlockMath math="\pi^{(2)}_L = 0.4610(0.04)+0.3360(0.10)+0.2030(0.75) = 0.01844+0.03360+0.15225 = 0.2043" />

        <div style={{ overflowX: 'auto', margin: '0.5rem 0' }}>
          <table style={{ borderCollapse: 'collapse', fontSize: '0.82rem' }}>
            <thead>
              <tr style={{ background: 'var(--surface-soft)' }}>
                <th style={th}>Periodo</th>
                <th style={th}>Masxmenos (M)</th>
                <th style={th}>Greit (G)</th>
                <th style={th}>Líder (L)</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['π⁽⁰⁾', '0.4500', '0.3500', '0.2000'],
                ['π⁽¹⁾', '0.4610', '0.3360', '0.2030'],
                ['π⁽²⁾', '0.4697', '0.3260', '0.2043'],
              ].map(([p, m, g, l]) => (
                <tr key={p}>
                  <td style={td}><strong>{p}</strong></td>
                  <td style={td}>{m}</td>
                  <td style={td}>{g}</td>
                  <td style={td}>{l}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <BarrasEstado datos={[0.4697, 0.3260, 0.2043]} title="Distribución al periodo 2" />

        {/* ── Estado Estacionario ── */}
        <h4 className="exec-subtitle">Estado Estacionario <InlineMath math="\pi = \pi \cdot P" /></h4>
        <p>Se resuelve el sistema lineal <InlineMath math="\pi P = \pi" /> con <InlineMath math="\pi_M + \pi_G + \pi_L = 1" />:</p>
        <BlockMath math="\begin{cases} 0.88\pi_M + 0.10\pi_G + 0.15\pi_L = \pi_M \\ 0.08\pi_M + 0.80\pi_G + 0.10\pi_L = \pi_G \\ 0.04\pi_M + 0.10\pi_G + 0.75\pi_L = \pi_L \\ \pi_M + \pi_G + \pi_L = 1 \end{cases}" />

        <p>Solución del sistema:</p>
        <BlockMath math="\pi^* = [0.4924,\; 0.3409,\; 0.1667]" />

        <div style={{ overflowX: 'auto', margin: '0.5rem 0' }}>
          <table style={{ borderCollapse: 'collapse', fontSize: '0.82rem' }}>
            <thead>
              <tr style={{ background: 'var(--surface-soft)' }}>
                <th style={th}>Supermercado</th>
                <th style={th}>Cuota estacionaria</th>
                <th style={th}>Interpretación</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Masxmenos (M)', '49.24%', 'Líder de mercado a largo plazo'],
                ['Greit (G)',     '34.09%', 'Segunda posición estable'],
                ['Líder (L)',     '16.67%', 'Menor cuota de equilibrio'],
              ].map(([s, c, i]) => (
                <tr key={s}>
                  <td style={td}><strong>{s}</strong></td>
                  <td style={td}>{c}</td>
                  <td style={{ ...td, textAlign: 'left' }}>{i}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <BarrasEstado datos={[0.4924, 0.3409, 0.1667]} title="Estado estacionario (largo plazo)" />

        <div className="exec-conclusion">
          A largo plazo, <strong>Masxmenos consolidará el 49.24%</strong> del mercado de Limón,
          Greit el 34.09% y Líder el 16.67%, independientemente de la distribución inicial.
          Estas proporciones permanecen estables mientras no cambien las probabilidades de transición.
          Para que Líder mejore su posición, debe reducir su tasa de abandono (actualmente 25%).
        </div>
      </div>
    </div>
  )
}
