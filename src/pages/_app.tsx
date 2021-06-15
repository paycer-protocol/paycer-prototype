import { AppProps } from 'next/app'
import I18nProvider from '../locales/i18n'

const App = ({ Component, pageProps }: AppProps) => (
    <I18nProvider>
        <Component {...pageProps} />
    </I18nProvider>
)

export default App
