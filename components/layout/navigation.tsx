import { Box, Button, HStack, Menu, MenuButton, MenuItem, MenuList, Stack } from '@chakra-ui/react'
import { useDisclosure, useUpdateEffect } from '@chakra-ui/react'
import { useScrollSpy } from 'hooks/use-scrollspy'
import { usePathname } from 'next/navigation'

import * as React from 'react'

import { MobileNavButton } from '@components/mobile-nav'
import { MobileNavContent } from '@components/mobile-nav'
import { NavLink } from '@components/nav-link'
import siteConfig from '@data/config'

import ThemeToggle from './theme-toggle'
import useAuth from '@hooks/useAuth'
import { ChevronDownIcon } from '@saas-ui/react'
import { FaUser } from 'react-icons/fa'
import { FiLock, FiLogOut } from 'react-icons/fi'


const Navigation: React.FC = () => {
  const mobileNav = useDisclosure()
  const path = usePathname()
  const { logout, isAuthenticated, user } = useAuth()

  const onLogout = () => {
    logout()
  }

  const activeId = useScrollSpy(
    siteConfig.header.links
      .filter(({ id }) => id)
      .map(({ id }) => `[id="${id}"]`),
    {
      threshold: 0.75,
    },
  )

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

  const mobileNavBtnRef = React.useRef<HTMLButtonElement>()

  useUpdateEffect(() => {
    mobileNavBtnRef.current?.focus()
  }, [mobileNav.isOpen])

  return (
    <HStack spacing="2" flexShrink={0}>
      {links.map(({ href, id, ...props }, i) => {
        return (
          <NavLink
            display={['none', null, 'block']}
            href={href || `/#${id}`}
            key={i}
            isActive={
              !!(
                (id && activeId === id) ||
                (href && !!path?.match(new RegExp(href)))
              )
            }
            {...props}
          >
            {props.label}
          </NavLink>
        )
      })}

      {isAuthenticated && <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />} display={['none', null, 'flex']}>
          <Stack direction="row" alignItems="center">
            <FaUser />
            <Box maxW="100px" isTruncated>
              {user?.email}
            </Box>
          </Stack>
        </MenuButton>
        <MenuList>
          <MenuItem icon={<FiLock />}>
            Change password
          </MenuItem>
          <MenuItem icon={<FiLogOut />} onClick={onLogout}>
            Logout
          </MenuItem>
        </MenuList>
      </Menu>}

      <ThemeToggle />

      <MobileNavButton
        ref={mobileNavBtnRef}
        aria-label="Open Menu"
        onClick={mobileNav.onOpen}
      />

      <MobileNavContent isOpen={mobileNav.isOpen} onClose={mobileNav.onClose} />
    </HStack>
  )
}

export default Navigation
