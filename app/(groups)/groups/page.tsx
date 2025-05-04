'use client';

import { Box, Center, Image, List, ListItem, Stack, Text, useColorModeValue, useToast } from '@chakra-ui/react'
import { LoadingPopup } from '@components/loading';
import { RequireLogin } from '@components/require-login';
import useAuth from '@hooks/useAuth';
import { BackgroundGradient } from 'components/gradients/background-gradient'
import { PageTransition } from 'components/motion/page-transition'
import { Section } from 'components/section'
import { NextPage } from 'next'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'stores';
import { setGroups } from 'stores/slice/groupSlice';
import { hideLoading, showLoading } from 'stores/slice/pageSlice';
import { fetchGroups } from '@api/groups';
import { FiRefreshCw } from 'react-icons/fi';

const COLORS = [
  'teal.400',
  'blue.500',
  'purple.500',
  'orange.400',
  'red.400',
  'green.500',
]

const Groups: NextPage = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const toast = useToast()
  const bgActiveHoverColor = useColorModeValue('gray.100', 'whiteAlpha.100')
  const isLoading = useSelector((state: RootState) => state.page.isLoading)
  const groups = useSelector((state: RootState) => state.groups.groups)
  const { isAuthenticated, user } = useAuth()
  const [isRefresing, setRefresing] = useState(false)

  useEffect(() => {
    fetchGroupsData(true)
  }, [isAuthenticated])

  const onRefresh = async () => {
    if (isRefresing) return
    setRefresing(true)
    await fetchGroupsData()
    setRefresing(false)
  }

  const fetchGroupsData = async (init?: boolean) => {
    if (!isAuthenticated || !user) {
      dispatch(setGroups([]))
      return
    }
    const isEmpty = !groups?.length
    if (isEmpty && init) dispatch(showLoading())
    try {
      const data = await fetchGroups(user.id)
      dispatch(setGroups(data))
    } catch (error) {
      dispatch(setGroups([]))
      toast({
        title: 'Failed to fetch groups',
        description: error?.toString() || '',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top'
      })
    }
    if (init) dispatch(hideLoading())
  }

  const onClick = (id: number | string) => {
    router.push(`/group/${id}`)
  }

  return (
    <Section innerWidth="container.md">
      <LoadingPopup isOpen={isLoading} />
      <BackgroundGradient zIndex="-1" />
      <Center height="100%">
        <PageTransition width="100%">
          <RequireLogin>
            <Stack direction="row" gap={4} alignItems="center" marginBottom={4}>
              <Text fontSize="2xl" fontWeight="700" color="primary.400">Groups</Text>
              <FiRefreshCw
                size={20}
                strokeWidth={3}
                style={{ stroke: 'var(--chakra-colors-primary-500)' }}
                cursor={isRefresing ? 'default' : 'pointer'}
                opacity={isRefresing ? 0.5 : 1}
                onClick={() => onRefresh()}
              />
            </Stack>
            <List gap="1rem" display="flex" flexDirection="column">
              {
                groups.length ?
                  groups.map((v) => <ListItem key={v.id}>
                    <Box
                      flex="1"
                      minH="40px"
                      px="4"
                      py="3"
                      transition="0.2s all"
                      fontWeight="semibold"
                      borderColor="gray.400"
                      borderWidth="1px"
                      borderRadius="8px"
                      cursor="pointer"
                      _hover={{
                        bg: bgActiveHoverColor,
                      }}
                      onClick={() => onClick(v.chatId)}
                    >
                      <Stack direction="row" alignItems="center">
                        {
                          v.avatar ?
                            <Image src={v.avatar} w="48px" h="48px" borderRadius="50%" /> :
                            <Stack w="48px" h="48px" borderRadius="50%" alignItems="center" justifyContent="center" background={COLORS[v.id % COLORS.length]}>
                              <Text fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}>{v.chatTitle?.charAt(0)}</Text>
                            </Stack>
                        }
                        <Stack direction="column">
                          <Text>{v.chatTitle || ''}</Text>
                          <Text fontSize="sm" opacity={0.75}>{v.chatId}</Text>
                          <Stack direction="row" alignItems="center">
                            <Text fontSize="sm" opacity={0.5}>{v.isSuperGroup ? 'Super Group' : 'Normal Group'}</Text>
                          </Stack>
                        </Stack>
                      </Stack>
                    </Box>
                  </ListItem>) :
                  <Stack direction="column">
                    <Text size="xl">There are no groups!</Text>
                  </Stack>
              }
            </List>
          </RequireLogin>
        </PageTransition>
      </Center>
    </Section>
  )
}

export default Groups
