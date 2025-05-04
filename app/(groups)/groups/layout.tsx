import { MainLayout } from '@components/layout'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'God Mod - Groups',
  description: 'Browse and manage your Telegram groups with God Mod'
}

export default function Layout(props: { children: React.ReactNode }) {
  return <MainLayout>{props.children}</MainLayout>
}
