const STRAPI_URL = process.env.STRAPI_URL

// Helper function to GET the articles from Strapi
async function fetchPagesApi(locale) {
  const requestUrl = `${STRAPI_URL}/page-builders?locale=${locale}&fields[0]=url&fields[1]=name`
  const options = {
    next: { revalidate: 0 },
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }
  const response = await fetch(requestUrl, options)
  const { data, errors } = await response.json()
  if (errors) {
    throw new Error('Failed to fetch data')
  }

  return data
}

// Helper function to GET a single page from Strapi
async function fetchPageApi(locale, url) {
  const requestUrl = `${STRAPI_URL}/page-builders?locale=${locale}&filters[url][$eq]=${url}&populate=Components,metadata.image`
  const options = {
    next: { revalidate: 0 },
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }
  const response = await fetch(requestUrl, options)

  const { data, errors } = await response.json()
  if (errors) {
    throw new Error('Failed to fetch data')
  }

  return data?.[0]?.attributes
}

// Helper function to GET a single page from Strapi which is in draft state
async function fetchPagePreviewApi(locale, url) {
  const requestUrl = `${STRAPI_URL}/page-builders?publicationState=preview&locale=${locale}&filters[url][$eq]=${url}&populate=Components,metadata.image`
  const options = {
    next: { revalidate: 0 },
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }
  const response = await fetch(requestUrl, options)
  const { data, errors } = await response.json()
  if (errors) {
    throw new Error('Failed to fetch data')
  }

  return data?.[0]?.attributes
}

export { fetchPagesApi, fetchPageApi, fetchPagePreviewApi }
