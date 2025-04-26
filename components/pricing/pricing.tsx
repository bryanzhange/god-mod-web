import {
  Box,
  Divider,
  HStack,
  Heading,
  Icon,
  SimpleGrid,
  Stack,
  StackProps,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
  useBreakpointValue,
} from '@chakra-ui/react'
import { FiCheck } from 'react-icons/fi'

import React from 'react'

import {
  ButtonLink,
  ButtonLinkProps,
} from '@components/button-link/button-link'
import { BackgroundGradient } from '@components/gradients/background-gradient'
import { Section, SectionProps, SectionTitle } from '@components/section'
import useAuth from '@hooks/useAuth'

export interface PricingPlan {
  tier: string
  features: Array<string>
}

export interface PricingProps extends SectionProps {
  plans: Array<PricingPlan>
  description: React.ReactNode
  featureTitles: Array<string>
}

export const Pricing: React.FC<PricingProps> = (props) => {
  const { plans, featureTitles, title, description, ...rest } = props
  const { isAuthenticated } = useAuth()
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Section id="pricing" pos="relative" {...rest}>
      <BackgroundGradient height="100%" />
      <Box zIndex="2" pos="relative">
        <SectionTitle title={title} description={description}></SectionTitle>

        {isMobile ? (
          <HorizontalPlanList isAuthenticated={isAuthenticated} plans={plans} featureTitles={featureTitles} />
        ) : (
          <VerticalPlanList isAuthenticated={isAuthenticated} plans={plans} featureTitles={featureTitles} />
        )}

      </Box>
    </Section>
  )
}

const VerticalPlanList = ({ plans, featureTitles, isAuthenticated }: { plans: any[]; featureTitles: string[], isAuthenticated: boolean }) => {
  return (
    <TableContainer
      overflowX="auto"
      maxW="100%"
      borderRadius="md"
      border="1px solid"
      _dark={{ borderColor: 'gray.500' }}
      _light={{ borderColor: 'gray.200' }}
    >
      <Table variant="striped" colorScheme="teal" size="md">
        <Thead bg="primary.500">
          <Tr h={55}>
            <Th color="white" fontSize="1rem" whiteSpace="normal" wordBreak="break-word">Feature</Th>
            {plans.map((tier) => (
              <Th key={tier.tier} color="white" fontSize="1rem" whiteSpace="normal" wordBreak="break-word">
                {tier.tier}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {featureTitles.map((title, index) => (
            <Tr
              key={index}
              bg={index === featureTitles.length - 1 ? 'gray.50' : 'transparent'}
              fontWeight={index === featureTitles.length - 1 ? 'bold' : 'normal'}
            >
              <Td whiteSpace="normal">{title}</Td>
              {plans.map((tier) => (
                <Td key={tier.tier + index} whiteSpace="normal">
                  {tier.features[index]}
                </Td>
              ))}
            </Tr>
          ))}
          <Tr>
            <Td borderBottom="none"></Td>
            {plans.map((plan) => (
              <Td key={`${plan.tier}-action`} borderBottom="none">
                <Stack w="100%">
                  <ButtonLink colorScheme="primary" w={100} maxW="100%" href={isAuthenticated ? '#' : '/login'}>
                    {isAuthenticated ? plan.action || 'Buy' : 'Login'}
                  </ButtonLink>
                </Stack>
              </Td>
            ))}
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  )
}

const HorizontalPlanList = ({ plans, featureTitles, isAuthenticated }: { plans: any[]; featureTitles: string[], isAuthenticated: boolean }) => {
  return (
    <Stack direction={{ base: 'column', md: 'row' }} spacing={8} overflowX="auto" py={4}>
      {plans.map((plan, planIndex) => (
        <Box
          key={plan.tier}
          minW={{ base: '100%', md: '300px' }}
          borderWidth="1px"
          _dark={{ borderColor: 'white' }}
          _light={{ borderColor: 'gray.200' }}
          borderRadius="md"
          boxShadow="sm"
          p={4}
          flexShrink={0}
        >
          <Heading size="md" mb={4} textAlign="center" color="teal.600">
            {plan.tier}
          </Heading>
          <Stack spacing={3}>
            {featureTitles.map((feature, i) => (
              <Box key={i}>
                <Text fontSize="sm" color="gray.500">
                  {feature}
                </Text>
                <Text fontWeight={i === featureTitles.length - 1 ? 'bold' : 'normal'}>
                  {plan.features[i]}
                </Text>
                {i !== featureTitles.length - 1 && <Divider my={2} _dark={{ borderColor: 'white' }} _light={{ borderColor: 'gray.300' }} />}
              </Box>
            ))}
          </Stack>
          <Stack w="100%" alignItems="center">
            <ButtonLink colorScheme="primary" w={300} maxW="100%" mt={6} href={isAuthenticated ? '#' : '/login'}>
              {isAuthenticated ? plan.action || 'Buy' : 'Login'}
            </ButtonLink>
          </Stack>
        </Box>
      ))}
    </Stack>
  );
};
