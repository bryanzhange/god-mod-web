'use client';

import useAuth from '@hooks/useAuth';
import { Box, Center, Stack, useToast } from '@chakra-ui/react'
import { BackgroundGradient } from 'components/gradients/background-gradient'
import { PageTransition } from 'components/motion/page-transition'
import { Section } from 'components/section'
import { NextPage } from 'next'
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { Logo } from '@components/layout/logo';
import { TelegramAuthParams } from '@/api/auth';

const Login: NextPage = () => {
  const router = useRouter()
  const toast = useToast()
  const { login, isAuthenticated } = useAuth()
  const btnTelegram = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/groups')
    }
  }, [isAuthenticated])

  const onTelegramAuth = async (user: TelegramAuthParams) => {
    console.log('user', user)
    await login(user);
  }

  const initTelegramLogin = (botName: string) => {
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.async = true;
    script.setAttribute("data-telegram-login", botName);
    script.setAttribute("data-size", "large");
    script.setAttribute("data-onauth", "onTelegramAuth(user)");
    script.setAttribute("data-request-access", "write");
    btnTelegram.current?.appendChild(script);
  }

  useEffect(() => {
    (window as any).onTelegramAuth = onTelegramAuth;
    const botName = process.env.NEXT_PUBLIC_BOT_NAME;
    if (!botName) {
      toast({
        title: 'Missing bot name',
        description: 'Please configure your bot name in the environment variables',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top'
      })
      if (btnTelegram.current) btnTelegram.current.style.display = 'none';
      return;
    }
    initTelegramLogin(botName);
  }, [])

  return (
    <Section innerWidth="container.sm">
      <BackgroundGradient zIndex="-1" />
      <Center height="100%">
        <PageTransition width="100%">
          <Stack direction="row" justifyContent="center" marginBottom="5rem">
            <Logo />
          </Stack>
          <Stack direction="row" justifyContent="center">
            <Box as="div" ref={btnTelegram} />
          </Stack>
        </PageTransition>
      </Center>
    </Section>
  )
}

export default Login
