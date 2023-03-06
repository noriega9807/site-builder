function h1({ children }) {
  <h1>{children}</h1>
}

function h2({ children }) {
  <h2>{children}</h2>
}

function h3({ children }) {
  <h3>{children}</h3>
}

function h4({ children }) {
  <h4>{children}</h4>
}

function h5({ children }) {
  <h5>{children}</h5>
}

function h6({ children }) {
  <h6>{children}</h6>
}

export function useMDXComponents(components) {
  return { h1, h2, h3, h4, h5, h6, ...components };
}