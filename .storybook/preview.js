import './addon/intl'
import '../assets/theme.scss'

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: 'light',
    values: [
      {
        name: 'light',
        value: '#f9fbfd',
      },
      {
        name: 'dark',
        value: '#12263f',
      },
    ],
  },
}
