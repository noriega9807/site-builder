import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'

import { getComponent } from '../../../utils/components'

const inter = Inter({ subsets: ['latin'] })

async function getData(params) {
  const url = !params?.slug ? '/' : params?.slug?.join('/')
  const response = await fetch(
    `http://127.0.0.1:1337/api/page-builders?locale=${params?.locale}&filters[url][$eq]=${url}&populate=Components,metadata.image`,
    {
      next: { revalidate: 10 },
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

  return data?.[0]?.attributes
}

export async function generateMetadata({ params }) {
  const data = await getData(params)
  const { metadata } = data
  const metadataImage = metadata?.image?.data?.attributes
  return {
    title: metadata.title,
    description: metadata.description,
    generator: 'Next.js',
    applicationName: 'Erick Noriega site builder',
    referrer: 'origin-when-cross-origin',
    keywords: [
      'Next.js',
      'React',
      'JavaScript',
      'Strapi',
      'Erick',
      'Noriega',
      'Site',
      'Builder',
    ],
    authors: [{ name: 'Erick Noriega' }],
    creator: 'Erick Noriega',
    publisher: 'Erick Noriega',
    openGraph: {
      title: metadata?.ogTitle,
      description: metadata?.ogDescription,
      url: 'https://nextjs.org',
      siteName: 'localhost.com',
      images: [
        {
          url: `http://127.0.0.1:1337${metadataImage?.formats?.thumbnail?.url}`,
          width: metadataImage?.formats?.thumbnail?.width,
          height: metadataImage?.formats?.thumbnail?.height,
        },
      ],
      locale: 'en-US',
      type: 'website',
    },
    robots: {
      index: !metadata?.noIndex,
      follow: !metadata?.noIndex,
      nocache: true,
      googleBot: {
        index: !metadata?.noIndex,
        follow: !metadata?.noIndex,
        noimageindex: !metadata?.noIndex,
      },
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata?.title,
      description: metadata.description,
      siteId: '1467726470533754880',
      creator: '@ErickNo71402267',
      creatorId: '1578602062081925122',
      images: [
        `http://127.0.0.1:1337${metadataImage?.formats?.thumbnail?.url}`,
      ],
    },
  }
}

const checkComponent = (elem, index) => {
  const componentName = elem?.__component.split('.').pop()
  const object = {
    componentName,
    value: elem,
    index: `${componentName}+${index}`,
  }

  return getComponent(object)
}

export default async function Builder({ params, error }) {
  const data = await getData(params)
  if (error) {
    return <div>An error occured: {error.message}</div>
  }
  const page = data?.Components?.map((elem, index) =>
    checkComponent(elem, index),
  )
  return <>{page} </>
}
