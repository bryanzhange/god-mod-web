'use client'

import { AuthProvider } from '@saas-ui/auth'
import { SaasProvider } from '@saas-ui/react'
import { Provider } from 'react-redux'
import { createAuthService } from 'service/auth-service'

import { theme } from '@theme'
import store from 'stores'
import { Wrapper } from '@components/layout'

const authService = createAuthService()

export function ProviderLayout(props: { children: React.ReactNode }) {

  return (
    <Provider store={store}>
      <SaasProvider theme={theme}>
        <AuthProvider {...authService}>
          <Wrapper>
            {props.children}
          </Wrapper>
        </AuthProvider>
      </SaasProvider>
    </Provider>
  )
}
