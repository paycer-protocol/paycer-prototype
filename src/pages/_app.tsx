import { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'

const App = ({ Component, pageProps }: AppProps) => {
  return (
      <Component {...pageProps} />
  )
}

export default appWithTranslation(App)
