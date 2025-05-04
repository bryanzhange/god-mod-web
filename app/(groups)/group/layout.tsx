import { MainLayout } from '@components/layout'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'God Mod - Group Details',
  description: 'View and manage your Telegram group with God Mod'
}

export default function Layout(props: { children: React.ReactNode }) {
  return <MainLayout>{props.children}</MainLayout>
}
