'use client';

import { Button, Center, Radio, RadioGroup, Stack, Text } from '@chakra-ui/react'
import { RequireLogin } from '@components/require-login';
import { BackgroundGradient } from 'components/gradients/background-gradient'
import { PageTransition } from 'components/motion/page-transition'
import { Section } from 'components/section'
import { NextPage } from 'next'
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';

enum ACTIONS {
  None = 0,
  Notify = 1,
  Delete = 2,
  Kick = 3,
  Ban = 4
}

const Actions = [
  {
    title: 'None',
    value: ACTIONS.None
  },
  {
    title: 'Notify',
    value: ACTIONS.Notify
  },
  {
    title: 'Delete',
    value: ACTIONS.Delete
  },
  {
    title: 'Kick',
    value: ACTIONS.Kick
  },
  {
    title: 'Ban',
    value: ACTIONS.Ban
  }
]

const Group: NextPage = () => {
  const router = useRouter()
  const params = useParams();
  const id = params.id as string;

  const [value, setValue] = useState(ACTIONS.None);

  useEffect(() => {
    if (id) {
      console.log('Config ID:', id);
    }
  }, [id]);

  const handleChange = (val: string) => {
    setValue(Number(val));
  }

  const onSubmit = () => {
    console.log({ id, value })
  }

  return (
    <Section innerWidth="container.md">
      <BackgroundGradient zIndex="-1" />

      <Center height="100%">
        <PageTransition width="100%">
          <RequireLogin>
            <Stack maxW="container.xl" px="8" py="2" spacing={4}>
              <Stack direction="row" alignItems="center" w="fit-content" cursor="pointer" onClick={() => router.replace('/groups')}>
                <FiArrowLeft size={24} />
                <Text fontSize="md">Back</Text>
              </Stack>
              <Stack direction="row" alignItems="center">
                <Text fontSize="md" color="muted">Group ID:</Text>
                <Text fontSize="md" color="primary.500" fontWeight={700}>{id}</Text>
              </Stack>
            </Stack>
            <Stack maxW="container.xl" px="8" py="2" spacing={8}>
              <Stack alignItems="flex-start">
                <Text fontSize="md" color="muted">
                  What would you like to happen when a violation message is detected?
                </Text>
                <RadioGroup value={String(value)} onChange={handleChange}>
                  <Stack direction="column">
                    {
                      Actions.map(action =>
                        <Radio key={action.value} value={action.value.toString()}>{action.title}</Radio>
                      )
                    }
                  </Stack>
                </RadioGroup>
              </Stack>

              <Button
                colorScheme="primary"
                size="lg"
                maxW="250px"
                w="100%"
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

export default Group
