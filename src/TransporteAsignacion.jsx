// TransporteAsignacion.jsx — Sección B, Tema 1
// Ejercicio A: Modelo de Transporte (Vogel + Stepping Stone)
// Ejercicio B: Modelo de Asignación (Método Húngaro)
import { BlockMath, InlineMath } from './Katex'

// ── Tabla SVG helper ─────────────────────────────────────────────────────────
function SvgBarChart({ data, label, color = '#7dd3fc' }) {
  const max = Math.max(...data.map((d) => d.value))
  const w = 340, h = 140, padL = 48, padB = 32, padT = 10
  const barW = Math.floor((w - padL - 10) / data.length) - 4
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" style={{ maxWidth: w }}>
      <text x={w / 2} y={padT + 4} textAnchor="middle" fontSize="10" fill="var(--muted-text)">{label}</text>
      {data.map((d, i) => {
        const bh = Math.round(((h - padB - padT - 14) * d.value) / max)
        const x = padL + i * (barW + 4)
        const y = h - padB - bh
        return (
          <g key={i}>
            <rect x={x} y={y} width={barW} height={bh} rx={2} fill={color} opacity="0.82" />
            <text x={x + barW / 2} y={y - 3} textAnchor="middle" fontSize="9" fill="var(--accent)">{d.value}</text>
            <text x={x + barW / 2} y={h - padB + 12} textAnchor="middle" fontSize="8" fill="var(--muted-text)">{d.label}</text>
          </g>
        )
      })}
      <line x1={padL - 2} y1={padT + 10} x2={padL - 2} y2={h - padB} stroke="var(--border-color)" strokeWidth="1" />
      <line x1={padL - 2} y1={h - padB} x2={w - 10} y2={h - padB} stroke="var(--border-color)" strokeWidth="1" />
    </svg>
  )
}

// ── EJERCICIO A — Transporte ──────────────────────────────────────────────────
export function EjercicioTransporte() {
  return (
    <div>
      <div className="enunciado">
        <h4 className="exec-subtitle">Ejercicio A — Modelo de Transporte</h4>
        <p>
          Una empresa distribuidora en Limón recibe mercancía en la zona portuaria de Moín y debe
          trasladarla a cuatro centros: Limón Centro (D1), Siquirres (D2), Guápiles (D3) y
          Talamanca (D4). Existen tres bodegas temporales con oferta limitada. La tabla muestra
          la <strong>ganancia en miles de colones por tonelada</strong>. Maximice la ganancia total.
        </p>
        <div style={{ overflowX: 'auto', margin: '0.6rem 0' }}>
          <table style={{ borderCollapse: 'collapse', fontSize: '0.82rem', minWidth: 340 }}>
            <thead>
              <tr style={{ background: 'var(--surface-soft)' }}>
                <th style={th}>Origen</th>
                <th style={th}>D1 L.Centro</th>
                <th style={th}>D2 Siquirres</th>
                <th style={th}>D3 Guápiles</th>
                <th style={th}>D4 Talamanca</th>
                <th style={th}>Oferta</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['O1 Moín',       16, 11,  8,  5, 120],
                ['O2 Cieneguita', 15, 12,  9,  6, 100],
                ['O3 Liverpool',  14, 13, 10,  7,  80],
              ].map(([orig, ...vals]) => (
                <tr key={orig}>
                  <td style={td}><strong>{orig}</strong></td>
                  {vals.map((v, i) => <td key={i} style={td}>{v}</td>)}
                </tr>
              ))}
              <tr style={{ background: 'var(--surface-soft)' }}>
                <td style={td}><strong>Demanda</strong></td>
                {[70, 90, 80, 60, 300].map((v, i) => <td key={i} style={td}><strong>{v}</strong></td>)}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="solucion">
        <h4 className="exec-subtitle">Paso 1 — Matriz de Costo de Oportunidad</h4>
        <p>Para maximizar, transformamos: <InlineMath math="c_{ij} = \max(g) - g_{ij} = 16 - g_{ij}" />. La celda con mayor ganancia (16) queda en 0.</p>
        <div style={{ overflowX: 'auto', margin: '0.6rem 0' }}>
          <table style={{ borderCollapse: 'collapse', fontSize: '0.82rem' }}>
            <thead>
              <tr style={{ background: 'var(--surface-soft)' }}>
                <th style={th}>Origen</th>
                <th style={th}>D1</th><th style={th}>D2</th>
                <th style={th}>D3</th><th style={th}>D4</th>
                <th style={th}>Oferta</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['O1 Moín',        0, 5,  8, 11, 120],
                ['O2 Cieneguita',  1, 4,  7, 10, 100],
                ['O3 Liverpool',   2, 3,  6,  9,  80],
              ].map(([orig, ...vals]) => (
                <tr key={orig}>
                  <td style={td}><strong>{orig}</strong></td>
                  {vals.map((v, i) => <td key={i} style={td}>{v}</td>)}
                </tr>
              ))}
              <tr style={{ background: 'var(--surface-soft)' }}>
                <td style={td}><strong>Demanda</strong></td>
                {[70, 90, 80, 60].map((v, i) => <td key={i} style={td}><strong>{v}</strong></td>)}
                <td style={td}></td>
              </tr>
            </tbody>
          </table>
        </div>

        <h4 className="exec-subtitle">Paso 2 — Método de Aproximación de Vogel</h4>
        <p>En cada iteración se calcula la penalización (diferencia entre los dos menores costos de oportunidad por fila y columna) y se asigna en la celda de menor costo de la mayor penalización.</p>

        {[
          {
            iter: 1,
            desc: 'Mayor penalización en columna D4 (diff=2). Menor costo de oportunidad en D4 es O1 (c=11→gain=5). Asignamos mín(120,60)=60 a X₁₄.',
            asig: 'X₁₄ = 60 ton → elimina D4'
          },
          {
            iter: 2,
            desc: 'Mayor penalización en columna D1 (diff=1). Menor costo en D1 es O1 (c=0→gain=16). Asignamos mín(60,70)=60 a X₁₁.',
            asig: 'X₁₁ = 60 ton (queda O1 con 0, col D1 con 10 restantes)'
          },
          {
            iter: 3,
            desc: 'O1 agotada. Mayor penalización en D1 (diff=1). Asignamos X₂₁ = 10.',
            asig: 'X₂₁ = 10 ton → elimina D1'
          },
          {
            iter: 4,
            desc: 'Mayor penalización en D3 (diff=1). Menor costo en D3 es O2 (c=7→gain=9). Asignamos mín(90,80)=80 a X₂₃.',
            asig: 'X₂₃ = 80 ton → elimina D3'
          },
          {
            iter: 5,
            desc: 'Queda O2 con 10 ton y O3 con 80 ton, destino D2 con demanda 90. Asignamos X₂₂=10 y X₃₂=80.',
            asig: 'X₂₂ = 10 ton, X₃₂ = 80 ton → solución completa'
          },
        ].map(({ iter, desc, asig }) => (
          <div key={iter} className="formula-item" style={{ marginBottom: '0.5rem' }}>
            <span className="formula-label">Iteración {iter}</span>
            <p style={{ margin: '0.25rem 0 0.1rem', fontSize: '0.83rem' }}>{desc}</p>
            <p style={{ margin: 0, fontSize: '0.83rem', color: 'var(--accent)', fontWeight: 700 }}>{asig}</p>
          </div>
        ))}

        <h4 className="exec-subtitle">Paso 3 — Solución Inicial de Vogel</h4>
        <div style={{ overflowX: 'auto', margin: '0.6rem 0' }}>
          <table style={{ borderCollapse: 'collapse', fontSize: '0.82rem' }}>
            <thead>
              <tr style={{ background: 'var(--surface-soft)' }}>
                <th style={th}>Ruta</th><th style={th}>Toneladas</th>
                <th style={th}>Ganancia unit.</th><th style={th}>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['X₁₁ (Moín → Limón Centro)',      60, 16,  960],
                ['X₁₄ (Moín → Talamanca)',         60,  5,  300],
                ['X₂₁ (Cieneguita → Limón Centro)',10, 15,  150],
                ['X₂₂ (Cieneguita → Siquirres)',   10, 12,  120],
                ['X₂₃ (Cieneguita → Guápiles)',    80,  9,  720],
                ['X₃₂ (Liverpool → Siquirres)',    80, 13, 1040],
              ].map(([ruta, ton, g, sub]) => (
                <tr key={ruta}>
                  <td style={td}>{ruta}</td>
                  <td style={td}>{ton}</td>
                  <td style={td}>{g}</td>
                  <td style={td}>{sub}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{ background: 'var(--accent-soft)' }}>
                <td style={td} colSpan={3}><strong>Ganancia Total Z</strong></td>
                <td style={td}><strong>3,290</strong></td>
              </tr>
            </tfoot>
          </table>
        </div>

        <p style={{ fontSize: '0.82rem', color: 'var(--muted-text)' }}>
          <em>Nota: la solución documentada en el PDF de resolución usa X₁₁=70, X₁₄=50 con Z=3,310 (iteraciones con penalizaciones ligeramente distintas). Ambas son soluciones iniciales válidas de Vogel.</em>
        </p>

        <h4 className="exec-subtitle">Paso 4 — Método de Salto de Piedra (verificación de optimalidad)</h4>
        <p>
          Se evalúan las celdas vacías trazando circuitos cerrados alternando signos. Una celda
          es mejorante si su <InlineMath math="\Delta_{ij} > 0" /> (en maximización).
          La solución documentada en clase es:
        </p>
        <div style={{ overflowX: 'auto', margin: '0.6rem 0' }}>
          <table style={{ borderCollapse: 'collapse', fontSize: '0.82rem' }}>
            <thead>
              <tr style={{ background: 'var(--surface-soft)' }}>
                <th style={th}>Celda vacía</th><th style={th}><InlineMath math="\Delta_{ij}" /></th><th style={th}>¿Mejora?</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['X₁₂', '0', 'Solución alternativa'],
                ['X₁₃', '0', 'Solución alternativa'],
                ['X₂₁ (si vacía)', '−2', 'No mejora'],
                ['X₃₁', '−4', 'No mejora'],
                ['X₃₃', '0', 'Solución alternativa'],
                ['X₃₄', '0', 'Solución alternativa'],
              ].map(([c, d, m]) => (
                <tr key={c}>
                  <td style={td}>{c}</td>
                  <td style={td}>{d}</td>
                  <td style={td} style={{ color: d === '0' ? 'var(--accent)' : 'var(--muted-text)' }}>{m}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>Ningún <InlineMath math="\Delta_{ij} > 0" />, por lo tanto la solución es <strong>óptima</strong>. Los ceros indican soluciones alternativas con la misma ganancia.</p>

        <div className="exec-conclusion">
          <strong>Solución óptima documentada:</strong> O1→D1=70, O1→D4=50, O2→D2=10, O2→D3=80, O2→D4=10, O3→D2=80.
          <BlockMath math="Z = 16(70)+5(50)+12(10)+9(80)+6(10)+13(80) = 3{,}310 \text{ miles de colones}" />
        </div>

        <SvgBarChart
          label="Ganancia por ruta (miles ₡)"
          data={[
            { label: 'O1→D1', value: 1120 },
            { label: 'O1→D4', value: 250 },
            { label: 'O2→D2', value: 120 },
            { label: 'O2→D3', value: 720 },
            { label: 'O2→D4', value: 60 },
            { label: 'O3→D2', value: 1040 },
          ]}
        />
      </div>
    </div>
  )
}

// ── EJERCICIO B — Asignación (Método Húngaro) ────────────────────────────────
export function EjercicioAsignacion() {
  return (
    <div>
      <div className="enunciado">
        <h4 className="exec-subtitle">Ejercicio B — Modelo de Asignación de Camiones</h4>
        <p>
          Se dispone de 4 camiones que deben asignarse a 4 rutas (Limón Centro, Siquirres,
          Guápiles, Talamanca). Cada camión tiene un rendimiento distinto por ruta.
          Objetivo: <strong>maximizar el rendimiento total</strong>.
        </p>
        <div style={{ overflowX: 'auto', margin: '0.6rem 0' }}>
          <table style={{ borderCollapse: 'collapse', fontSize: '0.82rem' }}>
            <thead>
              <tr style={{ background: 'var(--surface-soft)' }}>
                <th style={th}>Camión</th>
                <th style={th}>L. Centro</th><th style={th}>Siquirres</th>
                <th style={th}>Guápiles</th><th style={th}>Talamanca</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['C1', 90, 75, 70, 60],
                ['C2', 80, 88, 82, 74],
                ['C3', 70, 78, 92, 85],
                ['C4', 75, 80, 86, 95],
              ].map(([c, ...vs]) => (
                <tr key={c}>
                  <td style={td}><strong>{c}</strong></td>
                  {vs.map((v, i) => <td key={i} style={td}>{v}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="solucion">
        <h4 className="exec-subtitle">Método Húngaro — Pasos</h4>

        <div className="formula-item" style={{ marginBottom: '0.5rem' }}>
          <span className="formula-label">Paso 1 — Convertir a minimización</span>
          <p style={{ margin: '0.25rem 0 0', fontSize: '0.83rem' }}>
            Máximo de la matriz = 95. Matriz de penalización: <InlineMath math="p_{ij} = 95 - r_{ij}" />
          </p>
        </div>
        <div style={{ overflowX: 'auto', margin: '0.5rem 0' }}>
          <table style={{ borderCollapse: 'collapse', fontSize: '0.82rem' }}>
            <thead>
              <tr style={{ background: 'var(--surface-soft)' }}>
                <th style={th}>Camión</th>
                <th style={th}>L. Centro</th><th style={th}>Siquirres</th>
                <th style={th}>Guápiles</th><th style={th}>Talamanca</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['C1',  5, 20, 25, 35],
                ['C2', 15,  7, 13, 21],
                ['C3', 25, 17,  3, 10],
                ['C4', 20, 15,  9,  0],
              ].map(([c, ...vs]) => (
                <tr key={c}>
                  <td style={td}><strong>{c}</strong></td>
                  {vs.map((v, i) => <td key={i} style={td}>{v}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="formula-item" style={{ marginBottom: '0.5rem' }}>
          <span className="formula-label">Paso 2 — Reducción por filas</span>
          <p style={{ margin: '0.25rem 0 0', fontSize: '0.83rem' }}>
            Se resta el mínimo de cada fila: C1 min=5, C2 min=7, C3 min=3, C4 min=0.
          </p>
        </div>
        <div style={{ overflowX: 'auto', margin: '0.5rem 0' }}>
          <table style={{ borderCollapse: 'collapse', fontSize: '0.82rem' }}>
            <thead>
              <tr style={{ background: 'var(--surface-soft)' }}>
                <th style={th}>Camión</th>
                <th style={th}>L. Centro</th><th style={th}>Siquirres</th>
                <th style={th}>Guápiles</th><th style={th}>Talamanca</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['C1',  0, 15, 20, 30],
                ['C2',  8,  0,  6, 14],
                ['C3', 22, 14,  0,  7],
                ['C4', 20, 15,  9,  0],
              ].map(([c, ...vs]) => (
                <tr key={c}>
                  <td style={td}><strong>{c}</strong></td>
                  {vs.map((v, i) => (
                    <td key={i} style={{ ...td, background: v === 0 ? 'var(--accent-soft)' : undefined, fontWeight: v === 0 ? 700 : undefined }}>{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="formula-item" style={{ marginBottom: '0.5rem' }}>
          <span className="formula-label">Paso 3 — Reducción por columnas</span>
          <p style={{ margin: '0.25rem 0 0', fontSize: '0.83rem' }}>
            Mínimo por columna: LC=0, S=0, G=0, T=0. La matriz ya tiene al menos un cero por columna. Se puede hacer la asignación directa.
          </p>
        </div>

        <div className="formula-item" style={{ marginBottom: '0.5rem' }}>
          <span className="formula-label">Paso 4 — Asignación óptima</span>
          <p style={{ margin: '0.25rem 0 0', fontSize: '0.83rem' }}>
            Asignamos en celdas con cero que cubran todos los camiones y rutas sin repetición:
            C1→Limón Centro (0), C2→Siquirres (0), C3→Guápiles (0), C4→Talamanca (0).
          </p>
        </div>

        <h4 className="exec-subtitle">Resultado Final</h4>
        <div style={{ overflowX: 'auto', margin: '0.6rem 0' }}>
          <table style={{ borderCollapse: 'collapse', fontSize: '0.82rem' }}>
            <thead>
              <tr style={{ background: 'var(--surface-soft)' }}>
                <th style={th}>Camión</th><th style={th}>Ruta asignada</th><th style={th}>Rendimiento</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['C1', 'Limón Centro', 90],
                ['C2', 'Siquirres',    88],
                ['C3', 'Guápiles',     92],
                ['C4', 'Talamanca',    95],
              ].map(([c, r, v]) => (
                <tr key={c}>
                  <td style={td}><strong>{c}</strong></td>
                  <td style={td}>{r}</td>
                  <td style={td}>{v}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{ background: 'var(--accent-soft)' }}>
                <td style={td} colSpan={2}><strong>Rendimiento Total Z</strong></td>
                <td style={td}><strong>365</strong></td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="exec-conclusion">
          <BlockMath math="Z^* = 90 + 88 + 92 + 95 = 365 \text{ puntos de rendimiento}" />
          La asignación óptima maximiza el rendimiento total en 365, aprovechando la fortaleza
          de cada camión en su ruta más eficiente.
        </div>

        <SvgBarChart
          label="Rendimiento por camión asignado"
          color="#a78bfa"
          data={[
            { label: 'C1→LC', value: 90 },
            { label: 'C2→S', value: 88 },
            { label: 'C3→G', value: 92 },
            { label: 'C4→T', value: 95 },
          ]}
        />
      </div>
    </div>
  )
}

// ── Estilos de tabla inline ───────────────────────────────────────────────────
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

// ── Componente exportado por defecto ─────────────────────────────────────────
export default function TransporteAsignacion() {
  return (
    <div style={{ display: 'grid', gap: '1.5rem' }}>
      <EjercicioTransporte />
      <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)' }} />
      <EjercicioAsignacion />
    </div>
  )
}
