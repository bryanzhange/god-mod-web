import { MainLayout } from '@components/layout'

export const metadata = {
  title: 'God Mod - Welcome to Our Landing Page',
  description: 'Landing page for God Mod',
}

export default function Layout(props: { children: React.ReactNode }) {
  return <MainLayout>{props.children}</MainLayout>
}
