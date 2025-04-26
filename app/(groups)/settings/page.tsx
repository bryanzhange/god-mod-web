'use client';

import { Box, Button, Center, FormControl, FormLabel, Select, Stack, Text, Textarea } from '@chakra-ui/react'
import { RequireLogin } from '@components/require-login';
import useAuth from '@hooks/useAuth';
import { BackgroundGradient } from 'components/gradients/background-gradient'
import { PageTransition } from 'components/motion/page-transition'
import { Section } from 'components/section'
import { NextPage } from 'next'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

enum ACTIONS {
  None = 0,
  Notify = 1,
  Delete = 2,
  Kick = 3,
  Ban = 4
}

enum TYPES {
  LINK = 'link',
  PORN = 'porn',
  CUSS_WORDS = 'cuss_words'
}

const RULE_TYPES = [
  {
    label: 'Link',
    value: TYPES.LINK
  },
  {
    label: 'Porn',
    value: TYPES.PORN
  },
  {
    label: 'Cuss words',
    value: TYPES.CUSS_WORDS
  }
]

const RULE_ACTIONS = [
  {
    label: 'None',
    value: ACTIONS.None
  },
  {
    label: 'Notify',
    value: ACTIONS.Notify
  },
  {
    label: 'Delete',
    value: ACTIONS.Delete
  },
  {
    label: 'Kick',
    value: ACTIONS.Kick
  },
  {
    label: 'Ban',
    value: ACTIONS.Ban
  }
]

const DEFAULT_RULES: Record<TYPES, ACTIONS> = {
  [TYPES.LINK]: ACTIONS.Notify,
  [TYPES.PORN]: ACTIONS.Notify,
  [TYPES.CUSS_WORDS]: ACTIONS.Notify
}

const Settings: NextPage = () => {
  const router = useRouter()
  const [message, setMessage] = useState('')
  const [isDisabled, setIsDisabled] = useState(true)
  const [settings, setSettings] = useState<Record<string, number>>(DEFAULT_RULES)

  const { isAuthenticated, user } = useAuth()

  useEffect(() => {
    if (isAuthenticated && user?.role !== 'admin') router.push('/')
  }, [user])

  const handleMessageChange = (message: string) => {
    setMessage(message)
    setIsDisabled(!message)
  }

  const handleChange = (ruleType: TYPES, actionValue: string) => {
    setSettings(prev => ({
      ...prev,
      [ruleType]: Number(actionValue) as ACTIONS
    }))
  }

  const onSubmit = () => {
    console.log({ message, settings })
  }

  if (isAuthenticated && user?.role !== 'admin') return <></>

  return (
    <Section innerWidth="container.md">
      <BackgroundGradient zIndex="-1" />

      <Center height="100%">
        <PageTransition width="100%">
          <RequireLogin>
            <Stack maxW="container.xl" px="8" py="2" spacing={4}>
              <Stack direction="row" alignItems="center">
                <Text fontSize="md" color="primary.500" fontWeight={700}>Settings</Text>
              </Stack>
            </Stack>
            <Stack maxW="container.xl" px="8" py="2" spacing={8}>
              <Stack alignItems="flex-start">
                <Text fontSize="md" color="muted">
                  What kind of messages would you like me to keep an eye on?
                </Text>
                <Textarea
                  name="message"
                  value={message}
                  placeholder="Enter your message"
                  rows={5}
                  resize="none"
                  onChange={(e) => handleMessageChange(e.target.value)}
                  _placeholder={{ color: 'gray.500' }}
                  _focus={{
                    borderColor: 'blue.500',
                    boxShadow: 'none',
                  }}
                  borderRadius="sm"
                  p={4}
                />
              </Stack>

              <Stack alignItems="flex-start">
                <Text fontSize="md" color="muted">
                  And what would you like me to do when I found these messages?
                </Text>
                <Box>
                  {RULE_TYPES.map(rule => (
                    <FormControl display="flex" alignItems="center" key={rule.value} mb={8}>
                      <FormLabel w={100}>{rule.label}</FormLabel>
                      <Select
                        w={150}
                        maxW="100%"
                        value={settings[rule.value]}
                        onChange={e => handleChange(rule.value, e.target.value)}
                      >
                        {RULE_ACTIONS.map(action => (
                          <option key={action.value} value={action.value}>
                            {action.label}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  ))}
                </Box>
              </Stack>

              <Button
                isDisabled={isDisabled}
                colorScheme="primary"
                size="lg"
                maxW="90%"
                w="300px"
                marginInline="auto"
                _hover={{
                  opacity: 0.8
                }}
                onClick={onSubmit}
              >
                Submit
              </Button>
            </Stack>
          </RequireLogin>
        </PageTransition>
      </Center>
    </Section>
  )
}

export default Settings
