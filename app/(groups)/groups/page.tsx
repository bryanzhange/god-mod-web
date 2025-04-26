'use client';

import { Box, Center, List, ListItem, Text, useColorModeValue } from '@chakra-ui/react'
import { LoadingPopup } from '@components/loading';
import { RequireLogin } from '@components/require-login';
import useAuth from '@hooks/useAuth';
import { BackgroundGradient } from 'components/gradients/background-gradient'
import { PageTransition } from 'components/motion/page-transition'
import { Section } from 'components/section'
import { NextPage } from 'next'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'stores';
import { setGroups } from 'stores/slice/groupSlice';
import { hideLoading, showLoading } from 'stores/slice/pageSlice';


const Groups: NextPage = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const bgActiveHoverColor = useColorModeValue('gray.100', 'whiteAlpha.100')
  const isLoading = useSelector((state: RootState) => state.page.isLoading)
  const groups = useSelector((state: RootState) => state.groups.groups)
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    fetchGroups()
  }, [isAuthenticated])

  const fetchGroups = async () => {
    if (!isAuthenticated) return
    const isEmpty = !groups?.length;
    if (isEmpty) dispatch(showLoading())
    await new Promise((res) => setTimeout(res, 1000))
    dispatch(setGroups([123456789, -100000000]))
    if (isEmpty) dispatch(hideLoading())
  }

  const onClick = (id: number) => {
    router.push(`/group/${id}`)
  }

  return (
    <Section innerWidth="container.md">
      <LoadingPopup isOpen={isLoading} />
      <BackgroundGradient zIndex="-1" />
      <Center height="100%">
        <PageTransition width="100%">
          <RequireLogin>
            <Text fontSize="2xl" fontWeight="700" marginBottom={4} color="primary.400">Groups</Text>
            <List gap="1rem" display="flex" flexDirection="column">
              {
                groups.map((v, key) => <ListItem key={key}>
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
                    onClick={() => onClick(v)}
                  >
                    <Text>{v}</Text>
                  </Box>
                </ListItem>)
              }
            </List>
          </RequireLogin>
        </PageTransition>
      </Center>
    </Section>
  )
}

export default Groups
