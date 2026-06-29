// MonteCarlo.jsx — Sección B, Tema 4
// Terminal de Aduanas de Limón — Simulación Monte Carlo
// Parte A: Colas (Tiempos de Inspección)
// Parte B: Control de Insumos (Marchamos)
// Parte C: Política de Mantenimiento (Escáner de rayos X)
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

// ── Gráfica de barras SVG genérica ───────────────────────────────────────────
function BarChart({ data, label, color = '#7dd3fc', unit = '' }) {
  const max = Math.max(...data.map((d) => d.count))
  const W = 340, H = 130, PL = 36, PB = 28, PT = 14
  const bw = Math.floor((W - PL - 12) / data.length) - 5
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ maxWidth: W, display: 'block', margin: '0.4rem auto' }}>
      <text x={W / 2} y={10} textAnchor="middle" fontSize="9" fill="var(--muted-text)">{label}</text>
      {data.map((d, i) => {
        const bh = max > 0 ? Math.round(((H - PB - PT - 10) * d.count) / max) : 0
        const x = PL + i * (bw + 5)
        const y = H - PB - bh
        return (
          <g key={i}>
            <rect x={x} y={y} width={bw} height={bh} rx={3} fill={color} opacity="0.8" />
            <text x={x + bw / 2} y={y - 3} textAnchor="middle" fontSize="9" fill="var(--accent)" fontWeight="700">{d.count}×</text>
            <text x={x + bw / 2} y={H - PB + 11} textAnchor="middle" fontSize="8" fill="var(--muted-text)">{d.label}{unit}</text>
          </g>
        )
      })}
      <line x1={PL - 2} y1={PT + 8} x2={PL - 2} y2={H - PB} stroke="var(--border-color)" strokeWidth="1" />
      <line x1={PL - 2} y1={H - PB} x2={W - 10} y2={H - PB} stroke="var(--border-color)" strokeWidth="1" />
    </svg>
  )
}

// ── Helper: tabla de probabilidades/rangos ───────────────────────────────────
function TablaProbabilidades({ rows }) {
  return (
    <div style={{ overflowX: 'auto', margin: '0.5rem 0' }}>
      <table style={{ borderCollapse: 'collapse', fontSize: '0.82rem' }}>
        <thead>
          <tr style={{ background: 'var(--surface-soft)' }}>
            <th style={th}>Valor (x)</th>
            <th style={th}>Frec.</th>
            <th style={th}><InlineMath math="P(x)" /></th>
            <th style={th}><InlineMath math="P \text{ acum.}" /></th>
            <th style={th}>Rango RN</th>
            <th style={th}><InlineMath math="x \cdot P(x)" /></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.x}>
              <td style={td}>{r.x}</td>
              <td style={td}>{r.freq}</td>
              <td style={td}>{r.p}</td>
              <td style={td}>{r.acum}</td>
              <td style={td}>{r.rango}</td>
              <td style={td}>{r.xp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ── Helper: tabla de simulación ──────────────────────────────────────────────
function TablaSimulacion({ rows, unit = '' }) {
  return (
    <div style={{ overflowX: 'auto', margin: '0.5rem 0' }}>
      <table style={{ borderCollapse: 'collapse', fontSize: '0.82rem' }}>
        <thead>
          <tr style={{ background: 'var(--surface-soft)' }}>
            <th style={th}>Evento</th>
            <th style={th}>N° Aleatorio</th>
            <th style={th}>Resultado{unit ? ` (${unit})` : ''}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td style={td}>{i + 1}</td>
              <td style={td}>{r.rn}</td>
              <td style={td}>{r.result}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ── PARTE A — Colas (Tiempos de Inspección) ──────────────────────────────────
function ParteA() {
  const probRows = [
    { x: 15, freq: 20, p: '0.20', acum: '0.20', rango: '1 – 20',  xp: '3.0' },
    { x: 30, freq: 40, p: '0.40', acum: '0.60', rango: '21 – 60', xp: '12.0' },
    { x: 45, freq: 30, p: '0.30', acum: '0.90', rango: '61 – 90', xp: '13.5' },
    { x: 60, freq: 10, p: '0.10', acum: '1.00', rango: '91 – 100', xp: '6.0' },
  ]
  const simRows = [
    { rn: 25, result: 30 }, { rn: 88, result: 45 }, { rn: 12, result: 15 },
    { rn: 65, result: 45 }, { rn: 92, result: 60 }, { rn:  8, result: 15 },
    { rn: 45, result: 30 }, { rn: 73, result: 45 }, { rn: 19, result: 15 },
    { rn: 54, result: 30 },
  ]
  const countMap = { 15: 3, 30: 3, 45: 3, 60: 1 }
  return (
    <div>
      <div className="enunciado">
        <h4 className="exec-subtitle">Parte A — Simulación de Colas (Tiempos de Inspección)</h4>
        <p>
          Los contenedores seleccionados para inspección física en la Terminal de Aduanas de Limón
          tardan tiempos variables. Historial de 100 contenedores: 15 min (20), 30 min (40),
          45 min (30), 60 min (10). Simule los próximos 10 contenedores.
        </p>
        <p><strong>Números aleatorios:</strong> 25, 88, 12, 65, 92, 8, 45, 73, 19, 54.</p>
      </div>
      <div className="solucion">
        <h4 className="exec-subtitle">Paso 1 — Probabilidades, Rangos y E(X)</h4>
        <TablaProbabilidades rows={probRows} />
        <div className="formula-item">
          <span className="formula-label">Valor Esperado Teórico</span>
          <BlockMath math="E(X) = 15(0.20)+30(0.40)+45(0.30)+60(0.10) = 34.5 \text{ min}" />
        </div>

        <h4 className="exec-subtitle">Paso 2 — Corrida de Simulación</h4>
        <TablaSimulacion rows={simRows} unit="min" />
        <BarChart
          label="Frecuencia de tiempos simulados"
          data={[
            { label: '15', count: countMap[15] },
            { label: '30', count: countMap[30] },
            { label: '45', count: countMap[45] },
            { label: '60', count: countMap[60] },
          ]}
          unit=" min"
        />

        <h4 className="exec-subtitle">Paso 3 — Consolidación</h4>
        <BlockMath math="\text{Total} = 3(15)+3(30)+3(45)+1(60) = 45+90+135+60 = 330 \text{ min}" />
        <BlockMath math="\bar{x}_{\text{sim}} = \frac{330}{10} = 33 \text{ min}" />

        <div className="exec-conclusion">
          El promedio simulado (33 min) es ligeramente inferior al teórico (34.5 min). En 10 corridas
          se produjo un escenario crítico de 60 min, pero la alta frecuencia de trámites rápidos
          compensó el promedio. La variabilidad justifica buffers de tiempo entre inspecciones.
        </div>
      </div>
    </div>
  )
}

// ── PARTE B — Control de Marchamos ───────────────────────────────────────────
function ParteB() {
  const probRows = [
    { x: 50,  freq: 15, p: '0.15', acum: '0.15', rango: '1 – 15',  xp: '7.5' },
    { x: 100, freq: 45, p: '0.45', acum: '0.60', rango: '16 – 60', xp: '45.0' },
    { x: 150, freq: 30, p: '0.30', acum: '0.90', rango: '61 – 90', xp: '45.0' },
    { x: 200, freq: 10, p: '0.10', acum: '1.00', rango: '91 – 100', xp: '20.0' },
  ]
  const simRows = [
    { rn: 50, result: 100 }, { rn: 10, result:  50 }, { rn: 85, result: 150 },
    { rn: 42, result: 100 }, { rn: 95, result: 200 }, { rn: 22, result: 100 },
    { rn: 67, result: 150 }, { rn:  5, result:  50 }, { rn: 33, result: 100 },
    { rn: 78, result: 150 },
  ]
  const countMap = { 50: 2, 100: 4, 150: 3, 200: 1 }
  return (
    <div>
      <div className="enunciado">
        <h4 className="exec-subtitle">Parte B — Control de Recursos e Insumos (Marchamos)</h4>
        <p>
          Para sellar contenedores, los oficiales usan marchamos de alta seguridad. La demanda
          diaria es incierta. Historial de 100 días: 50 u (15), 100 u (45), 150 u (30), 200 u (10).
          Simule los próximos 10 días.
        </p>
        <p><strong>Números aleatorios:</strong> 50, 10, 85, 42, 95, 22, 67, 5, 33, 78.</p>
      </div>
      <div className="solucion">
        <h4 className="exec-subtitle">Paso 1 — Probabilidades, Rangos y E(X)</h4>
        <TablaProbabilidades rows={probRows} />
        <div className="formula-item">
          <span className="formula-label">Valor Esperado Teórico</span>
          <BlockMath math="E(X) = 50(0.15)+100(0.45)+150(0.30)+200(0.10) = 117.5 \text{ u/día}" />
        </div>

        <h4 className="exec-subtitle">Paso 2 — Corrida de Simulación</h4>
        <TablaSimulacion rows={simRows} unit="u" />
        <BarChart
          label="Frecuencia de demanda simulada"
          color="#a78bfa"
          data={[
            { label: '50', count: countMap[50] },
            { label: '100', count: countMap[100] },
            { label: '150', count: countMap[150] },
            { label: '200', count: countMap[200] },
          ]}
          unit=" u"
        />

        <h4 className="exec-subtitle">Paso 3 — Consolidación</h4>
        <BlockMath math="\text{Total} = 2(50)+4(100)+3(150)+1(200) = 100+400+450+200 = 1{,}150 \text{ u}" />
        <BlockMath math="\bar{x}_{\text{sim}} = \frac{1{,}150}{10} = 115 \text{ u/día}" />

        <div className="exec-conclusion">
          El promedio simulado (115 u) se acerca al teórico (117.5 u). Sin embargo, en 4 de los
          10 días la demanda superó las 100 u (saltó a 150 o 200), lo que habría causado escasez
          si se trabajara solo con la media. Esto justifica mantener un <strong>inventario de
          seguridad</strong> de marchamos.
        </div>
      </div>
    </div>
  )
}

// ── PARTE C — Política de Mantenimiento ──────────────────────────────────────
function ParteC() {
  const probRows = [
    { x: 10, freq: 30, p: '0.30', acum: '0.30', rango: '1 – 30',  xp: '3.0' },
    { x: 20, freq: 40, p: '0.40', acum: '0.70', rango: '31 – 70', xp: '8.0' },
    { x: 30, freq: 20, p: '0.20', acum: '0.90', rango: '71 – 90', xp: '6.0' },
    { x: 40, freq: 10, p: '0.10', acum: '1.00', rango: '91 – 100', xp: '4.0' },
  ]
  const simRows = [
    { rn: 75, result: 30 }, { rn: 18, result: 10 }, { rn: 55, result: 20 },
    { rn: 32, result: 20 }, { rn: 91, result: 40 }, { rn:  4, result: 10 },
    { rn: 61, result: 20 }, { rn: 89, result: 30 }, { rn: 27, result: 10 },
    { rn: 49, result: 20 },
  ]
  const countMap = { 10: 3, 20: 4, 30: 2, 40: 1 }
  return (
    <div>
      <div className="enunciado">
        <h4 className="exec-subtitle">Parte C — Política de Mantenimiento (Escáner de Rayos X)</h4>
        <p>
          El escáner de rayos X sufre averías periódicas. Historial de 100 fallas: 10 días útiles (30),
          20 días (40), 30 días (20), 40 días (10). Simule los próximos 10 ciclos mecánicos.
        </p>
        <p><strong>Números aleatorios:</strong> 75, 18, 55, 32, 91, 4, 61, 89, 27, 49.</p>
      </div>
      <div className="solucion">
        <h4 className="exec-subtitle">Paso 1 — Probabilidades, Rangos y E(X)</h4>
        <TablaProbabilidades rows={probRows} />
        <div className="formula-item">
          <span className="formula-label">Valor Esperado Teórico</span>
          <BlockMath math="E(X) = 10(0.30)+20(0.40)+30(0.20)+40(0.10) = 21 \text{ días útiles}" />
        </div>

        <h4 className="exec-subtitle">Paso 2 — Corrida de Simulación</h4>
        <TablaSimulacion rows={simRows} unit="días" />
        <BarChart
          label="Frecuencia de ciclos simulados"
          color="#f472b6"
          data={[
            { label: '10d', count: countMap[10] },
            { label: '20d', count: countMap[20] },
            { label: '30d', count: countMap[30] },
            { label: '40d', count: countMap[40] },
          ]}
        />

        <h4 className="exec-subtitle">Paso 3 — Consolidación</h4>
        <BlockMath math="\text{Total} = 3(10)+4(20)+2(30)+1(40) = 30+80+60+40 = 210 \text{ días}" />
        <BlockMath math="\bar{x}_{\text{sim}} = \frac{210}{10} = 21 \text{ días útiles}" />

        <div className="exec-conclusion">
          El promedio empírico (21 días) coincidió exactamente con la teoría. Sin embargo, la
          simulación revela que el <strong>70% de las fallas ocurren a los 20 días o antes</strong>.
          Esperar al promedio para revisar el equipo garantizaría averías constantes, justificando
          un mantenimiento preventivo más estricto (cada 15–18 días).
        </div>
      </div>
    </div>
  )
}

// ── Componente principal ──────────────────────────────────────────────────────
export default function MonteCarlo() {
  return (
    <div style={{ display: 'grid', gap: '1.5rem' }}>
      <ParteA />
      <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)' }} />
      <ParteB />
      <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)' }} />
      <ParteC />
    </div>
  )
}
