import { appWithTranslation } from 'next-i18next'
import '../../assets/scss/bootstrap.scss'

const App = ({ Component, pageProps }) => {
  return (
    <Component {...pageProps} />
  )
}

export default appWithTranslation(App)
