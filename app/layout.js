import { config, library } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'

config.autoAddCss = false

// This exports the whole icon packs for Brand and Solid.
library.add(fab, far, fas)

import '@/styles/globals.css'

export default function RootLayout({ params, children }) {
  return (
    <html className="bg-base-300">
      <body className="container mx-auto py-8 bg-base-300">{children}</body>
    </html>
  )
}
