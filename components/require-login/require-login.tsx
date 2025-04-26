import { Box, Button, Text } from '@chakra-ui/react'
import useAuth from '@hooks/useAuth';
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react';

interface RequireLoginProps {
  children: ReactNode
}

export const RequireLogin = ({ children }: RequireLoginProps) => {
  const router = useRouter()
  const { isAuthenticated } = useAuth()

  const handleLogin = () => {
    router.push('/login');
  }

  if (!isAuthenticated) {
    return (
      <Box
        textAlign="center"
        p={6}
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
      >
        <Text mb={4} fontSize="lg">
          Please login to continue
        </Text>

        <Button colorScheme="primary" onClick={handleLogin}>
          Login
        </Button>
      </Box>
    )
  }

  return <>{children}</>;
};
