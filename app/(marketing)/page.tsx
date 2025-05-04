'use client'

import {
  Box,
  ButtonGroup,
  Container,
  Flex,
  Heading,
  Icon,
  IconButton,
  Stack,
  Tag,
  Text,
  VStack,
  Wrap,
  useClipboard,
} from '@chakra-ui/react'
import { Br } from '@saas-ui/react'
import type { NextPage } from 'next'
import {
  FiArrowRight,
  FiBarChart,
  FiClipboard,
  FiClock,
  FiCommand,
  FiGrid,
  FiLink,
  FiServer,
  FiShield,
  FiSliders,
  FiSmile,
  FiThumbsUp,
  FiUsers,
  FiZap,
} from 'react-icons/fi'

import * as React from 'react'

import { ButtonLink } from '@components/button-link/button-link'
import { Faq } from '@components/faq'
import { Features } from '@components/features'
import { BackgroundGradient } from '@components/gradients/background-gradient'
import { Hero } from '@components/hero'
import {
  Highlights,
  HighlightsItem,
  HighlightsTestimonialItem,
} from '@components/highlights'
import { FallInPlace } from '@components/motion/fall-in-place'
import { Pricing } from '@components/pricing/pricing'
import { Testimonial, Testimonials } from '@components/testimonials'
import { Em } from '@components/typography'
import faq from '@data/faq'
import pricing from '@data/pricing'
import testimonials from '@data/testimonials'

const Home: NextPage = () => {
  return (
    <Box>
      <HeroSection />

      <HighlightsSection />

      <FeaturesSection />

      <TestimonialsSection />

      <PricingSection />

      <FaqSection />
    </Box>
  )
}

const HeroSection: React.FC = () => {
  return (
    <Box position="relative" overflow="hidden">
      <BackgroundGradient height="100%" zIndex="-1" />
      <Container maxW="container.xl" pt={{ base: 40, lg: 48 }} pb="40">
        <Stack direction={{ base: 'column', lg: 'row' }} alignItems="center">
          <Hero
            id="home"
            justifyContent="flex-start"
            px="0"
            title={
              <FallInPlace>
                Manage your community
                <Br /> with ease
              </FallInPlace>
            }
            description={
              <FallInPlace delay={0.4} fontWeight="medium">
                God Mod is a <Em>Telegram bot</Em> designed to help you
                <Br /> automate moderation, manage roles,
                <Br /> and grow your community without the manual hassle.
              </FallInPlace>
            }
          >
            <FallInPlace delay={0.8}>
              <ButtonGroup spacing={4} alignItems="center" mt={4}>
                <ButtonLink colorScheme="primary" size="lg" href="/">
                  Get Started
                </ButtonLink>
                <ButtonLink
                  size="lg"
                  href="#"
                  variant="outline"
                  colorScheme="primary"
                  rightIcon={
                    <Icon
                      as={FiArrowRight}
                      sx={{
                        transitionProperty: 'common',
                        transitionDuration: 'normal',
                        '.chakra-button:hover &': {
                          transform: 'translate(5px)',
                        },
                      }}
                    />
                  }
                >
                  View Demo
                </ButtonLink>
              </ButtonGroup>
            </FallInPlace>
          </Hero>

          <Box
            height="600px"
            position="absolute"
            display={{ base: 'none', lg: 'block' }}
            left={{ lg: '60%', xl: '55%' }}
            width="80vw"
            maxW="1100px"
            margin="0 auto"
          >
            <FallInPlace delay={1}>
              <Box overflow="hidden" height="100%">
              </Box>
            </FallInPlace>
          </Box>
        </Stack>
      </Container>

      <Features
        id="benefits"
        columns={[1, 2, 4]}
        iconSize={4}
        innerWidth="container.xl"
        pt="20"
        features={[
          {
            title: 'Accessible',
            icon: FiSmile,
            description: 'Built to be easy for everyone. Accessible by design, helping all users navigate smoothly.',
            iconPosition: 'left',
            delay: 0.6,
          },
          {
            title: 'Customizable',
            icon: FiSliders,
            description:
              'Fully customize moderation rules, commands, and user roles to match your community’s needs.',
            iconPosition: 'left',
            delay: 0.8,
          },
          {
            title: 'Automated',
            icon: FiGrid,
            description:
              'Automate welcome messages, spam filtering, event triggers, and more to reduce manual work.',
            iconPosition: 'left',
            delay: 1,
          },
          {
            title: 'Efficient',
            icon: FiThumbsUp,
            description:
              'Save time and energy with pre-set rules and easy-to-use commands, designed to streamline group management.',
            iconPosition: 'left',
            delay: 1.1,
          },
        ]}
        reveal={FallInPlace}
      />
    </Box>
  )
}

const HighlightsSection = () => {
  const { value, onCopy, hasCopied } = useClipboard('yarn add @saas-ui/react')

  return (
    <Highlights>
      <HighlightsItem colSpan={[1, null, 2]} title="Core features">
        <VStack alignItems="flex-start" spacing="8">
          <Text color="muted" fontSize="xl">
            Get started for free with <Em>powerful group management features</Em>.
            Automate moderation, track analytics, create custom commands, and manage
            roles with ease. Everything you need to manage your Telegram community.
          </Text>

          {/* <Flex
            rounded="full"
            borderWidth="1px"
            flexDirection="row"
            alignItems="center"
            py="1"
            ps="8"
            pe="2"
            bg="primary.900"
            _dark={{ bg: 'gray.900' }}
          >
            <Box>
              <Text color="yellow.400" display="inline">
                yarn add
              </Text>{' '}
              <Text color="cyan.300" display="inline">
                god-mod-bot
              </Text>
            </Box>
            <IconButton
              icon={hasCopied ? <FiCheck /> : <FiCopy />}
              aria-label="Copy install command"
              onClick={onCopy}
              variant="ghost"
              ms="4"
              isRound
              color="white"
            />
          </Flex> */}
        </VStack>
      </HighlightsItem>
      <HighlightsItem title="Built for scalability">
        <Text color="muted" fontSize="lg">
          God Mod is designed to grow with your community. Whether you’re managing a small
          group or a massive community, our bot scales effortlessly to handle any challenge.
        </Text>
      </HighlightsItem>
      <HighlightsTestimonialItem
        name="Manager"
        description="Community Manager"
        avatar="/static/images/avatar.jpg"
        gradient={['primary.200', 'purple.500']}
      >
        “God Mod helped us automate everything from welcome messages to spam filtering. It
        saved us hours of manual work and let us focus on growing our community instead.”
      </HighlightsTestimonialItem>
      <HighlightsItem colSpan={[1, null, 2]} title="Start managing your community 2 steps ahead">
        <Text color="muted" fontSize="lg">
          We’ve taken care of the essentials, so you can focus on building your community and
          customizing your bot's behavior.
        </Text>
        <Wrap mt="8">
          {[
            'automation',
            'spam filtering',
            'custom commands',
            'role management',
            'event triggers',
            'analytics',
            'user insights',
            'scalability',
            'integrations',
            'moderation',
            'welcome messages',
            'notifications',
            'user permissions',
            'command triggers',
            'event scheduling',
            'performance',
            'custom alerts',
          ].map((value) => (
            <Tag key={value} variant="subtle" colorScheme="primary" rounded="full" px="3">
              {value}
            </Tag>
          ))}
        </Wrap>
      </HighlightsItem>
    </Highlights>
  )
}

const FeaturesSection = () => {
  return (
    <Features
      id="features"
      title={
        <Heading
          lineHeight="short"
          fontSize={['2xl', null, '4xl']}
          textAlign="left"
          as="p"
        >
          Not your standard <Br /> group management bot.
        </Heading>
      }
      description={
        <>
          God Mod gives you everything you need to manage your Telegram communities.
          <Br />
          Whether it's automation, moderation, or custom commands, we’ve got you covered.
        </>
      }
      align="left"
      columns={[1, 2, 3]}
      iconSize={4}
      features={[
        {
          title: '#Automation.',
          icon: FiZap,
          description:
            'Automate member management, welcome messages, and custom commands. Set it and forget it.',
          variant: 'inline',
        },
        {
          title: 'Moderation.',
          icon: FiShield,
          description:
            'Block spammers, set up custom ban rules, and keep your community safe with advanced moderation tools.',
          variant: 'inline',
        },
        {
          title: 'Analytics.',
          icon: FiBarChart,
          description:
            'Track activity, engagement, and growth with powerful analytics and detailed reports.',
          variant: 'inline',
        },
        {
          title: 'Custom Commands.',
          icon: FiCommand,
          description:
            'Create your own commands to automate responses, polls, and more. Take full control of your bot’s behavior.',
          variant: 'inline',
        },
        {
          title: 'User Roles.',
          icon: FiUsers,
          description:
            'Define custom roles and permissions for members. Automatically assign roles based on activity or behavior.',
          variant: 'inline',
        },
        {
          title: 'Integrations.',
          icon: FiLink,
          description:
            'Easily integrate with third-party services, bots, or APIs. Expand your bot’s functionality to meet your needs.',
          variant: 'inline',
        },
        {
          title: 'Event Triggers.',
          icon: FiClock,
          description:
            'Set up automatic events like birthday greetings, scheduled messages, or reminders — hands-off management at its best.',
          variant: 'inline',
        },
        {
          title: 'Reports & Insights.',
          icon: FiClipboard,
          description:
            'Get detailed reports on group activity, member behavior, and more. Fine-tune your community engagement strategy.',
          variant: 'inline',
        },
        {
          title: 'Scalability.',
          icon: FiServer,
          description: (
            <>
              Manage unlimited groups and scale effortlessly with God Mod's high-performance backend. Perfect for growing communities.
            </>
          ),
          variant: 'inline',
        },
      ]}
    />

  )
}

const TestimonialsSection = () => {
  const columns = React.useMemo(() => {
    return testimonials.items.reduce<Array<typeof testimonials.items>>(
      (columns, t, i) => {
        columns[i % 3].push(t)

        return columns
      },
      [[], [], []],
    )
  }, [])

  return (
    <Testimonials
      title={testimonials.title}
      columns={[1, 2, 3]}
      innerWidth="container.xl"
    >
      <>
        {columns.map((column, i) => (
          <Stack key={i} spacing="8">
            {column.map((t, i) => (
              <Testimonial key={i} {...t} />
            ))}
          </Stack>
        ))}
      </>
    </Testimonials>
  )
}

const PricingSection = () => {
  return (
    <Pricing {...pricing}>
      <Text p="8" textAlign="center" color="muted">
        VAT may be applicable depending on your location.
      </Text>
    </Pricing>
  )
}

const FaqSection = () => {
  return <Faq {...faq} />
}

export default Home
