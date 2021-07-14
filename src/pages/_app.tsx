import { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'
import I18nProvider from '../locales/i18n'
import Web3Context from '@components/organisms/web3/web3-context'
import Layout from '@components/organisms/layout'
import '../../assets/theme-dark.scss'

const App = ({ Component, pageProps }: AppProps) => (
    <Web3Context>
        <I18nProvider>
            <Layout>
                <ToastContainer />
                <Component {...pageProps} />
            </Layout>
        </I18nProvider>
    </Web3Context>
)

export default App
