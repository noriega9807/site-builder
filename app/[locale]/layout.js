import ThemeSelector from '@/components/ThemeSelector'

async function getData(locale) {
  const response = await fetch(
    `http://127.0.0.1:1337/api/page-builders?locale=${locale}&fields[0]=url&fields[1]=name`,
    {
      next: { revalidate: 0 },
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
  const { data, errors } = await response.json()
  if (errors) {
    throw new Error('Failed to fetch data')
  }

  return data
}

async function groupByPath(items) {
  const paths = {}

  for (const item of items) {
    if (item.attributes.url === '/') continue

    const [path, page] = item.attributes.url.split('/').filter(Boolean)

    if (!paths[path]) {
      paths[path] = {}
    }

    if (!paths[path][page]) {
      paths[path][page] = []
    }

    paths[path][page].push(item.attributes.name)
  }

  const result = []

  for (const path in paths) {
    const pages = paths[path]

    if (Object.keys(pages).length === 0) {
      result.push({ [path]: [] })
    } else {
      const pagesArray = []

      for (const page in pages) {
        pagesArray.push({ [page]: pages[page] })
      }

      result.push({ [path]: pagesArray })
    }
  }

  return result
}

export default async function DashboardLayout({ params, children }) {
  const locale = params?.locale
  const data = await getData(locale)
  const mapMenu = await groupByPath(data)
  return (
    <div>
      <div className="navbar bg-base-100 border border-teal-200 rounded-2xl mb-12">
        <div className="flex-1">
          <a href={`/${locale}/`} className="btn btn-ghost normal-case text-xl">
            Erick{' '}
          </a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            {mapMenu.map((link, index) => {
              const label = Object.keys(link)[0]
              const sublinks = link[label]
              return (
                <li tabIndex={0} key={index}>
                  <a href={`/${locale}/${label}`}>{label}</a>
                  {sublinks.length > 0 && (
                    <ul className="p-2 bg-base-100">
                      {sublinks.map((sublink, index) => {
                        const hrefLink = Object.keys(sublink)[0]
                        return (
                          <li key={index}>
                            <a href={`/${locale}/${label}/${hrefLink}`}>
                              {sublink[hrefLink]?.[0]}
                            </a>
                          </li>
                        )
                      })}
                    </ul>
                  )}
                </li>
              )
            })}
            <ThemeSelector />
          </ul>
        </div>
      </div>

      {children}
    </div>
  )
}
