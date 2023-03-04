import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'

export const metadata = {
  title: 'hello',
}

const inter = Inter({ subsets: ['latin'] })

export default async function Builder({ restaurants, error }) {
  if (error) {
    return <div>An error occured: {error.message}</div>
  }
  return <p> pages</p>
}
