import { Suspense } from 'react'
import { MDXRemote } from 'next-mdx-remote/rsc'

export default function paragraph({ text }) {
  return (
    <Suspense fallback={<>Loading...</>}>
      <div className="prose">
        <MDXRemote source={text} />
      </div>
    </Suspense>
  )
}
