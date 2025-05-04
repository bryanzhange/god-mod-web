'use client'

import { SaasProvider } from '@saas-ui/react'
import { Provider } from 'react-redux'
import { theme } from '@theme'
import store from 'stores'
import { Wrapper } from '@components/layout'


export function ProviderLayout(props: { children: React.ReactNode }) {

  return (
    <Provider store={store}>
      <SaasProvider theme={theme}>
        <Wrapper>
          {props.children}
        </Wrapper>
      </SaasProvider>
    </Provider>
  )
}
