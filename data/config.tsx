import { Link } from '@saas-ui/react'
import { NextSeoProps } from 'next-seo'
import { FaGithub, FaTwitter } from 'react-icons/fa'
import { Logo } from './logo'

const siteConfig = {
  logo: Logo,
  seo: {
    title: 'God Mod',
    description: 'The God Mod for managing your telegram groups',
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
      }
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
  }
}

export default siteConfig
