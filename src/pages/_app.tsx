import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { appWithTranslation } from 'next-i18next'
import { IntlProvider } from 'react-intl'

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter()
  const { locale, defaultLocale } = router

  return (
      <IntlProvider locale={locale} defaultLocale={defaultLocale}>
        <Component {...pageProps} />
      </IntlProvider>
  )
}

export default appWithTranslation(App)
