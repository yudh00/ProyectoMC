// Programacion.jsx — Sección B, Tema 2
// Ejercicio A: Programación Entera Pura (Taller Textil)
// Ejercicio B: Programación por Metas (Panadería La Espiga Dorada)
// Ejercicio C: Programación No Lineal (Fábrica A y B)
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

// ── SVG de región factible para P. Entera ───────────────────────────────────
function RegionFactibleSVG() {
  // Escala: x in [0,6], y in [0,6], lienzo 280x200
  const sx = (x) => 36 + x * 36
  const sy = (y) => 180 - y * 28

  // Vértices de la región factible
  const vertices = [
    [0, 0], [5.5, 0], [4, 3], [0, 5],
  ]
  const pts = vertices.map(([x, y]) => `${sx(x)},${sy(y)}`).join(' ')

  // Intersecciones de las rectas
  const lines = [
    { pts: [[0, 5], [10, 0]], label: 'R1 Tela', color: '#7dd3fc' },
    { pts: [[0, 11], [5.5, 0]], label: 'R2 Tiempo', color: '#a78bfa' },
    { pts: [[0, 9], [9, 0]], label: 'R3 Botones', color: '#f472b6' },
  ]

  return (
    <svg viewBox="0 0 280 210" width="100%" style={{ maxWidth: 280, display: 'block', margin: '0.5rem auto' }}>
      {/* Región factible */}
      <polygon points={pts} fill="var(--accent-soft)" stroke="none" />

      {/* Restricciones */}
      {lines.map(({ pts: lp, label, color }, i) => (
        <g key={i}>
          <line
            x1={sx(lp[0][0])} y1={sy(lp[0][1])}
            x2={sx(Math.min(lp[1][0], 7))} y2={sy(Math.max(lp[1][1], 0))}
            stroke={color} strokeWidth="1.5" strokeDasharray="4 2"
          />
          <text x={sx(lp[0][0]) + 4} y={sy(lp[0][1]) - 4} fontSize="8" fill={color}>{label}</text>
        </g>
      ))}

      {/* Ejes */}
      <line x1={36} y1={180} x2={250} y2={180} stroke="var(--border-color)" strokeWidth="1" />
      <line x1={36} y1={180} x2={36} y2={20} stroke="var(--border-color)" strokeWidth="1" />
      <text x={252} y={183} fontSize="9" fill="var(--muted-text)">x₁</text>
      <text x={30} y={18} fontSize="9" fill="var(--muted-text)">x₂</text>
      {[0, 1, 2, 3, 4, 5].map((n) => (
        <g key={n}>
          <text x={sx(n) - 3} y={195} fontSize="8" fill="var(--muted-text)">{n}</text>
          <text x={18} y={sy(n) + 3} fontSize="8" fill="var(--muted-text)">{n}</text>
        </g>
      ))}

      {/* Vértices y solución óptima */}
      {vertices.map(([x, y], i) => (
        <circle key={i} cx={sx(x)} cy={sy(y)} r={3} fill={x === 4 && y === 3 ? '#f472b6' : 'var(--accent)'} />
      ))}
      <circle cx={sx(4)} cy={sy(3)} r={5} fill="none" stroke="#f472b6" strokeWidth="2" />
      <text x={sx(4) + 6} y={sy(3) - 5} fontSize="9" fill="#f472b6" fontWeight="bold">Óptimo (4,3)</text>
    </svg>
  )
}

// ── EJERCICIO A — Programación Entera Pura ───────────────────────────────────
function EjercicioEntero() {
  return (
    <div>
      <div className="enunciado">
        <h4 className="exec-subtitle">Ejercicio A — Programación Entera Pura (Taller Textil)</h4>
        <p>
          Un taller textil confecciona <strong>camisas</strong> (<InlineMath math="x_1" />) y{' '}
          <strong>pantalones</strong> (<InlineMath math="x_2" />). Las cantidades deben ser enteras.
          Recursos disponibles por semana:
        </p>
        <div style={{ overflowX: 'auto', margin: '0.6rem 0' }}>
          <table style={{ borderCollapse: 'collapse', fontSize: '0.82rem' }}>
            <thead>
              <tr style={{ background: 'var(--surface-soft)' }}>
                <th style={th}>Recurso</th><th style={th}>Por camisa</th>
                <th style={th}>Por pantalón</th><th style={th}>Disponible</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Tela (m)', 1, 2, 10],
                ['Tiempo (h)', 2, 1, 11],
                ['Botones (cajas)', 1, 1, 9],
                ['Ganancia ($)', 60, 50, '—'],
              ].map(([r, a, b, d]) => (
                <tr key={r}>
                  <td style={td}>{r}</td>
                  <td style={td}>{a}</td>
                  <td style={td}>{b}</td>
                  <td style={td}>{d}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="solucion">
        <div className="formula-item">
          <span className="formula-label">Función Objetivo</span>
          <BlockMath math="\max Z = 60x_1 + 50x_2" />
        </div>
        <div className="formula-item">
          <span className="formula-label">Restricciones</span>
          <BlockMath math="\begin{cases} x_1 + 2x_2 \leq 10 & \text{(tela)}\\ 2x_1 + x_2 \leq 11 & \text{(tiempo)}\\ x_1 + x_2 \leq 9 & \text{(botones)}\\ x_1, x_2 \geq 0 \text{ y enteros} \end{cases}" />
        </div>

        <h4 className="exec-subtitle">Paso 4-5 — Región Factible y Vértices</h4>
        <RegionFactibleSVG />

        <p>Se evalúa <InlineMath math="Z" /> en cada vértice de la región factible:</p>
        <div style={{ overflowX: 'auto', margin: '0.6rem 0' }}>
          <table style={{ borderCollapse: 'collapse', fontSize: '0.82rem' }}>
            <thead>
              <tr style={{ background: 'var(--surface-soft)' }}>
                <th style={th}>Vértice</th><th style={th}><InlineMath math="Z = 60x_1 + 50x_2" /></th><th style={th}>Óptimo</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['(0, 0)', '$0', false],
                ['(5.5, 0)', '$330', false],
                ['(0, 5)', '$250', false],
                ['(4, 3)', '$390', true],
              ].map(([v, z, opt]) => (
                <tr key={v} style={{ background: opt ? 'var(--accent-soft)' : undefined }}>
                  <td style={td}>{v}</td>
                  <td style={td}>{z}</td>
                  <td style={td}>{opt ? '✓ Óptimo entero' : ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h4 className="exec-subtitle">Verificación de la solución (4, 3)</h4>
        <div style={{ overflowX: 'auto', margin: '0.6rem 0' }}>
          <table style={{ borderCollapse: 'collapse', fontSize: '0.82rem' }}>
            <thead>
              <tr style={{ background: 'var(--surface-soft)' }}>
                <th style={th}>Restricción</th><th style={th}>Cálculo</th><th style={th}>¿Cumple?</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Tela', '4 + 2(3) = 10 ≤ 10', '✓ (activa)'],
                ['Tiempo', '2(4) + 3 = 11 ≤ 11', '✓ (activa)'],
                ['Botones', '4 + 3 = 7 ≤ 9', '✓ (sobran 2)'],
              ].map(([r, c, ok]) => (
                <tr key={r}>
                  <td style={td}>{r}</td><td style={td}>{c}</td>
                  <td style={td} style={{ color: 'var(--accent)' }}>{ok}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="exec-conclusion">
          Producir <strong>4 camisas y 3 pantalones</strong> por semana.
          <BlockMath math="Z^* = 60(4) + 50(3) = 240 + 150 = \$390 \text{ por semana}" />
          La tela y el tiempo son los cuellos de botella (recursos activos); los botones tienen holgura de 2 cajas.
        </div>
      </div>
    </div>
  )
}

// ── EJERCICIO B — Programación por Metas ────────────────────────────────────
function EjercicioMetas() {
  return (
    <div>
      <div className="enunciado">
        <h4 className="exec-subtitle">Ejercicio B — Programación por Metas (Panadería La Espiga Dorada)</h4>
        <p>
          La panadería en Grecia, Alajuela produce pan artesanal (<InlineMath math="x" />) y
          repostería fina (<InlineMath math="y" />) con tres metas priorizadas:
        </p>
        <div style={{ overflowX: 'auto', margin: '0.6rem 0' }}>
          <table style={{ borderCollapse: 'collapse', fontSize: '0.82rem' }}>
            <thead>
              <tr style={{ background: 'var(--surface-soft)' }}>
                <th style={th}>Prioridad</th><th style={th}>Meta</th>
                <th style={th}>Objetivo</th><th style={th}>Desviación a minimizar</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['P1', 'Rentabilidad', '$2,200/semana', 'd₁⁻ (faltante de dinero)'],
                ['P2', 'Acuerdo laboral', '160 horas exactas', 'd₂⁻ y d₂⁺ (faltante y exceso)'],
                ['P3', 'Energía ambiental', '≤ 300 kWh', 'd₃⁺ (exceso de energía)'],
              ].map(([p, m, o, d]) => (
                <tr key={p}>
                  <td style={td}><strong>{p}</strong></td>
                  <td style={td}>{m}</td>
                  <td style={td}>{o}</td>
                  <td style={td}>{d}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ overflowX: 'auto', margin: '0.5rem 0' }}>
          <table style={{ borderCollapse: 'collapse', fontSize: '0.82rem' }}>
            <thead>
              <tr style={{ background: 'var(--surface-soft)' }}>
                <th style={th}>Producto</th><th style={th}>Variable</th>
                <th style={th}>Ganancia</th><th style={th}>Horas</th><th style={th}>Energía (kWh)</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Pan artesanal', 'x', '$30', '2 h', '5 kWh'],
                ['Repostería fina', 'y', '$50', '4 h', '8 kWh'],
              ].map(([p, v, g, h, e]) => (
                <tr key={p}>
                  <td style={td}>{p}</td><td style={td}>{v}</td>
                  <td style={td}>{g}</td><td style={td}>{h}</td><td style={td}>{e}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="solucion">
        <h4 className="exec-subtitle">Paso 5 — Restricciones por Metas</h4>
        <div className="formula-list">
          <div className="formula-item">
            <span className="formula-label">Meta 1 — Ganancia</span>
            <BlockMath math="30x + 50y + d_1^- - d_1^+ = 2200" />
          </div>
          <div className="formula-item">
            <span className="formula-label">Meta 2 — Horas laborales</span>
            <BlockMath math="2x + 4y + d_2^- - d_2^+ = 160" />
          </div>
          <div className="formula-item">
            <span className="formula-label">Meta 3 — Energía</span>
            <BlockMath math="5x + 8y + d_3^- - d_3^+ = 300" />
          </div>
          <div className="formula-item">
            <span className="formula-label">Función Objetivo</span>
            <BlockMath math="\min Z = P_1(d_1^-) + P_2(d_2^- + d_2^+) + P_3(d_3^+)" />
          </div>
        </div>

        <h4 className="exec-subtitle">Paso 7 — Solución por Sustitución</h4>
        <p>Asumiendo <InlineMath math="d_1^- = d_1^+ = d_2^- = d_2^+ = 0" /> (P1 y P2 cumplidas perfectamente):</p>
        <BlockMath math="\begin{cases} 30x + 50y = 2200 \\ 2x + 4y = 160 \end{cases} \Rightarrow \begin{cases} 3x + 5y = 220 \\ x + 2y = 80 \end{cases}" />
        <p>Despejando <InlineMath math="x = 80 - 2y" /> y sustituyendo:</p>
        <BlockMath math="3(80-2y)+5y=220 \;\Rightarrow\; 240-y=220 \;\Rightarrow\; y=20" />
        <BlockMath math="x = 80 - 2(20) = 40" />

        <h4 className="exec-subtitle">Evaluación frente a las 3 metas</h4>
        <div style={{ overflowX: 'auto', margin: '0.6rem 0' }}>
          <table style={{ borderCollapse: 'collapse', fontSize: '0.82rem' }}>
            <thead>
              <tr style={{ background: 'var(--surface-soft)' }}>
                <th style={th}>Meta</th><th style={th}>Cálculo</th>
                <th style={th}>Resultado</th><th style={th}>Desviación</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['P1 Ganancia', '30(40)+50(20)', '$2,200 ✓', 'd₁⁻=0 (cumplida)'],
                ['P2 Horas', '2(40)+4(20)', '160 h ✓', 'd₂⁻=d₂⁺=0 (cumplida)'],
                ['P3 Energía', '5(40)+8(20)', '360 kWh ✗', 'd₃⁺=60 kWh (exceso)'],
              ].map(([m, c, r, d]) => (
                <tr key={m} style={{ background: d.includes('exceso') ? 'rgba(248,113,113,0.08)' : 'var(--accent-soft)' }}>
                  <td style={td}><strong>{m}</strong></td>
                  <td style={td}>{c}</td>
                  <td style={td}>{r}</td>
                  <td style={td}>{d}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="exec-conclusion">
          Producir <strong>40 lotes de pan artesanal y 20 lotes de repostería</strong> por semana garantiza
          la rentabilidad ($2,200) y el acuerdo laboral (160 h). El modelo demuestra que cumplir P1 y P2
          genera un exceso inevitable de <strong>60 kWh</strong> sobre la meta ambiental (<InlineMath math="d_3^+ = 60" />).
        </div>
      </div>
    </div>
  )
}

// ── EJERCICIO C — Programación No Lineal ────────────────────────────────────
function EjercicioNoLineal() {
  return (
    <div>
      <div className="enunciado">
        <h4 className="exec-subtitle">Ejercicio C — Programación No Lineal</h4>
        <p>
          Una fábrica produce dos bienes A (<InlineMath math="x" />) y B (<InlineMath math="y" />)
          con ingresos de rendimiento decreciente. Se busca <strong>maximizar el beneficio total</strong>.
        </p>
        <div className="formula-list">
          <div className="formula-item">
            <span className="formula-label">Ingreso de A</span>
            <BlockMath math="I_A = 40x - x^2" />
          </div>
          <div className="formula-item">
            <span className="formula-label">Ingreso de B</span>
            <BlockMath math="I_B = 50y - 2y^2" />
          </div>
          <div className="formula-item">
            <span className="formula-label">Costos</span>
            <BlockMath math="C_A = 5x \quad C_B = 8y" />
          </div>
        </div>
        <div className="formula-item">
          <span className="formula-label">Restricciones</span>
          <BlockMath math="\begin{cases} 2x + 3y \leq 120 & \text{(horas máquina)}\\ x + 2y \leq 80 & \text{(materia prima)}\\ x,y \geq 0 \end{cases}" />
        </div>
      </div>

      <div className="solucion">
        <h4 className="exec-subtitle">Paso 1 — Función Objetivo</h4>
        <BlockMath math="Z(x,y) = (40x - x^2 - 5x) + (50y - 2y^2 - 8y) = 35x - x^2 + 42y - 2y^2" />

        <h4 className="exec-subtitle">Paso 2 — Derivadas Parciales e Igualación a Cero</h4>
        <p>Se separa la función en dos partes independientes y se deriva cada una:</p>
        <div className="formula-list">
          <div className="formula-item">
            <span className="formula-label">Derivada respecto a x</span>
            <BlockMath math="\frac{\partial Z}{\partial x} = 35 - 2x = 0 \;\Rightarrow\; x^* = \frac{35}{2} = 17.5" />
          </div>
          <div className="formula-item">
            <span className="formula-label">Derivada respecto a y</span>
            <BlockMath math="\frac{\partial Z}{\partial y} = 42 - 4y = 0 \;\Rightarrow\; y^* = \frac{42}{4} = 10.5" />
          </div>
        </div>

        <h4 className="exec-subtitle">Paso 3 — Verificación de Factibilidad</h4>
        <div style={{ overflowX: 'auto', margin: '0.6rem 0' }}>
          <table style={{ borderCollapse: 'collapse', fontSize: '0.82rem' }}>
            <thead>
              <tr style={{ background: 'var(--surface-soft)' }}>
                <th style={th}>Restricción</th><th style={th}>Evaluación</th><th style={th}>¿Cumple?</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Horas máquina', '2(17.5)+3(10.5)=35+31.5=66.5 ≤ 120', '✓'],
                ['Materia prima', '17.5+2(10.5)=17.5+21=38.5 ≤ 80', '✓'],
              ].map(([r, c, ok]) => (
                <tr key={r}>
                  <td style={td}>{r}</td>
                  <td style={td}>{c}</td>
                  <td style={td} style={{ color: 'var(--accent)' }}>{ok}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: '0.83rem' }}>El punto óptimo sin restricciones cumple todas las restricciones, por lo que es directamente la solución global.</p>

        <h4 className="exec-subtitle">Paso 4 — Cálculo de Z*</h4>
        <BlockMath math="Z^* = 35(17.5) - (17.5)^2 + 42(10.5) - 2(10.5)^2" />
        <BlockMath math="= 612.5 - 306.25 + 441 - 220.5 = \$526.75" />

        <div style={{ overflowX: 'auto', margin: '0.6rem 0' }}>
          <table style={{ borderCollapse: 'collapse', fontSize: '0.82rem' }}>
            <thead>
              <tr style={{ background: 'var(--surface-soft)' }}>
                <th style={th}>Concepto</th><th style={th}>Valor</th><th style={th}>Observación</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['x* (Producto A)', '17.5 u', 'Cantidad óptima continua'],
                ['y* (Producto B)', '10.5 u', 'Cantidad óptima continua'],
                ['Ingreso bruto A', '$612.50', '35(17.5)'],
                ['Ingreso bruto B', '$441.00', '42(10.5)'],
                ['Beneficio total Z*', '$526.75', 'Máximo alcanzable'],
                ['Horas máquina usadas', '66.5 / 120', 'Recurso no saturado'],
                ['Materia prima usada', '38.5 / 80', 'Recurso no saturado'],
              ].map(([c, v, o]) => (
                <tr key={c}>
                  <td style={td}>{c}</td><td style={td}>{v}</td><td style={td}>{o}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="exec-conclusion">
          Producir <strong>17.5 unidades de A y 10.5 unidades de B</strong> maximiza el beneficio total en
          <strong> $526.75</strong>. Ninguna restricción está activa, lo que indica que los recursos están
          holgados; el límite lo impone la <em>elasticidad de la demanda</em> (rendimiento decreciente), no la capacidad.
        </div>
      </div>
    </div>
  )
}

// ── Componente principal exportado ───────────────────────────────────────────
export default function Programacion() {
  return (
    <div style={{ display: 'grid', gap: '1.5rem' }}>
      <EjercicioEntero />
      <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)' }} />
      <EjercicioMetas />
      <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)' }} />
      <EjercicioNoLineal />
    </div>
  )
}
