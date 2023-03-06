import '@/styles/globals.css'

export default function RootLayout({ params, children }) {
  return (
    <html className="bg-base-300">
      <body className="container mx-auto py-8 bg-base-300">{children}</body>
    </html>
  )
}
