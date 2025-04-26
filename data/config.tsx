import { Link } from '@saas-ui/react'
import { NextSeoProps } from 'next-seo'
import { FaGithub, FaTwitter } from 'react-icons/fa'
import { FiCheck } from 'react-icons/fi'
import { Logo } from './logo'

const siteConfig = {
  logo: Logo,
  seo: {
    title: 'God Mod',
    description: 'The God Mod for manager your telegram groups',
  } as NextSeoProps,
  termsUrl: '#',
  privacyUrl: '#',
  header: {
    links: [
      {
        label: 'Settings',
        href: '/settings',
        isAuthenticated: true,
        role: 'admin'
      },
      {
        label: 'Groups',
        href: '/groups',
        isAuthenticated: true
      },
      {
        id: 'features',
        label: 'Features',
      },
      {
        id: 'pricing',
        label: 'Pricing',
      },
      {
        id: 'faq',
        label: 'FAQ',
      },
      {
        label: 'Login',
        href: '/login',
        isAuthenticated: false
      },
      {
        label: 'Sign Up',
        href: '/signup',
        variant: 'primary',
        isAuthenticated: false
      },
    ],
  },
  footer: {
    copyright: (
      <>
        Built by{' '}
        <Link href="#">God Mod</Link>
      </>
    ),
    links: [
      {
        href: '#',
        label: 'Contact',
      },
      {
        href: '#',
        label: <FaTwitter size="14" />,
      },
      {
        href: '#',
        label: <FaGithub size="14" />,
      },
    ],
  },
  signup: {
    title: 'Start exploring God Mod',
    features: [
      {
        icon: FiCheck,
        title: 'Smart Moderation',
        description: 'Automatically detect spam, scams, and unwanted content — before your users even see it.',
      },
      {
        icon: FiCheck,
        title: 'Group Analytics',
        description: 'Get detailed stats on activity, engagement, and message trends across your Telegram groups.',
      },
      {
        icon: FiCheck,
        title: 'Custom Commands',
        description: 'Compose components to fit your needs and mix them together to create new onesCreate powerful bot commands tailored to your community’s needs, no coding required.',
      },
      {
        icon: FiCheck,
        title: 'Seamless Permissions',
        description: 'Manage admins, restrict users, and fine-tune roles with zero headache.',
      },
    ],
  },
}

export default siteConfig
