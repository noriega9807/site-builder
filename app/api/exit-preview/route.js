import { NextResponse } from 'next/server'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const path = searchParams.get('path')

  const dateInThePast = new Date(0).toUTCString()
  const headers = new Headers({
    'Set-Cookie': 'preview=; expires=' + dateInThePast + '; path=/',
    Location: path,
    Status: '200 Found',
  })

  const response = new Response(null, {
    headers,
  })

  return response
}
