import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BlockMath, InlineMath } from './Katex'
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
// SECCIÓN B — Componentes de Ejercicios Resueltos (uno por tema)
// ─────────────────────────────────────────────────────────────────────────────
import TransporteAsignacion from './TransporteAsignacion.jsx'
import Programacion        from './Programacion.jsx'
import Redes               from './Redes.jsx'
import MonteCarlo          from './MonteCarlo.jsx'
import Markov              from './Markov.jsx'
import ControlEstadistico  from './ControlEstadistico.jsx'

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
        destino, respetando las capacidades de oferta disponibles y las
        demandas requeridas. Su objetivo puede ser minimizar el costo total de
        transporte o maximizar la ganancia total, dependiendo del contexto del
        problema.
      </p>

      <h4 className="exec-subtitle">¿Cómo funciona?</h4>
      <p>
        El modelo se estructura en una tabla donde se cruzan los orígenes con
        los destinos, y cada celda contiene el costo o ganancia unitaria de esa
        ruta. Una condición indispensable es que la oferta total sea igual a la
        demanda total; cuando no ocurre así, se agrega una fila o columna
        ficticia con valor cero para equilibrar el modelo. Para obtener una
        solución inicial de calidad, se aplica el Método de Aproximación de
        Vogel, que calcula penalizaciones por fila y columna como la
        diferencia entre los dos menores costos disponibles, asignando
        primero donde el costo de equivocarse es mayor. Una vez obtenida esa
        solución, se verifica su optimalidad con el Método de Salto de Piedra
        en Piedra, que evalúa cada celda vacía trazando circuitos cerrados
        alternando signos positivos y negativos; si ningún circuito mejora el
        resultado, la solución es óptima.
      </p>

      <h4 className="exec-subtitle">¿Qué es el Modelo de Asignación?</h4>
      <p>
        Es un caso especial del modelo de transporte donde se asigna
        exactamente un recurso a cada tarea, como camiones a rutas o personas a
        puestos. Se resuelve con el Método Húngaro, que transforma la tabla
        original restando valores de fila y columna hasta obtener ceros que
        permitan una asignación óptima sin conflictos.
      </p>

      <h4 className="exec-subtitle">Fórmulas Clave</h4>
      <div className="formula-list">
        <div className="formula-item">
          <span className="formula-label">Función Objetivo</span>
          <BlockMath math="\text{Min/Max}\; Z = \sum_{i=1}^{m}\sum_{j=1}^{n} c_{ij} \cdot x_{ij}" />
        </div>
        <div className="formula-item">
          <span className="formula-label">Restricción de Oferta</span>
          <BlockMath math="\sum_{j=1}^{n} x_{ij} \leq S_i" />
        </div>
        <div className="formula-item">
          <span className="formula-label">Restricción de Demanda</span>
          <BlockMath math="\sum_{i=1}^{m} x_{ij} = D_j" />
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
        sistemática, reduciendo costos y maximizando el uso de los recursos
        disponibles.
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
        Se trata de tres extensiones de la programación lineal clásica, cada
        una diseñada para resolver tipos de problemas que la programación
        lineal simple no puede manejar correctamente. Las tres responden a
        realidades empresariales distintas: la indivisibilidad de los
        recursos, la existencia de múltiples objetivos en conflicto y el
        comportamiento no proporcional de costos e ingresos.
      </p>

      <h4 className="exec-subtitle">¿Cómo funciona la Programación Entera?</h4>
      <p>
        Este modelo exige que las variables de decisión sean números enteros,
        ya que en la práctica no tiene sentido producir fracciones de camiones
        o personas. No es válido simplemente redondear el resultado de un
        modelo lineal continuo, porque eso puede generar soluciones
        infactibles. Para resolverlo se usan algoritmos como Branch and Bound,
        que divide el problema en subproblemas más pequeños hasta encontrar la
        solución entera correcta, o el Algoritmo de Gomory, que agrega
        restricciones de corte para eliminar soluciones con decimales.
      </p>

      <h4 className="exec-subtitle">¿Cómo funciona la Programación por Metas?</h4>
      <p>
        Este modelo aborda situaciones donde existen múltiples objetivos que
        compiten entre sí y no siempre se pueden cumplir todos
        simultáneamente. En lugar de buscar un único óptimo, busca minimizar
        las desviaciones respecto a cada meta ordenada por prioridad. Para
        cada meta se definen variables de desviación: <InlineMath math="d^-" />{' '}
        mide cuánto falta para alcanzar la meta y <InlineMath math="d^+" />{' '}
        mide cuánto se excede. La función objetivo minimiza esas desviaciones
        según el orden de importancia definido por la gerencia.
      </p>

      <h4 className="exec-subtitle">¿Cómo funciona la Programación No Lineal?</h4>
      <p>
        Este modelo aplica cuando la función objetivo o las restricciones
        contienen términos no lineales como potencias, esto ocurre cuando los
        ingresos presentan rendimientos decrecientes o los costos crecen de
        forma exponencial. El óptimo puede estar en un punto interior del
        espacio factible, no en un vértice como en la programación lineal. Se
        resuelve aplicando derivadas parciales e igualándolas a cero, o usando
        herramientas como Excel Solver con el motor GRG Nonlinear.
      </p>

      <h4 className="exec-subtitle">Fórmulas Clave</h4>
      <div className="formula-list">
        <div className="formula-item">
          <span className="formula-label">P. Entera — Función Objetivo</span>
          <BlockMath math="\max Z = \sum_{j=1}^{n} c_j \cdot x_j \qquad x_j \geq 0,\; x_j \in \mathbb{Z}" />
        </div>
        <div className="formula-item">
          <span className="formula-label">P. Entera — Restricción de Recursos</span>
          <BlockMath math="\sum_{j=1}^{n} a_{ij} \cdot x_j \leq b_i" />
        </div>
        <div className="formula-item">
          <span className="formula-label">P. por Metas — Función Objetivo</span>
          <BlockMath math="\min Z = P_1(d_1^-) + P_2(d_2^- + d_2^+) + P_3(d_3^+)" />
        </div>
        <div className="formula-item">
          <span className="formula-label">P. por Metas — Restricción de Meta</span>
          <BlockMath math="\sum_{j=1}^{n} a_{kj} \cdot x_j + d_k^- - d_k^+ = G_k" />
        </div>
        <div className="formula-item">
          <span className="formula-label">P. No Lineal — Función Objetivo</span>
          <BlockMath math="\max/\min f(x) \quad \text{ej.}\;\; Z = 40x + 60y - 0.2x^2 - 0.3y^2" />
        </div>
      </div>

      <div className="exec-conclusion">
        <strong>Conclusión:</strong> Conocer estas tres variantes es
        fundamental porque en la práctica los problemas empresariales rara vez
        son perfectamente lineales ni tienen un solo objetivo. Saber cuál
        método aplicar según la naturaleza del problema es lo que determina la
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
        Se trata de un conjunto de técnicas matemáticas que permiten resolver
        problemas donde los elementos de un sistema están interconectados,
        como ciudades unidas por carreteras, nodos conectados por cables o
        puntos de distribución vinculados por rutas logísticas. La estructura
        base es un grafo <InlineMath math="G = (N,\, A)" />, donde{' '}
        <InlineMath math="N" /> representa los nodos, que son los puntos
        geográficos o de decisión, y <InlineMath math="A" /> representa los
        arcos, que son las conexiones entre esos nodos con un valor asociado
        de distancia, tiempo o costo.
      </p>

      <h4 className="exec-subtitle">¿Cuáles son las tres técnicas principales?</h4>
      <ul className="exec-list">
        <li>
          Árbol de Expansión Mínima: responde a la pregunta de cómo conectar
          todos los nodos de una red gastando el mínimo posible, evitando
          ciclos redundantes.
        </li>
        <li>
          Flujo Máximo: determina cuánta cantidad de un recurso puede moverse
          desde un origen hasta un destino considerando las capacidades de
          cada arco, e identifica los cuellos de botella que limitan el flujo
          total.
        </li>
        <li>
          Ruta Más Corta: resuelta con el Algoritmo de Dijkstra, encuentra el
          camino más eficiente entre un punto de salida y uno de llegada, ya
          sea medido en distancia, tiempo o costo.
        </li>
      </ul>

      <h4 className="exec-subtitle">¿Cómo funciona el Algoritmo de Dijkstra?</h4>
      <p>
        El algoritmo parte del nodo origen asignándole una etiqueta de cero.
        Luego calcula la distancia acumulada hacia todos sus nodos vecinos,
        convierte en permanente el nodo con menor distancia acumulada y desde
        ese nodo evalúa sus propios vecinos sumando la distancia ya recorrida.
        Este proceso se repite hasta que el nodo destino recibe su etiqueta
        permanente, momento en que la ruta óptima se reconstruye rastreando
        las etiquetas hacia atrás.
      </p>

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
        <strong>Conclusión:</strong> Estas técnicas son especialmente
        relevantes en logística y telecomunicaciones, ya que permiten tomar
        decisiones de infraestructura y rutas con fundamento matemático,
        reemplazando el criterio empírico con soluciones verificablemente
        óptimas.
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
        El modelado de simulación es una técnica analítica que permite imitar
        el comportamiento de un sistema real a lo largo del tiempo dentro de
        un entorno virtual, esto con el objetivo de analizar cómo responde el
        sistema ante distintas condiciones sin necesidad de alterar la
        operación real. Dentro de este campo, la Simulación Monte Carlo es la
        técnica más utilizada en gestión empresarial, ya que construye
        distribuciones de probabilidad a partir de datos históricos y usa
        números aleatorios para simular el comportamiento incierto de las
        variables del sistema.
      </p>

      <h4 className="exec-subtitle">¿Qué son los enfoques de avance del tiempo?</h4>
      <ul className="exec-list">
        <li>
          Incremento de Tiempo Fijo: el reloj del modelo avanza en intervalos
          constantes como cada hora o cada día, siendo ideal para auditar
          inventarios al cierre de jornada.
        </li>
        <li>
          Incremento del Evento Siguiente: el reloj salta directamente al
          momento en que ocurre el próximo evento relevante, ignorando los
          períodos de inactividad, lo que lo convierte en el estándar para
          modelar sistemas de atención como colas de camiones.
        </li>
      </ul>

      <h4 className="exec-subtitle">¿Cuál es el algoritmo paso a paso?</h4>
      <p>El método sigue seis pasos secuenciales:</p>
      <ol className="exec-list">
        <li>Primero se recolectan los datos históricos del sistema.</li>
        <li>Segundo, se calcula la probabilidad individual de cada evento.</li>
        <li>Tercero, se construye la probabilidad acumulada.</li>
        <li>
          Cuarto, se asignan rangos de números aleatorios proporcionales a
          cada probabilidad.
        </li>
        <li>
          Quinto, se simulan los eventos usando números aleatorios y
          determinando a qué rango pertenece cada uno.
        </li>
        <li>
          Sexto, se calcula el promedio simulado y se compara con el valor
          esperado teórico para fundamentar decisiones gerenciales.
        </li>
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
          <BlockMath math="E(X) = \sum_{i=1}^{n} x_i \cdot P(x_i)" />
        </div>
        <div className="formula-item">
          <span className="formula-label">Promedio Simulado</span>
          <BlockMath math="\bar{X}_{sim} = \dfrac{\displaystyle\sum_{i=1}^{N} X_{simulados}}{N}" />
        </div>
        <div className="formula-item">
          <span className="formula-label">Frecuencia Simulada Ponderada</span>
          <BlockMath math="\text{Total} = \sum (\text{Ocurrencias} \cdot x)" />
        </div>
      </div>

      <div className="exec-conclusion">
        <strong>Conclusión:</strong> Trabajar únicamente con el promedio
        teórico para planificar la operación es insuficiente, ya que la
        variabilidad real del sistema puede generar situaciones críticas que
        el promedio simplemente no refleja. La simulación agrega valor
        precisamente al modelar esa variabilidad y convertirla en información
        accionable.
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
        Se trata de un método cuantitativo que permite estudiar sistemas que
        cambian de estado a lo largo del tiempo usando probabilidades. Su
        característica más importante es la Propiedad de Markov: para
        predecir el estado futuro del sistema solo importa el estado actual,
        sin importar todo el historial previo. Esto lo hace
        computacionalmente eficiente y conceptualmente claro, ya que toda la
        información relevante para el pronóstico está contenida en el
        momento presente.
      </p>

      <h4 className="exec-subtitle">¿Cuáles son sus elementos fundamentales?</h4>
      <p>El modelo requiere dos piezas clave.</p>
      <ul className="exec-list">
        <li>
          La primera es el vector inicial de estado{' '}
          <InlineMath math="\pi^{(0)}" />, que describe cómo está distribuido
          el sistema en el período cero, por ejemplo la participación de
          mercado actual de cada empresa.
        </li>
        <li>
          La segunda es la Matriz de Probabilidades de Transición{' '}
          <InlineMath math="P" />, que indica con qué probabilidad el sistema
          pasa de un estado a otro en cada período. Una condición matemática
          estricta es que la suma de cada fila de la matriz debe ser
          exactamente 1, ya que el sistema siempre debe estar en algún estado
          posible.
        </li>
      </ul>

      <h4 className="exec-subtitle">¿Qué es el Estado Estable?</h4>
      <p>
        Es el punto en el futuro donde las probabilidades dejan de cambiar de
        un período a otro, sin importar cuántas multiplicaciones se realicen.
        Para calcularlo se plantea un sistema de ecuaciones donde cada
        variable es igual a la combinación lineal de todas las demás según la
        matriz de transición, más la restricción de que todas las
        probabilidades sumen 1. La solución de ese sistema representa la
        distribución final del mercado o del sistema en el largo plazo.
      </p>

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
        Se trata de un conjunto de herramientas matemáticas y gráficas que
        permiten monitorear un proceso productivo mientras está ocurriendo, en
        lugar de esperar al final para detectar errores cuando ya no hay forma
        de corregirlos sin incurrir en pérdidas. La premisa fundamental es que
        ningún proceso produce resultados idénticos siempre, y esa
        variabilidad puede tener dos orígenes: la causa común, que es la
        variación normal y aceptable del proceso, y la causa especial, que es
        algo anormal que está afectando el sistema y que debe corregirse.
      </p>

      <h4 className="exec-subtitle">
        ¿Qué son las Gráficas de Control para Variables (<InlineMath math="\bar{X}" /> – <InlineMath math="R" />)?
      </h4>
      <p>
        Cuando se trabaja con características medibles como peso, temperatura
        o longitud, se construyen dos gráficas complementarias. La gráfica de
        medias (<InlineMath math="\bar{X}" />) muestra si el proceso se
        mantiene centrado en el valor objetivo, y la gráfica de rangos (
        <InlineMath math="R" />) muestra si la variabilidad interna de las
        muestras es estable. Ambas tienen tres líneas: la línea central, el
        límite superior de control y el límite inferior de control,
        calculados con constantes estadísticas según el tamaño de muestra n.
        Si un punto cae fuera de esos límites o aparecen patrones como
        corridas de siete puntos consecutivos o tendencias de cinco puntos
        crecientes, el proceso indica la presencia de una causa especial.
      </p>

      <h4 className="exec-subtitle">¿Qué es la Gráfica p?</h4>
      <p>
        Cuando en lugar de medir se cuenta si algo es defectuoso o no, se usa
        la gráfica de proporción de defectos p. Esta gráfica monitorea la
        fracción de unidades defectuosas por muestra y permite identificar si
        hay períodos donde la calidad se deteriora significativamente respecto
        al nivel histórico promedio.
      </p>

      <h4 className="exec-subtitle">¿Qué son los Índices de Capacidad Cp y Cpk?</h4>
      <p>
        Más allá de verificar si el proceso está bajo control estadístico, los
        índices de capacidad evalúan si el proceso es capaz de cumplir las
        especificaciones del cliente.
      </p>
      <ul className="exec-list">
        <li>
          El índice <InlineMath math="C_p" /> mide si la variabilidad natural
          del proceso cabe dentro de los límites de especificación, siendo
          aceptable cuando es mayor o igual a <InlineMath math="1.33" />.
        </li>
        <li>
          El índice <InlineMath math="C_{pk}" /> va más lejos y verifica si
          además de ser capaz, el proceso está centrado: si{' '}
          <InlineMath math="C_{pk}" /> es menor que <InlineMath math="C_p" />,
          el proceso está desviado hacia uno de los límites y hay riesgo de
          producir defectos aunque <InlineMath math="C_p" /> sea aceptable.
        </li>
      </ul>

      <h4 className="exec-subtitle">Fórmulas Clave</h4>
      <div className="formula-list">
        <div className="formula-item">
          <span className="formula-label">Media del Subgrupo y Rango</span>
          <BlockMath math="\bar{X} = \frac{\displaystyle\sum_{i=1}^{n} x_i}{n} \qquad R = x_{\max} - x_{\min}" />
        </div>
        <div className="formula-item">
          <span className="formula-label">Gran Media y Rango Promedio</span>
          <BlockMath math="\bar{\bar{X}} = \frac{\displaystyle\sum_{i=1}^{k} \bar{X}_i}{k} \qquad \bar{R} = \frac{\displaystyle\sum_{i=1}^{k} R_i}{k}" />
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
          <span className="formula-label">Desviación Estándar Estimada</span>
          <BlockMath math="\sigma = \frac{\bar{R}}{d_2}" />
        </div>
        <div className="formula-item">
          <span className="formula-label">Índice de Capacidad Cp</span>
          <BlockMath math="C_p = \frac{LSE - LIE}{6\sigma}" />
        </div>
        <div className="formula-item">
          <span className="formula-label">Índice de Capacidad Centrado Cpk</span>
          <BlockMath math="C_{pk} = \min\!\left(\frac{LSE - \bar{\bar{X}}}{3\sigma},\;\frac{\bar{\bar{X}} - LIE}{3\sigma}\right)" />
        </div>
        <div className="formula-item">
          <span className="formula-label">Proporción Promedio de Defectos</span>
          <BlockMath math="\bar{p} = \frac{\displaystyle\sum_{i=1}^{k} d_i}{\displaystyle\sum_{i=1}^{k} n_i}" />
        </div>
        <div className="formula-item">
          <span className="formula-label">Límites de Control — Gráfica p</span>
          <BlockMath math="LCS_p = \bar{p} + 3\sqrt{\dfrac{\bar{p}(1-\bar{p})}{n}}" />
        </div>
      </div>

      <div className="exec-conclusion">
        <strong>Conclusión:</strong> La calidad no es algo que se inspecciona
        al final sino que se construye durante el proceso. Los datos
        estadísticos son la única forma confiable de saber si el proceso está
        funcionando correctamente o está a punto de fallar antes de que se
        materialicen los defectos y las pérdidas.
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

// ─────────────────────────────────────────────────────────────────────────────
// MAPA DE EJERCICIOS — SECCIÓN B (un componente por tema)
// ─────────────────────────────────────────────────────────────────────────────
const EXERCISES_MAP = {
  '1': TransporteAsignacion,
  '2': Programacion,
  '3': Redes,
  '4': MonteCarlo,
  '5': Markov,
  '6': ControlEstadistico,
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
        <p className="university">
          Universidad de Costa Rica
          <br />
          Sede del Caribe
        </p>
        <h1 className="course-title">IF7200 Métodos Cuantitativos para la Toma de Decisiones</h1>
        <p className="author">Yudhansell Paniagua Montenegro</p>
        <p className="intro">
          Exploración de 6 temas fundamentales de análisis cuantitativo con
          enfoque académico
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
    <header className="topbar no-print">
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
          resultados de seis temas del curso: IF7200 Métodos Cuantitativos para la Toma de Decisiones.
        </p>
        <p>
          Selecciona un tema para ver su explicación detallada, fórmulas y ejercicios resueltos.
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
  const ExecSummary  = EXEC_SUMMARY_MAP[topicId] ?? null
  const ExerciseComp = EXERCISES_MAP[topicId] ?? null

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
      {/* ── Encabezado de impresión (solo visible en el PDF/impresión) ─────── */}
      <div className="print-header">
        <p>Elaborado por: Yudhansell Paniagua Montenegro</p>
        <p>IF7200 Métodos Cuantitativos para la Toma de Decisiones — Tema {topic.id}: {topic.title}</p>
      </div>

      {/* ── Encabezado del tema ───────────────────────────────────────────── */}
      <section className="panel topic-header-panel">
        <div>
          <p className="topic-number">Tema {topic.id}</p>
          <h2>{topic.title}</h2>
        </div>
        <button type="button" className="download-pdf-btn no-print" onClick={() => window.print()}>
          Descargar PDF
        </button>
      </section>

      {/* ── SECCIÓN A: Resumen Ejecutivo ─────────────────────────────────── */}
      <section className="panel">
        <h3>Resumen Ejecutivo</h3>
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
      <section className="panel">
        <h3>Ejercicios Resueltos Paso a Paso</h3>
        {ExerciseComp
          ? <ExerciseComp />
          : (
            <div className="skeleton-wrap" aria-hidden="true">
              <span className="skeleton-line"></span>
              <span className="skeleton-line short"></span>
              <span className="skeleton-line"></span>
            </div>
          )
        }
      </section>
    </motion.main>
  )
}

function Footer() {
  return (
    <footer className="footer no-print">
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
    <BrowserRouter basename="/ProyectoMC">
      <AppShell theme={theme} onToggleTheme={handleThemeToggle} />
    </BrowserRouter>
  )
}

export default App
