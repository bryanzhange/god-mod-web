import { MainLayout } from '@components/layout'

export default function Layout(props: { children: React.ReactNode }) {
  return <MainLayout>{props.children}</MainLayout>
}
