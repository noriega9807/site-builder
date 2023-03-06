import dynamic from 'next/dynamic'

export const getComponent = (params) => {
  const Component = dynamic(() =>
    import(`../components/${params?.componentName}`),
  )
  return Component ? <Component {...params.value} key={params?.index} /> : null
}
