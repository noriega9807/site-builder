'use client'

import { useRouter, usePathname } from 'next/navigation'

export default function ExitPreview() {
  const router = useRouter()
  const pathname = usePathname()

  async function exitPreviewMode() {
    const response = await fetch(`/api/exit-preview?path=${pathname}`)
    console.log(response)
    if (response) {
      router.refresh()
    }
  }

  return (
    <div className="small text-muted border-bottom mb-3">
      <span>You are currently viewing in Preview Mode. </span>
      <a
        role="button"
        className="text-primary"
        onClick={() => exitPreviewMode()}
      >
        Turn Off Preview Mode
      </a>
    </div>
  )
}
