import { NextResponse } from 'next/server'

import { fetchPagePreviewApi } from '/lib/pages'

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const response = NextResponse

  const secret = searchParams.get('secret')
  const slug = searchParams.get('url')
  const locale = searchParams.get('locale') || 'en'

  if (secret !== process.env.CLIENT_PREVIEW_SECRET) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  if (!slug) {
    return new Response('Parameter `url` is not provided', {
      status: 400,
    })
  }

  const page = await fetchPagePreviewApi(locale, slug)
  if (page === null) {
    return new Response('Page not found', {
      status: 400,
    })
  }
  const res = NextResponse.redirect(
    `http://localhost:3000/${locale}/${page.url}`,
  )
  res.cookies.set('preview', true)

  return res
}
