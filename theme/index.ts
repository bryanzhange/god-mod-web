import { extendTheme } from '@chakra-ui/react'
import '@fontsource-variable/inter'
import { theme as baseTheme } from '@saas-ui/react'

import components from './components'
import { fontSizes } from './foundations/typography'

export const theme = extendTheme(
  {
    config: {
      initialColorMode: 'dark',
      useSystemColorMode: false,
    },
    styles: {
      global: (props: any) => ({
        body: {
          color: 'gray.900',
          bg: 'white',
          fontSize: 'lg',
          _dark: {
            color: 'white',
            bg: 'gray.900',
          },
        },
        '.chakra-modal__content-container': {
          outline: 'none !important',
          boxShadow: 'none !important',
        },
      }),
    },
    fonts: {
      heading: 'Inter Variable, Inter, sans-serif',
      body: 'Inter Variable, Inter, sans-serif',
    },
    fontSizes,
    components,
    colors: {
      primary: {
        50: '#fffaf0',
        100: '#feebc8',
        200: '#fbd38d',
        300: '#f6ad55',
        400: '#ed8936',
        500: '#dd6b20',
        600: '#c05621',
        700: '#9c4221',
        800: '#7b341e',
        900: '#652b19',
      },
    },
  },
  baseTheme,
)
