'use client';

import useAuth from '@hooks/useAuth';
import { Center, Stack, useToast } from '@chakra-ui/react'
import { Auth, AuthParams, AuthProviderProps } from '@saas-ui/auth'
import { Link } from '@saas-ui/react'
import { BackgroundGradient } from 'components/gradients/background-gradient'
import { PageTransition } from 'components/motion/page-transition'
import { Section } from 'components/section'
import { NextPage } from 'next'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FaGithub, FaGoogle } from 'react-icons/fa'
import { Logo } from '@components/layout/logo';

const providers = {
  google: {
    name: 'Google',
    icon: FaGoogle,
  },
  github: {
    name: 'Github',
    icon: FaGithub,
    variant: 'solid',
  },
}

const Login: NextPage = (props: AuthProviderProps) => {
  const router = useRouter()
  const toast = useToast()
  const { login, isAuthenticated, user } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      router.push(user?.role === 'admin' ? '/settings' : '/groups') // role for demo only
    }
  }, [isAuthenticated])

  const handleLogin = async (data: AuthParams) => {
    const result = await login(data.email as string, data.password as string);
    if (!result) {
      showErrorToast();
    }
  }

  const handleForgotPassword = async (data: AuthParams) => {
    console.log('email', data.email)
  }

  const handleSuccess = async (view: string, data: AuthParams) => {
    switch(view) {
      case 'login':
        await handleLogin(data)
        break
      case 'forgot_password':
        await handleForgotPassword(data);
        break
    }
  }

  const showErrorToast = () => {
    toast({
      title: 'Login Failed',
      description: 'Your email or password is incorrect!',
      status: 'error',
      duration: 5000,
      isClosable: true,
      position: 'top'
    })
  }

  return (
    <Section height="calc(100vh - 200px)" innerWidth="container.sm">
      <BackgroundGradient zIndex="-1" />
      <Center height="100%" pt="20">
        <PageTransition width="100%">
          <Stack direction="row" justifyContent="center" marginBottom={8}>
            <Logo />
          </Stack>
          <Auth
            type="password"
            // providers={providers}
            signupLink={<Link href="/signup">Sign up</Link>}
            onSuccess={handleSuccess}
          />
        </PageTransition>
      </Center>
    </Section>
  )
}

export default Login
