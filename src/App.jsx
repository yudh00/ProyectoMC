import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BlockMath, InlineMath } from 'react-katex'
import {
  BrowserRouter,
  Navigate,
  NavLink,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom'
import './App.css'

// ─────────────────────────────────────────────────────────────────────────────
// DATOS GLOBALES — Lista de los 6 temas del curso IF7200
// Si el nombre de un tema cambia, actualízalo aquí.
// ─────────────────────────────────────────────────────────────────────────────
const TOPICS = [
  { id: '1', title: 'Transporte y Asignación' },
  { id: '2', title: 'Programación Entera, por Metas y No Lineal' },
  { id: '3', title: 'Modelos de Redes' },
  { id: '4', title: 'Modelado de Simulación' },
  { id: '5', title: 'Análisis de Markov' },
  { id: '6', title: 'Control Estadístico' },
]


// ═════════════════════════════════════════════════════════════════════════════
//
//  RESÚMENES EJECUTIVOS — SECCIÓN A
//
//  Cada tema tiene su propia función-componente debajo.
//  Para editar el contenido de un tema, busca su bloque con Ctrl+F
//  usando "RESUMEN EJECUTIVO: TEMA X" y modifica el JSX dentro.
//
// ═════════════════════════════════════════════════════════════════════════════


// ─────────────────────────────────────────────────────────────────────────────
// RESUMEN EJECUTIVO: TEMA 1 — Modelos de Transporte y Asignación
// ─────────────────────────────────────────────────────────────────────────────
function ResumenTema1() {
  return (
    <div className="exec-summary">

      <h4 className="exec-subtitle">¿Qué es?</h4>
      <p>
        Se trata de una técnica de optimización que resuelve el problema de
        decidir cuántas unidades enviar desde cada punto de origen hacia cada
        destino, respetando las capacidades de oferta disponibles y las demandas
        requeridas. Su objetivo puede ser minimizar el costo total de transporte
        o maximizar la ganancia total.
      </p>

      <h4 className="exec-subtitle">¿Cómo funciona?</h4>
      <p>
        El modelo se estructura en una tabla cruzando orígenes y destinos. Una
        condición indispensable es que la oferta total sea igual a la demanda
        total; de lo contrario, se agrega una fila o columna ficticia. Para una
        solución inicial se usa el{' '}
        <strong>Método de Aproximación de Vogel</strong> (calculando
        penalizaciones). La optimalidad se verifica con el{' '}
        <strong>Método de Salto de Piedra en Piedra</strong>, trazando circuitos
        cerrados alternando signos positivos y negativos.
      </p>

      <h4 className="exec-subtitle">¿Qué es el Modelo de Asignación?</h4>
      <p>
        Un caso especial donde se asigna exactamente un recurso a cada tarea
        (por ejemplo, camiones a rutas). Se resuelve con el{' '}
        <strong>Método Húngaro</strong>.
      </p>

      <h4 className="exec-subtitle">Fórmulas Clave</h4>
      <div className="formula-list">
        <div className="formula-item">
          <span className="formula-label">Función Objetivo</span>
          <BlockMath math="\text{Min/Max}\; Z = \sum_{i}\sum_{j} c_{ij} \cdot x_{ij}" />
        </div>
        <div className="formula-item">
          <span className="formula-label">Restricción de Oferta</span>
          <BlockMath math="\sum_{j} x_{ij} \leq S_i" />
        </div>
        <div className="formula-item">
          <span className="formula-label">Restricción de Demanda</span>
          <BlockMath math="\sum_{i} x_{ij} = D_j" />
        </div>
        <div className="formula-item">
          <span className="formula-label">No Negatividad</span>
          <BlockMath math="x_{ij} \geq 0" />
        </div>
      </div>

      <div className="exec-conclusion">
        <strong>Conclusión:</strong> Este modelo es de alto valor en logística
        empresarial, ya que convierte un problema de distribución con múltiples
        combinaciones posibles en una estructura matemática resoluble de forma
        sistemática.
      </div>

    </div>
  )
}
// ── FIN RESUMEN EJECUTIVO: TEMA 1 ──────────────────────────────────────────


// ─────────────────────────────────────────────────────────────────────────────
// RESUMEN EJECUTIVO: TEMA 2 — Programación Entera, por Metas y No Lineal
// ─────────────────────────────────────────────────────────────────────────────
function ResumenTema2() {
  return (
    <div className="exec-summary">

      <h4 className="exec-subtitle">¿Qué es?</h4>
      <p>
        Tres extensiones de la programación lineal diseñadas para realidades
        empresariales: indivisibilidad de recursos, objetivos múltiples en
        conflicto y rendimientos no proporcionales.
      </p>

      <h4 className="exec-subtitle">Programación Entera</h4>
      <p>
        Exige variables de decisión como números enteros (no se puede producir
        medio camión). Usa algoritmos como <strong>Branch and Bound</strong> o{' '}
        <strong>Gomory</strong>.
      </p>

      <h4 className="exec-subtitle">Programación por Metas</h4>
      <p>
        Minimiza las desviaciones (<InlineMath math="d^-" /> y{' '}
        <InlineMath math="d^+" />) respecto a metas ordenadas por prioridad
        lexicográfica, buscando soluciones de "satisfacción".
      </p>

      <h4 className="exec-subtitle">Programación No Lineal</h4>
      <p>
        Aplica cuando los costos o ingresos son exponenciales o tienen
        potencias. El óptimo se halla con derivadas parciales o motores como{' '}
        <strong>GRG Nonlinear</strong>.
      </p>

      <h4 className="exec-subtitle">Fórmulas Clave</h4>
      <div className="formula-list">
        <div className="formula-item">
          <span className="formula-label">P. Entera — Función Objetivo</span>
          <BlockMath math="\max Z = \sum_{j} c_j \cdot x_j \qquad x_j \geq 0,\; x_j \in \mathbb{Z}" />
        </div>
        <div className="formula-item">
          <span className="formula-label">P. por Metas — Función Objetivo</span>
          <BlockMath math="\min Z = P_1(d_1^-) + P_2(d_2^- + d_2^+) + P_3(d_3^+)" />
        </div>
        <div className="formula-item">
          <span className="formula-label">Restricción de Meta</span>
          <BlockMath math="\sum_{j} a_{kj} \cdot x_j + d_k^- - d_k^+ = G_k" />
        </div>
      </div>

      <div className="exec-conclusion">
        <strong>Conclusión:</strong> En la práctica, los problemas rara vez son
        lineales o de un solo objetivo. Saber cuál método aplicar determina la
        calidad de la decisión final.
      </div>

    </div>
  )
}
// ── FIN RESUMEN EJECUTIVO: TEMA 2 ──────────────────────────────────────────


// ─────────────────────────────────────────────────────────────────────────────
// RESUMEN EJECUTIVO: TEMA 3 — Técnicas de Optimización de Redes
// ─────────────────────────────────────────────────────────────────────────────
function ResumenTema3() {
  return (
    <div className="exec-summary">

      <h4 className="exec-subtitle">¿Qué es?</h4>
      <p>
        Técnicas para sistemas interconectados modelados en grafos{' '}
        <InlineMath math="G = (N,\, A)" />, donde <InlineMath math="N" /> son
        nodos (ciudades/intersecciones) y <InlineMath math="A" /> son arcos
        (rutas/cables).
      </p>

      <h4 className="exec-subtitle">Técnicas Principales</h4>
      <ul className="exec-list">
        <li>
          <strong>Árbol de Expansión Mínima:</strong> conecta todos los nodos al
          mínimo costo total sin formar ciclos.
        </li>
        <li>
          <strong>Flujo Máximo:</strong> determina la cantidad máxima a mover a
          través de la red identificando cuellos de botella.
        </li>
        <li>
          <strong>Ruta Más Corta — Dijkstra:</strong> parte del origen con
          etiqueta cero, calcula la distancia acumulada a los vecinos, vuelve
          permanente el nodo menor y repite hasta alcanzar el destino.
        </li>
      </ul>

      <h4 className="exec-subtitle">Fórmulas Clave</h4>
      <div className="formula-list">
        <div className="formula-item">
          <span className="formula-label">Función Objetivo</span>
          <BlockMath math="\min Z = \sum_{(i,j)\,\in\, A} c_{ij} \cdot x_{ij}" />
        </div>
        <div className="formula-item">
          <span className="formula-label">Balance de Flujo por Nodo</span>
          <BlockMath math="\sum_{j} x_{ij} - \sum_{k} x_{ki} = b_i \qquad b_i = \begin{cases} +1 & \text{origen} \\ \phantom{+}0 & \text{intermedio} \\ -1 & \text{destino} \end{cases}" />
        </div>
        <div className="formula-item">
          <span className="formula-label">Binariedad</span>
          <BlockMath math="x_{ij} \in \{0,\; 1\}" />
        </div>
      </div>

      <div className="exec-conclusion">
        <strong>Conclusión:</strong> Relevantes en logística, permiten tomar
        decisiones de rutas reemplazando el criterio empírico con soluciones
        verificablemente óptimas.
      </div>

    </div>
  )
}
// ── FIN RESUMEN EJECUTIVO: TEMA 3 ──────────────────────────────────────────


// ─────────────────────────────────────────────────────────────────────────────
// RESUMEN EJECUTIVO: TEMA 4 — Modelado de Simulación Monte Carlo
// ─────────────────────────────────────────────────────────────────────────────
function ResumenTema4() {
  return (
    <div className="exec-summary">

      <h4 className="exec-subtitle">¿Qué es?</h4>
      <p>
        Técnica para imitar un sistema real en un entorno virtual, analizando
        su respuesta ante la incertidumbre. Monte Carlo construye distribuciones
        de probabilidad a partir de datos históricos y números aleatorios.
      </p>

      <h4 className="exec-subtitle">Avance del Tiempo</h4>
      <ul className="exec-list">
        <li>
          <strong>Incremento de Tiempo Fijo:</strong> intervalos constantes
          (ej. cierres de inventario).
        </li>
        <li>
          <strong>Incremento del Evento Siguiente:</strong> salta directamente
          a la próxima acción significativa (ej. colas de espera).
        </li>
      </ul>

      <h4 className="exec-subtitle">Algoritmo de 6 Pasos</h4>
      <ol className="exec-list">
        <li>Recopilar datos históricos.</li>
        <li>Calcular la probabilidad individual.</li>
        <li>Calcular la probabilidad acumulada.</li>
        <li>Asignar rangos de números aleatorios.</li>
        <li>Simular con números aleatorios generados.</li>
        <li>Calcular el promedio simulado y comparar con el teórico.</li>
      </ol>

      <h4 className="exec-subtitle">Fórmulas Clave</h4>
      <div className="formula-list">
        <div className="formula-item">
          <span className="formula-label">Probabilidad Individual</span>
          <BlockMath math="P(x) = \dfrac{f}{N}" />
        </div>
        <div className="formula-item">
          <span className="formula-label">Probabilidad Acumulada</span>
          <BlockMath math="F(x) = \sum P(x)" />
        </div>
        <div className="formula-item">
          <span className="formula-label">Valor Esperado Teórico</span>
          <BlockMath math="E(X) = \sum x_i \cdot P(x_i)" />
        </div>
        <div className="formula-item">
          <span className="formula-label">Promedio Simulado</span>
          <BlockMath math="\bar{X}_{sim} = \dfrac{\displaystyle\sum X_{simulados}}{N}" />
        </div>
      </div>

      <div className="exec-conclusion">
        <strong>Conclusión:</strong> Trabajar únicamente con el promedio teórico
        es insuficiente. La simulación agrega valor al modelar la variabilidad
        real y convertirla en información accionable para la toma de decisiones.
      </div>

    </div>
  )
}
// ── FIN RESUMEN EJECUTIVO: TEMA 4 ──────────────────────────────────────────


// ─────────────────────────────────────────────────────────────────────────────
// RESUMEN EJECUTIVO: TEMA 5 — Análisis de Cadenas de Markov
// ─────────────────────────────────────────────────────────────────────────────
function ResumenTema5() {
  return (
    <div className="exec-summary">

      <h4 className="exec-subtitle">¿Qué es?</h4>
      <p>
        Método para estudiar sistemas que cambian de estado mediante
        probabilidades. Su regla de oro es la{' '}
        <strong>Propiedad de Markov</strong>: para predecir el futuro solo
        importa el estado actual, no el historial previo.
      </p>

      <h4 className="exec-subtitle">Elementos Fundamentales</h4>
      <ul className="exec-list">
        <li>
          <strong>Vector Inicial de Estado:</strong> distribución de
          probabilidades en el periodo cero.
        </li>
        <li>
          <strong>Matriz de Transición <InlineMath math="P" />:</strong> tabla
          donde cada fila representa las probabilidades de moverse a otro estado;
          sus filas siempre suman 1.
        </li>
        <li>
          <strong>Estado Estable:</strong> punto futuro donde las probabilidades
          dejan de cambiar con el tiempo.
        </li>
      </ul>

      <h4 className="exec-subtitle">Fórmulas Clave</h4>
      <div className="formula-list">
        <div className="formula-item">
          <span className="formula-label">Vector Inicial de Estado</span>
          <BlockMath math="\pi^{(0)} = \bigl[\,\pi_1^{(0)},\;\pi_2^{(0)},\;\ldots,\;\pi_k^{(0)}\,\bigr]" />
        </div>
        <div className="formula-item">
          <span className="formula-label">Pronóstico del Estado Futuro</span>
          <BlockMath math="\pi^{(n+1)} = \pi^{(n)} \cdot P" />
        </div>
        <div className="formula-item">
          <span className="formula-label">Condición de Estado Estable</span>
          <BlockMath math="\pi = \pi \cdot P" />
        </div>
        <div className="formula-item">
          <span className="formula-label">Restricción de Probabilidad Total</span>
          <BlockMath math="\pi_1 + \pi_2 + \pi_3 = 1" />
        </div>
      </div>

      <div className="exec-conclusion">
        <strong>Conclusión:</strong> Proporciona una visión cuantificada del
        futuro, permitiendo a la gerencia tomar decisiones estratégicas (como
        programas de fidelización) antes de que las fugas de clientes sean
        irreversibles.
      </div>

    </div>
  )
}
// ── FIN RESUMEN EJECUTIVO: TEMA 5 ──────────────────────────────────────────


// ─────────────────────────────────────────────────────────────────────────────
// RESUMEN EJECUTIVO: TEMA 6 — Control Estadístico de la Calidad
// ─────────────────────────────────────────────────────────────────────────────
function ResumenTema6() {
  return (
    <div className="exec-summary">

      <h4 className="exec-subtitle">¿Qué es?</h4>
      <p>
        Herramientas para monitorear un proceso productivo en tiempo real.
        Distingue entre <strong>causa común</strong> (variación natural
        inherente al sistema) y <strong>causa especial</strong> (anomalías
        externas que deben corregirse de inmediato).
      </p>

      <h4 className="exec-subtitle">
        Gráficas de Variables (<InlineMath math="\bar{X}" /> – <InlineMath math="R" />)
      </h4>
      <p>
        Para medidas continuas (peso, temperatura, longitud).{' '}
        <strong>Media (<InlineMath math="\bar{X}" />):</strong> evalúa el
        centrado del proceso.{' '}
        <strong>Rango (<InlineMath math="R" />):</strong> evalúa la dispersión.
      </p>

      <h4 className="exec-subtitle">Gráfica p</h4>
      <p>Para evaluar la proporción de unidades defectuosas en lotes.</p>

      <h4 className="exec-subtitle">Índices de Capacidad del Proceso</h4>
      <ul className="exec-list">
        <li>
          <strong><InlineMath math="C_p" /></strong>: mide si la variación del
          proceso cabe dentro de los límites del cliente. Se considera aceptable
          cuando <InlineMath math="C_p \geq 1.33" />.
        </li>
        <li>
          <strong><InlineMath math="C_{pk}" /></strong>: mide si el proceso,
          además de caber, está centrado dentro de esos límites.
        </li>
      </ul>

      <h4 className="exec-subtitle">Fórmulas Clave</h4>
      <div className="formula-list">
        <div className="formula-item">
          <span className="formula-label">Gran Media y Rango Promedio</span>
          <BlockMath math="\bar{\bar{X}} = \frac{\displaystyle\sum \bar{X}_i}{k} \qquad \bar{R} = \frac{\displaystyle\sum R_i}{k}" />
        </div>
        <div className="formula-item">
          <span className="formula-label">
            Límites de Control para <InlineMath math="\bar{X}" />
          </span>
          <BlockMath math="LCS_{\bar{X}} = \bar{\bar{X}} + A_2\bar{R} \qquad LCI_{\bar{X}} = \bar{\bar{X}} - A_2\bar{R}" />
        </div>
        <div className="formula-item">
          <span className="formula-label">Límites de Control para R</span>
          <BlockMath math="LCS_R = D_4\bar{R} \qquad LCI_R = D_3\bar{R}" />
        </div>
        <div className="formula-item">
          <span className="formula-label">Capacidad del Proceso</span>
          <BlockMath math="C_p = \frac{LSE - LIE}{6\sigma} \qquad \sigma = \frac{\bar{R}}{d_2}" />
        </div>
        <div className="formula-item">
          <span className="formula-label">Capacidad Centrada</span>
          <BlockMath math="C_{pk} = \min\!\left(\frac{LSE - \bar{\bar{X}}}{3\sigma},\;\frac{\bar{\bar{X}} - LIE}{3\sigma}\right)" />
        </div>
      </div>

      <div className="exec-conclusion">
        <strong>Conclusión:</strong> La calidad no se inspecciona al final, se
        construye dentro del proceso. Estos datos son la única forma confiable
        de intervenir antes de que se materialicen pérdidas financieras.
      </div>

    </div>
  )
}
// ── FIN RESUMEN EJECUTIVO: TEMA 6 ──────────────────────────────────────────


// ─────────────────────────────────────────────────────────────────────────────
// MAPA de topicId → Componente de Resumen Ejecutivo
// Registra aquí el componente de cada tema.
// ─────────────────────────────────────────────────────────────────────────────
const EXEC_SUMMARY_MAP = {
  '1': ResumenTema1,
  '2': ResumenTema2,
  '3': ResumenTema3,
  '4': ResumenTema4,
  '5': ResumenTema5,
  '6': ResumenTema6,
}


// ═════════════════════════════════════════════════════════════════════════════
// COMPONENTES DE UI — No modificar salvo cambios de estructura o navegación
// ═════════════════════════════════════════════════════════════════════════════

function SplashScreen() {
  const navigate = useNavigate()

  return (
    <motion.main
      className="splash"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.45 }}
    >
      <motion.div
        className="splash-card"
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <p className="eyebrow">Portafolio Digital de Aprendizaje</p>
        <h1>IF7200 Métodos Cuantitativos para la Toma de Decisiones</h1>
        <p className="author">Yudhansell Paniagua Montenegro</p>
        <p className="intro">
          Exploración de 6 temas fundamentales de análisis cuantitativo con
          enfoque académico, visual e interactivo.
        </p>
        <motion.button
          type="button"
          className="cta-button"
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/home')}
        >
          Comenzar
        </motion.button>
      </motion.div>
    </motion.main>
  )
}

function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === 'dark'
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={onToggle}
      aria-label="Alternar modo oscuro y claro"
      title="Alternar tema"
    >
      <span className={`toggle-track ${isDark ? 'dark' : 'light'}`}>
        <span className="toggle-thumb">{isDark ? '🌙' : '☀️'}</span>
      </span>
    </button>
  )
}

function TopBar({ theme, onToggle }) {
  return (
    <header className="topbar">
      <div className="topbar-inner">

        {/* Botón Inicio — extremo izquierdo */}
        <NavLink
          to="/home"
          className={({ isActive }) => `home-btn ${isActive ? 'active' : ''}`}
          title="Ir al inicio"
          aria-label="Ir al inicio"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        </NavLink>

        <ThemeToggle theme={theme} onToggle={onToggle} />

        <nav className="topic-nav" aria-label="Temas del curso">
          {TOPICS.map((topic) => (
            <NavLink
              key={topic.id}
              className={({ isActive }) =>
                `topic-link ${isActive ? 'active' : ''}`
              }
              to={`/tema/${topic.id}`}
            >
              {topic.id}. {topic.title}
            </NavLink>
          ))}
        </nav>

      </div>
    </header>
  )
}

function HomePage() {
  return (
    <motion.main
      className="page"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35 }}
    >
      <section className="panel">
        <h2>Bienvenido al entorno interactivo</h2>
        <p>
          Este espacio funciona como base para documentar análisis, modelos y
          resultados de los seis temas del curso.
        </p>
        <p>
          Selecciona un tema en la barra superior para abrir su plantilla con
          secciones listas para completar.
        </p>
      </section>
      <section className="cards-grid">
        {TOPICS.map((topic) => (
          <NavLink
            key={topic.id}
            to={`/tema/${topic.id}`}
            className="topic-card"
          >
            <p className="topic-number">Tema {topic.id}</p>
            <h3>{topic.title}</h3>
          </NavLink>
        ))}
      </section>
    </motion.main>
  )
}

function TopicPage() {
  const { topicId } = useParams()
  const topic = useMemo(() => TOPICS.find((item) => item.id === topicId), [topicId])

  // Componente de resumen ejecutivo para este tema (null si no está definido aún)
  const ExecSummary = EXEC_SUMMARY_MAP[topicId] ?? null

  if (!topic) {
    return (
      <motion.main className="page">
        <section className="panel">
          <h2>Tema no encontrado</h2>
          <p>Selecciona uno de los temas disponibles en la barra superior.</p>
        </section>
      </motion.main>
    )
  }

  return (
    <motion.main
      className="page"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35 }}
    >
      {/* ── Encabezado del tema ───────────────────────────────────────────── */}
      <section className="panel">
        <p className="topic-number">Tema {topic.id}</p>
        <h2>{topic.title}</h2>
      </section>

      {/* ── SECCIÓN A: Resumen Ejecutivo ─────────────────────────────────── */}
      <section className="panel">
        <h3>Sección A — Resumen Ejecutivo</h3>
        {ExecSummary
          ? <ExecSummary />
          : (
            /* Placeholder visual mientras no hay contenido definido */
            <div className="skeleton-wrap" aria-hidden="true">
              <span className="skeleton-line"></span>
              <span className="skeleton-line short"></span>
              <span className="skeleton-line"></span>
            </div>
          )
        }
      </section>

      {/* ── SECCIÓN B: Ejercicios Resueltos ──────────────────────────────── */}
      <section className="panel math-panel">
        <h3>Sección B — Ejercicios Resueltos Paso a Paso</h3>
        <p className="hint">
          Renderizado matemático activo con KaTeX (<InlineMath math="\LaTeX" />
          ).
        </p>
        <div className="math-grid">
          <article className="math-card">
            <h4>Formulación Matemática</h4>
            {/* INYECTAR AQUÍ: variables de decisión */}
            <BlockMath math={'\\text{Variables: } x_{ij} \\geq 0,\\; y_i \\in \\{0,1\\}'} />
            {/* INYECTAR AQUÍ: función objetivo */}
            <BlockMath math={'\\text{Objetivo: } \\min Z = \\sum_i\\sum_j c_{ij}x_{ij}'} />
            {/* INYECTAR AQUÍ: restricciones */}
            <BlockMath math={'\\text{Restricciones: } \\sum_j x_{ij} \\leq s_i,\\; \\sum_i x_{ij}=d_j'} />
          </article>
          <article className="math-card">
            <h4>Método Algorítmico</h4>
            {/* INYECTAR AQUÍ: pasos del algoritmo o técnica aplicada */}
            <p className="placeholder-text">
              Espacio reservado para explicar procedimiento, iteraciones,
              criterios de convergencia y validaciones.
            </p>
          </article>
          <article className="math-card">
            <h4>Resultados</h4>
            {/* INYECTAR AQUÍ: interpretación numérica y decisión recomendada */}
            <BlockMath math={'\\text{Resultado esperado: } Z^* = \\text{valor óptimo}'} />
          </article>
        </div>
      </section>

      {/* ── SECCIÓN C: Recursos Multimedia ───────────────────────────────── */}
      <section className="panel">
        <h3>Sección C — Recursos Multimedia e Interactivos</h3>
        {/* INYECTAR AQUÍ: iframes de videos, simulaciones o Google Sheets */}
        <div className="media-grid">
          <article className="media-card">
            <h4>Video / Solver</h4>
            <div className="media-slot">Placeholder iframe 16:9</div>
          </article>
          <article className="media-card">
            <h4>Simulación</h4>
            <div className="media-slot">Placeholder recurso interactivo</div>
          </article>
          <article className="media-card">
            <h4>Hoja de Cálculo</h4>
            <div className="media-slot">Placeholder Google Sheets</div>
          </article>
        </div>
      </section>
    </motion.main>
  )
}

function Footer() {
  return (
    <footer className="footer">
      © 2026 Yudhansell Paniagua Montenegro — Todos los derechos reservados.
    </footer>
  )
}

function AppShell({ theme, onToggleTheme }) {
  const location = useLocation()
  const showChrome = location.pathname !== '/'

  return (
    <div className="app-shell">
      {showChrome && <TopBar theme={theme} onToggle={onToggleTheme} />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/tema/:topicId" element={<TopicPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
      {showChrome && <Footer />}
    </div>
  )
}

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') ?? 'dark')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const handleThemeToggle = () => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }

  return (
    <BrowserRouter>
      <AppShell theme={theme} onToggleTheme={handleThemeToggle} />
    </BrowserRouter>
  )
}

export default App
