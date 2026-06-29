// Katex.jsx — wrapper directo sobre katex (ESM), sin pasar por react-katex
import katex from 'katex'

function renderOrError(math, displayMode) {
  try {
    return katex.renderToString(math, { displayMode, throwOnError: false })
  } catch (error) {
    return `<span class="katex-error">${error.message}</span>`
  }
}

export function BlockMath({ math }) {
  return <div dangerouslySetInnerHTML={{ __html: renderOrError(math, true) }} />
}

export function InlineMath({ math }) {
  return <span dangerouslySetInnerHTML={{ __html: renderOrError(math, false) }} />
}
