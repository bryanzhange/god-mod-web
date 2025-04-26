'use client';

import { Box, Center, Stack, Text } from '@chakra-ui/react'
import { Auth, PasswordForm } from '@saas-ui/auth'
import { Field, FormLayout, Link } from '@saas-ui/react'
import { NextPage } from 'next'
import NextLink from 'next/link'
import { FaGithub, FaGoogle } from 'react-icons/fa'

import { Features } from '@components/features'
import { BackgroundGradient } from '@components/gradients/background-gradient'
import { PageTransition } from '@components/motion/page-transition'
import { Section } from '@components/section'
import siteConfig from '@data/config'
import useAuth from '@hooks/useAuth';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

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

const SignUp: NextPage = () => {
  const router = useRouter()
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated])

  return (
    <Section height="100vh" innerWidth="container.xl">
      <BackgroundGradient
        zIndex="-1"
        width={{ base: 'full', lg: '50%' }}
        left="auto"
        right="0"
        borderLeftWidth="1px"
        borderColor="gray.200"
        _dark={{
          borderColor: 'gray.700',
        }}
      />
      <PageTransition height="100%" display="flex" alignItems="center">
        <Stack
          width="100%"
          alignItems={{ base: 'center', lg: 'flex-start' }}
          spacing="20"
          flexDirection={{ base: 'column', lg: 'row' }}
        >
          <Box pe="20">
            <NextLink href="/" style={{ marginBottom: 32, display: 'block' }}>
              <Box
                as={siteConfig.logo}
                width="160px"
                ms="4"
                mb={{ base: 8, lg: 16 }}
              />
            </NextLink>
            <Features
              display={{ base: 'none', lg: 'flex' }}
              columns={1}
              iconSize={4}
              flex="1"
              py="0"
              ps="0"
              maxW={{ base: '100%', xl: '80%' }}
              features={siteConfig.signup.features.map((feature) => ({
                iconPosition: 'left',
                variant: 'left-icon',
                ...feature,
              }))}
            />
          </Box>
          <Center height="100%" flex="1">
            <Box width="container.sm" pt="8" px="8">
              <PasswordForm
                noValidate
                onSubmit={(data) => console.log(data)}
                fields={{
                  submit: {
                    children: 'Sign up',
                  }
                }}
              >
                <FormLayout columns={2}>
                  <Field name="firstName" label="First name" rules={{ required: true }} />
                  <Field name="lastName" label="Last name" rules={{ required: true }} />
                </FormLayout>
                <Field name="company" label="Company" />
              </PasswordForm>
              <Text color="muted" fontSize="sm" mt="0.5rem">
                By signing up you agree to our{' '}
                <Link href={siteConfig.termsUrl} color="blue.600">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href={siteConfig.privacyUrl} color="blue.600">
                  Privacy Policy
                </Link>
              </Text>
            </Box>
          </Center>
        </Stack>
      </PageTransition>
    </Section >
  )
}

export default SignUp
