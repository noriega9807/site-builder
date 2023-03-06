import { MDXRemote } from 'next-mdx-remote/rsc'

export default function paragraph({ text }) {
  return <MDXRemote source={text} />
}
