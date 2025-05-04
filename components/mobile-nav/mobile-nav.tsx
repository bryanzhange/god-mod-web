import {
  Box,
  Button,
  CloseButton,
  Flex,
  HStack,
  IconButton,
  IconButtonProps,
  LinkProps,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
  useUpdateEffect,
} from '@chakra-ui/react'
import { Link } from '@saas-ui/react'
import useRouteChanged from 'hooks/use-route-changed'
import { usePathname } from 'next/navigation'
import { AiOutlineMenu } from 'react-icons/ai'
import { RemoveScroll } from 'react-remove-scroll'

import * as React from 'react'

import { Logo } from '@components/layout/logo'
import siteConfig from '@data/config'
import useAuth from '@hooks/useAuth'
import { FiLogOut, FiUser } from 'react-icons/fi'

interface NavLinkProps extends LinkProps {
  label: string
  href?: string
  isActive?: boolean
}

function NavLink({ href, children, isActive, ...rest }: NavLinkProps) {
  const pathname = usePathname()
  const bgActiveHoverColor = useColorModeValue('gray.100', 'whiteAlpha.100')

  const [, group] = href?.split('/') || []
  isActive = isActive ?? pathname?.includes(group)

  return (
    <Link
      href={href}
      display="inline-flex"
      flex="1"
      minH="40px"
      px="8"
      py="3"
      transition="0.2s all"
      fontWeight={isActive ? 'semibold' : 'medium'}
      borderColor={isActive ? 'purple.400' : undefined}
      borderBottomWidth="1px"
      color={isActive ? 'white' : undefined}
      _hover={{
        bg: isActive ? 'purple.500' : bgActiveHoverColor,
      }}
      {...rest}
    >
      {children}
    </Link>
  )
}

interface MobileNavContentProps {
  isOpen?: boolean
  onClose?: () => void
}

export function MobileNavContent(props: MobileNavContentProps) {
  const { isOpen, onClose = () => { } } = props
  const closeBtnRef = React.useRef<HTMLButtonElement>(null)
  const bgColor = useColorModeValue('whiteAlpha.900', 'blackAlpha.900')
  const { logout, isAuthenticated, user } = useAuth()

  const onLogout = () => {
    logout()
  }

  useRouteChanged(onClose)
  const showOnBreakpoint = useBreakpointValue({ base: true, lg: false })

  const links = React.useMemo(() => {
    const links = siteConfig.header.links;
    const role = user?.role;
    return links
      .filter(link => {
        if (isAuthenticated) {
          if (link.isAuthenticated === false) return false;
          if (role !== 'admin' && link.role === 'admin') return false;
          return true;
        }
        return !link.isAuthenticated;
      })
      .map(({ isAuthenticated, ...rest }) => rest);
  }, [isAuthenticated, user])

  React.useEffect(() => {
    if (showOnBreakpoint == false) {
      onClose()
    }
  }, [showOnBreakpoint, onClose])

  useUpdateEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => {
        closeBtnRef.current?.focus()
      })
    }
  }, [isOpen])

  return (
    <>
      {isOpen && (
        <RemoveScroll forwardProps>
          <Flex
            direction="column"
            w="100%"
            bg={bgColor}
            h="100vh"
            overflow="auto"
            pos="absolute"
            inset="0"
            zIndex="modal"
            pb="8"
            backdropFilter="blur(5px)"
          >
            <Box>
              <Flex justify="space-between" px="8" pt="4" pb="4">
                <Logo />
                <HStack spacing="5">
                  <CloseButton ref={closeBtnRef} onClick={onClose} />
                </HStack>
              </Flex>
              <Stack alignItems="stretch" spacing="0">
                {links.map(
                  ({ href, id, label, ...props }, i) => {
                    return (
                      <NavLink
                        href={href || `/#${id}`}
                        key={i}
                        {...(props as any)}
                      >
                        {label}
                      </NavLink>
                    )
                  },
                )}

                {isAuthenticated && <Stack direction="column">
                  <NavLink
                    href={'/profile'}
                    label="Profile"
                  >
                    <Stack direction="row" alignItems="center">
                      <FiUser />
                      <Text>Profile</Text>
                    </Stack>
                  </NavLink>
                  <Box px="8" py="3" w="100%">
                    <Button
                      w="100%"
                      minH="40px"
                      display={'block'}
                      variant={'primary'}
                      onClick={onLogout}
                    >
                      <Stack direction="row" alignItems="center" justifyContent="center">
                        <FiLogOut />
                        <Text>Logout</Text>
                      </Stack>
                    </Button>
                  </Box>
                </Stack>}
              </Stack>
            </Box>
          </Flex>
        </RemoveScroll>
      )}
    </>
  )
}

export const MobileNavButton = React.forwardRef(
  (props: IconButtonProps, ref: React.Ref<any>) => {
    return (
      <IconButton
        ref={ref}
        display={{ base: 'flex', md: 'none' }}
        fontSize="20px"
        color={useColorModeValue('gray.800', 'inherit')}
        variant="ghost"
        icon={<AiOutlineMenu />}
        {...props}
        aria-label="Open menu"
      />
    )
  },
)

MobileNavButton.displayName = 'MobileNavButton'
