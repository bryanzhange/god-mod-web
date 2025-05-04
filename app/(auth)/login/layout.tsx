import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'God Mod - Login Page',
  description: 'Login page for God Mod'
}

export default function Layout(props: { children: React.ReactNode }) {
  return props.children
}
