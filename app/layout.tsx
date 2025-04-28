'use client';

import { Metadata } from 'next';
import { ProviderLayout } from './provider'

export const meta: Metadata = {
  title: 'God Mod',
  description: 'God Mod',
}

export default function Layout(props: { children: React.ReactNode }) {

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/static/favicons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/static/favicons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/static/favicons/favicon-16x16.png"
        />
        <link rel="manifest" href="/static/favicons/manifest.json" />
      </head>
      <body>
        <ProviderLayout>{props.children}</ProviderLayout>
      </body>
    </html>
  )
}
