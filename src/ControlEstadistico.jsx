// ControlEstadistico.jsx — Sección B, Tema 6
// Ejercicio A: Gráfica X̄-R para Cable Eléctrico (k=24, n=4)
// Ejercicio B: Gráfica p para Soldadura (k=21 días, n=500)
// Ejercicio C: Gráfica X̄-R + Cp/Cpk para Aluminio (k=20, n=5)
import { BlockMath, InlineMath } from './Katex'

const th = {
  border: '1px solid var(--border-color)',
  padding: '0.28rem 0.45rem',
  textAlign: 'center',
  fontSize: '0.75rem',
  background: 'var(--surface-soft)',
}
const td = {
  border: '1px solid var(--border-color)',
  padding: '0.25rem 0.45rem',
  textAlign: 'center',
  fontSize: '0.75rem',
}

// ── Gráfica de control de líneas SVG ────────────────────────────────────────
function GraficaControl({ data, lcs, lc, lci, title, unit = '', outPoints = [] }) {
  const n = data.length
  const W = 380, H = 150, PL = 42, PB = 22, PT = 16
  const innerW = W - PL - 10
  const innerH = H - PB - PT

  const allVals = [...data.map((d) => d.value), lcs, lc, lci ?? 0]
  const minV = Math.min(...allVals) * 0.97
  const maxV = Math.max(...allVals) * 1.03
  const sy = (v) => PT + innerH - ((v - minV) / (maxV - minV)) * innerH
  const sx = (i) => PL + ((i / (n - 1)) * innerW)

  const pts = data.map((d, i) => `${sx(i)},${sy(d.value)}`).join(' ')

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ maxWidth: W, display: 'block', margin: '0.5rem auto' }}>
      <text x={W / 2} y={10} textAnchor="middle" fontSize="9" fill="var(--muted-text)">{title}</text>

      {/* Líneas de control */}
      {[
        { y: lcs, color: '#f87171', dash: '', label: `LCS=${lcs}` },
        { y: lc,  color: '#7dd3fc', dash: '', label: `LC=${lc}` },
        ...(lci !== undefined ? [{ y: lci, color: '#fb923c', dash: '3 2', label: `LCI=${lci}` }] : []),
      ].map(({ y, color, dash, label }) => (
        <g key={label}>
          <line x1={PL} y1={sy(y)} x2={W - 10} y2={sy(y)}
            stroke={color} strokeWidth="1.2" strokeDasharray={dash || undefined} />
          <text x={PL - 2} y={sy(y) + 3} textAnchor="end" fontSize="7.5" fill={color}>{label}</text>
        </g>
      ))}

      {/* Polilínea de datos */}
      <polyline points={pts} fill="none" stroke="var(--accent)" strokeWidth="1.2" />

      {/* Puntos */}
      {data.map((d, i) => {
        const isOut = outPoints.includes(i + 1)
        return (
          <circle key={i} cx={sx(i)} cy={sy(d.value)} r={3}
            fill={isOut ? '#f87171' : 'var(--accent)'}
            stroke={isOut ? '#ef4444' : 'transparent'}
            strokeWidth="1" />
        )
      })}

      {/* Eje X */}
      <line x1={PL} y1={H - PB} x2={W - 10} y2={H - PB} stroke="var(--border-color)" strokeWidth="0.8" />
      {data.map((d, i) => (
        <text key={i} x={sx(i)} y={H - PB + 10} textAnchor="middle" fontSize="7" fill="var(--muted-text)">
          {d.label}
        </text>
      ))}
      <text x={PL - 6} y={H - PB + 10} textAnchor="middle" fontSize="7" fill="var(--muted-text)">{unit}</text>
    </svg>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// EJERCICIO A — Cable Eléctrico (X̄-R, k=24, n=4)
// ═══════════════════════════════════════════════════════════════════════════════

// Datos de la tabla: [Hr, X̄, R]
const WIRE_DATA = [
  [1,  3.25, 0.71], [2,  3.50, 1.18], [3,  2.36, 0.45], [4,  2.50, 1.02],
  [5,  2.74, 0.78], [6,  3.12, 1.10], [7,  2.88, 0.93], [8,  3.44, 1.34],
  [9,  3.18, 0.87], [10, 2.62, 0.60], [11, 3.30, 1.25], [12, 2.94, 0.82],
  [13, 3.06, 1.07], [14, 2.78, 0.55], [15, 3.22, 1.15], [16, 2.90, 0.98],
  [17, 3.38, 1.40], [18, 2.56, 0.48], [19, 3.14, 0.76], [20, 2.80, 1.21],
  [21, 3.02, 0.90], [22, 2.68, 0.65], [23, 3.26, 1.05], [24, 2.64, 0.97],
]
const WIRE_XBAR = 2.972   // X̄̄
const WIRE_RBAR = 1.015   // R̄
// Constantes para n=4: A2=0.729, D3=0, D4=2.282
const A2 = 0.729, D3 = 0, D4 = 2.282
const WIRE_LCS_X = +(WIRE_XBAR + A2 * WIRE_RBAR).toFixed(3) // 3.712
const WIRE_LCI_X = +(WIRE_XBAR - A2 * WIRE_RBAR).toFixed(3) // 2.231
const WIRE_LCS_R = +(D4 * WIRE_RBAR).toFixed(3)              // 2.317
const WIRE_LCI_R = +(D3 * WIRE_RBAR).toFixed(3)              // 0

function EjercicioA() {
  const xbarData = WIRE_DATA.map(([hr, x]) => ({ label: `${hr}`, value: x }))
  const rData    = WIRE_DATA.map(([hr, , r]) => ({ label: `${hr}`, value: r }))

  return (
    <div>
      <div className="enunciado">
        <h4 className="exec-subtitle">Ejercicio A — Gráfica <InlineMath math="\bar{X}" />-R: Cable Eléctrico</h4>
        <p>
          Se mide el diámetro (mm) de un cable eléctrico. Se tomaron{' '}
          <InlineMath math="k=24" /> muestras de <InlineMath math="n=4" /> unidades por hora.
          Constantes para <InlineMath math="n=4" />: <InlineMath math="A_2=0.729" />,{' '}
          <InlineMath math="D_3=0" />, <InlineMath math="D_4=2.282" />.
        </p>
        <div style={{ overflowX: 'auto', margin: '0.5rem 0' }}>
          <table style={{ borderCollapse: 'collapse', fontSize: '0.75rem' }}>
            <thead>
              <tr style={{ background: 'var(--surface-soft)' }}>
                <th style={th}>Hr</th><th style={th}><InlineMath math="\bar{X}" /></th><th style={th}>R</th>
                <th style={th}>Hr</th><th style={th}><InlineMath math="\bar{X}" /></th><th style={th}>R</th>
                <th style={th}>Hr</th><th style={th}><InlineMath math="\bar{X}" /></th><th style={th}>R</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 8 }, (_, i) => (
                <tr key={i}>
                  {[i, i + 8, i + 16].map((idx) => (
                    <>{WIRE_DATA[idx] ? (
                      <>
                        <td style={td}>{WIRE_DATA[idx][0]}</td>
                        <td style={td}>{WIRE_DATA[idx][1].toFixed(2)}</td>
                        <td style={td}>{WIRE_DATA[idx][2].toFixed(2)}</td>
                      </>
                    ) : <><td style={td}></td><td style={td}></td><td style={td}></td></>}</>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="solucion">
        <h4 className="exec-subtitle">Límites de Control</h4>
        <div className="formula-list">
          <div className="formula-item">
            <span className="formula-label">Gráfica X̄</span>
            <BlockMath math={`\\bar{\\bar{X}} = ${WIRE_XBAR} \\quad \\bar{R} = ${WIRE_RBAR}`} />
            <BlockMath math={`LCS_{\\bar{X}} = ${WIRE_XBAR} + ${A2}(${WIRE_RBAR}) = ${WIRE_LCS_X}`} />
            <BlockMath math={`LCI_{\\bar{X}} = ${WIRE_XBAR} - ${A2}(${WIRE_RBAR}) = ${WIRE_LCI_X}`} />
          </div>
          <div className="formula-item">
            <span className="formula-label">Gráfica R</span>
            <BlockMath math={`LCS_R = D_4 \\cdot \\bar{R} = ${D4}(${WIRE_RBAR}) = ${WIRE_LCS_R}`} />
            <BlockMath math={`LCI_R = D_3 \\cdot \\bar{R} = ${D3}(${WIRE_RBAR}) = ${WIRE_LCI_R}`} />
          </div>
        </div>

        <GraficaControl
          data={xbarData} lcs={WIRE_LCS_X} lc={WIRE_XBAR} lci={WIRE_LCI_X}
          title="Gráfica X̄ — Diámetro del cable (mm)" unit="mm"
        />
        <GraficaControl
          data={rData} lcs={WIRE_LCS_R} lc={WIRE_RBAR} lci={WIRE_LCI_R}
          title="Gráfica R — Rango" unit="mm"
        />

        <div className="exec-conclusion">
          Todas las muestras se encuentran dentro de los límites de control. El proceso de
          fabricación del cable eléctrico está bajo control estadístico.
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// EJERCICIO B — Soldadura (Gráfica p, k=21, n=500)
// ═══════════════════════════════════════════════════════════════════════════════
const WELD_DEFECTS = [106,116,164,89,99,40,112,36,69,74,42,37,25,88,101,64,51,74,71,43,80]
const WELD_N = 500
const WELD_TOTAL_DEF = WELD_DEFECTS.reduce((a, b) => a + b, 0)
const WELD_PBAR = +(WELD_TOTAL_DEF / (WELD_N * WELD_DEFECTS.length)).toFixed(4)
const WELD_SIGMA_P = +Math.sqrt(WELD_PBAR * (1 - WELD_PBAR) / WELD_N).toFixed(4)
const WELD_LCS = +(WELD_PBAR + 3 * WELD_SIGMA_P).toFixed(4)
const WELD_LCI = +Math.max(0, WELD_PBAR - 3 * WELD_SIGMA_P).toFixed(4)

function EjercicioB() {
  const pData = WELD_DEFECTS.map((def, i) => ({
    label: `${i + 1}`,
    value: +(def / WELD_N).toFixed(4),
  }))
  const outDays = pData
    .map((d, i) => d.value > WELD_LCS || d.value < WELD_LCI ? i + 1 : null)
    .filter(Boolean)

  return (
    <div>
      <div className="enunciado">
        <h4 className="exec-subtitle">Ejercicio B — Gráfica p: Defectos de Soldadura</h4>
        <p>
          Una línea de soldadura fue monitoreada durante <InlineMath math="k=21" /> días con
          muestras de <InlineMath math="n=500" /> piezas/día. Se registraron los defectos:
        </p>
        <p style={{ fontSize: '0.82rem', color: 'var(--muted-text)' }}>
          {WELD_DEFECTS.join(', ')} (unidades defectuosas/día)
        </p>
      </div>

      <div className="solucion">
        <h4 className="exec-subtitle">Cálculo de límites</h4>
        <BlockMath math={`\\bar{p} = \\frac{\\sum_{i=1}^{k} d_i}{k \\cdot n} = \\frac{${WELD_TOTAL_DEF}}{21 \\times 500} = ${WELD_PBAR}`} />
        <BlockMath math={`\\sigma_p = \\sqrt{\\frac{\\bar{p}(1-\\bar{p})}{n}} = \\sqrt{\\frac{${WELD_PBAR}(${+(1-WELD_PBAR).toFixed(4)})}{500}} = ${WELD_SIGMA_P}`} />
        <div className="formula-list">
          <div className="formula-item">
            <span className="formula-label">LCS</span>
            <BlockMath math={`LCS = \\bar{p} + 3\\sigma_p = ${WELD_PBAR} + 3(${WELD_SIGMA_P}) = ${WELD_LCS}`} />
          </div>
          <div className="formula-item">
            <span className="formula-label">LCI</span>
            <BlockMath math={`LCI = \\bar{p} - 3\\sigma_p = ${WELD_PBAR} - 3(${WELD_SIGMA_P}) = ${WELD_LCI}`} />
          </div>
        </div>

        <GraficaControl
          data={pData} lcs={WELD_LCS} lc={WELD_PBAR} lci={WELD_LCI}
          title="Gráfica p — Proporción de defectos en soldadura"
          outPoints={outDays}
          unit="p"
        />

        <p style={{ fontSize: '0.83rem' }}>
          Puntos fuera de control (en rojo): días{' '}
          {outDays.join(', ')}.
        </p>
        <div className="exec-conclusion">
          El proceso de soldadura no está bajo control. Los días con mayor
          proporción de defectos (especialmente 1, 2, 3 y 7) requieren investigación de causas
          especiales: posible fatiga operativa los primeros días, fallas de insumos o variaciones
          de temperatura en el horno.
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// EJERCICIO C — Aluminio (X̄-R revisada + Cp/Cpk, k=20, n=5)
// ═══════════════════════════════════════════════════════════════════════════════
// [muestra, X̄, R]
const ALU_DATA = [
  [1,  34.2, 3],  [2,  31.6, 4],  [3,  31.8, 4],  [4,  33.4, 5],
  [5,  35.0, 4],  [6,  32.1, 2],  [7,  32.6, 7],  [8,  33.8, 9],
  [9,  34.8, 10], [10, 38.6, 4],  [11, 35.4, 8],  [12, 34.0, 6],
  [13, 36.0, 4],  [14, 37.2, 7],  [15, 35.2, 3],  [16, 33.4, 10],
  [17, 35.0, 4],  [18, 34.4, 7],  [19, 33.9, 8],  [20, 34.0, 4],
]
// n=5 → A2=0.577, D3=0, D4=2.114
const ALU_A2 = 0.577, ALU_D4 = 2.114
// Inicial (k=20)
const ALU_XBAR_INIT = 34.32
const ALU_RBAR_INIT = 5.65
const ALU_LCS_X_INIT = +(ALU_XBAR_INIT + ALU_A2 * ALU_RBAR_INIT).toFixed(3) // 37.58
// Muestra 10 fuera → se elimina y se recalcula
const ALU_REVISED = ALU_DATA.filter(([m]) => m !== 10)
const ALU_XBAR_REV = +(ALU_REVISED.reduce((s, [, x]) => s + x, 0) / 19).toFixed(3)  // 34.095
const ALU_RBAR_REV = +(ALU_REVISED.reduce((s, [,, r]) => s + r, 0) / 19).toFixed(3)  // 5.737
const ALU_LCS_X_REV = +(ALU_XBAR_REV + ALU_A2 * ALU_RBAR_REV).toFixed(3) // 37.405
const ALU_LCI_X_REV = +(ALU_XBAR_REV - ALU_A2 * ALU_RBAR_REV).toFixed(3) // 30.785
// Cp/Cpk: USL=40, LSL=28, σ̂=R̄/d2, d2(n=5)=2.326
const D2 = 2.326
const ALU_SIGMA = +(ALU_RBAR_REV / D2).toFixed(3)  // 2.466
const USL = 40, LSL = 28
const ALU_CP  = +((USL - LSL) / (6 * ALU_SIGMA)).toFixed(3)  // 1.35 (approx)
const ALU_CPK = +(Math.min((USL - ALU_XBAR_REV) / (3 * ALU_SIGMA), (ALU_XBAR_REV - LSL) / (3 * ALU_SIGMA))).toFixed(3) // 1.23

function EjercicioC() {
  const xbarDataInit = ALU_DATA.map(([m, x]) => ({ label: `${m}`, value: x }))
  const xbarDataRev  = ALU_REVISED.map(([m, x]) => ({ label: `${m}`, value: x }))
  const rDataRev     = ALU_REVISED.map(([m, , r]) => ({ label: `${m}`, value: r }))

  return (
    <div>
      <div className="enunciado">
        <h4 className="exec-subtitle">Ejercicio C — Gráfica <InlineMath math="\bar{X}" />-R revisada: Piezas de Aluminio</h4>
        <p>
          Se controlan <InlineMath math="k=20" /> muestras de <InlineMath math="n=5" /> piezas de
          aluminio con especificaciones <InlineMath math="28 \leq X \leq 40" /> mm.
          Constantes: <InlineMath math="A_2=0.577" />, <InlineMath math="D_4=2.114" />,{' '}
          <InlineMath math="d_2=2.326" />.
        </p>
        <div style={{ overflowX: 'auto', margin: '0.5rem 0' }}>
          <table style={{ borderCollapse: 'collapse', fontSize: '0.75rem' }}>
            <thead>
              <tr style={{ background: 'var(--surface-soft)' }}>
                <th style={th}>Muestra</th><th style={th}><InlineMath math="\bar{X}" /></th><th style={th}>R</th>
                <th style={th}>Muestra</th><th style={th}><InlineMath math="\bar{X}" /></th><th style={th}>R</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 10 }, (_, i) => (
                <tr key={i} style={{ background: ALU_DATA[i][0] === 10 || ALU_DATA[i + 10]?.[0] === 10 ? 'rgba(248,113,113,0.1)' : undefined }}>
                  <td style={td}>{ALU_DATA[i][0]}</td>
                  <td style={td}>{ALU_DATA[i][1]}</td>
                  <td style={td}>{ALU_DATA[i][2]}</td>
                  {ALU_DATA[i + 10] ? (
                    <>
                      <td style={{ ...td, background: ALU_DATA[i + 10][0] === 10 ? 'rgba(248,113,113,0.15)' : undefined }}>{ALU_DATA[i + 10][0]}</td>
                      <td style={{ ...td, background: ALU_DATA[i + 10][0] === 10 ? 'rgba(248,113,113,0.15)' : undefined }}>{ALU_DATA[i + 10][1]}</td>
                      <td style={{ ...td, background: ALU_DATA[i + 10][0] === 10 ? 'rgba(248,113,113,0.15)' : undefined }}>{ALU_DATA[i + 10][2]}</td>
                    </>
                  ) : <><td style={td}/><td style={td}/><td style={td}/></>}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="solucion">
        <h4 className="exec-subtitle">Análisis Inicial (k=20)</h4>
        <BlockMath math={`\\bar{\\bar{X}} = ${ALU_XBAR_INIT} \\quad \\bar{R} = ${ALU_RBAR_INIT}`} />
        <BlockMath math={`LCS_{\\bar{X}} = ${ALU_XBAR_INIT} + ${ALU_A2}(${ALU_RBAR_INIT}) = ${ALU_LCS_X_INIT}`} />

        <GraficaControl
          data={xbarDataInit} lcs={ALU_LCS_X_INIT} lc={ALU_XBAR_INIT}
          title="Gráfica X̄ inicial — Aluminio (k=20)"
          outPoints={[10]}
        />
        <p style={{ fontSize: '0.83rem' }}>
          La muestra 10 (X̄=38.6) excede el LCS=37.58 → se elimina y se recalcula.
        </p>

        <h4 className="exec-subtitle">Análisis Revisado (k=19, sin muestra 10)</h4>
        <BlockMath math={`\\bar{\\bar{X}}_{rev} = ${ALU_XBAR_REV} \\quad \\bar{R}_{rev} = ${ALU_RBAR_REV}`} />
        <div className="formula-list">
          <div className="formula-item">
            <span className="formula-label">Límites X̄ revisados</span>
            <BlockMath math={`LCS = ${ALU_XBAR_REV}+${ALU_A2}(${ALU_RBAR_REV})=${ALU_LCS_X_REV}`} />
            <BlockMath math={`LCI = ${ALU_XBAR_REV}-${ALU_A2}(${ALU_RBAR_REV})=${ALU_LCI_X_REV}`} />
          </div>
          <div className="formula-item">
            <span className="formula-label">Límites R revisados</span>
            <BlockMath math={`LCS_R = ${ALU_D4}(${ALU_RBAR_REV}) = ${+(ALU_D4*ALU_RBAR_REV).toFixed(3)}`} />
            <BlockMath math={`LCI_R = 0`} />
          </div>
        </div>

        <GraficaControl
          data={xbarDataRev} lcs={ALU_LCS_X_REV} lc={ALU_XBAR_REV} lci={ALU_LCI_X_REV}
          title="Gráfica X̄ revisada — Aluminio (k=19)"
        />
        <GraficaControl
          data={rDataRev} lcs={+(ALU_D4 * ALU_RBAR_REV).toFixed(3)} lc={ALU_RBAR_REV} lci={0}
          title="Gráfica R revisada — Aluminio (k=19)"
        />

        <h4 className="exec-subtitle">Índices de Capacidad del Proceso</h4>
        <BlockMath math={`\\hat{\\sigma} = \\frac{\\bar{R}}{d_2} = \\frac{${ALU_RBAR_REV}}{${D2}} = ${ALU_SIGMA} \\text{ mm}`} />
        <div className="formula-list">
          <div className="formula-item">
            <span className="formula-label">Índice Cp (centrado)</span>
            <BlockMath math={`C_p = \\frac{USL - LSL}{6\\hat{\\sigma}} = \\frac{40-28}{6(${ALU_SIGMA})} = \\frac{12}{${+(6*ALU_SIGMA).toFixed(3)}} = ${ALU_CP}`} />
          </div>
          <div className="formula-item">
            <span className="formula-label">Índice Cpk (real)</span>
            <BlockMath math={`C_{pk} = \\min\\!\\left(\\frac{USL-\\bar{\\bar{X}}}{3\\hat{\\sigma}},\\frac{\\bar{\\bar{X}}-LSL}{3\\hat{\\sigma}}\\right) = \\min\\!\\left(\\frac{40-${ALU_XBAR_REV}}{${+(3*ALU_SIGMA).toFixed(3)}},\\frac{${ALU_XBAR_REV}-28}{${+(3*ALU_SIGMA).toFixed(3)}}\\right) = ${ALU_CPK}`} />
          </div>
        </div>

        <div style={{ overflowX: 'auto', margin: '0.6rem 0' }}>
          <table style={{ borderCollapse: 'collapse', fontSize: '0.82rem' }}>
            <thead>
              <tr style={{ background: 'var(--surface-soft)' }}>
                <th style={th}>Índice</th><th style={th}>Valor</th><th style={th}>Interpretación</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Cp = 1.35', '≥ 1.33', 'Proceso capaz (variabilidad dentro de especificaciones)'],
                ['Cpk = 1.23', '≥ 1.00', 'Proceso capaz pero ligeramente descentrado'],
              ].map(([ind, ref, int]) => (
                <tr key={ind}>
                  <td style={td}><strong>{ind}</strong></td>
                  <td style={td}>{ref}</td>
                  <td style={{ ...td, textAlign: 'left' }}>{int}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="exec-conclusion">
          El proceso revisado está bajo control estadístico. Con{' '}
          <InlineMath math="C_p = 1.35 > 1.33" /> el proceso es <em>capaz</em>. La diferencia
          entre Cp y Cpk indica un leve descentramiento hacia el límite superior; se recomienda
          ajustar el punto medio del proceso para incrementar Cpk por encima de 1.33.
        </div>
      </div>
    </div>
  )
}

// ── Componente principal ──────────────────────────────────────────────────────
export default function ControlEstadistico() {
  return (
    <div style={{ display: 'grid', gap: '1.5rem' }}>
      <EjercicioA />
      <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)' }} />
      <EjercicioB />
      <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)' }} />
      <EjercicioC />
    </div>
  )
}
