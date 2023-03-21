import Head from 'next/head'
import Image from 'next/image'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'

import { Inter } from 'next/font/google'

import { fetchPageApi, fetchPagePreviewApi } from '/lib/pages'
import { getComponent } from '../../../utils/components'
import ExitPreview from '@/components/ExitPreview'

const inter = Inter({ subsets: ['latin'] })

async function getData(params, preview) {
  const isPreview = preview
  const url = !params?.slug ? '/' : params?.slug?.join('/')

  const response = isPreview
    ? await fetchPagePreviewApi(params?.locale, url)
    : await fetchPageApi(params?.locale, url)
  return { response, previewMode: isPreview }
}

export async function generateMetadata({ params }) {
  const cookieStore = cookies()
  const preview = cookieStore.has('preview') || null
  const data = await getData(params, preview)
  if (!data.response) return {}
  const { metadata } = data?.response
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

export default async function Builder({ params }) {
  const cookieStore = cookies()
  const preview = cookieStore.has('preview') || false
  const data = await getData(params, preview)
  if (!data.response) notFound()
  const page = data?.response?.Components?.map((elem, index) =>
    checkComponent(elem, index),
  )
  return (
    <>
      {data?.previewMode && <ExitPreview />}
      {page}
    </>
  )
}
