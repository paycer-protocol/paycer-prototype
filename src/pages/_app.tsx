import React from 'react'
import { AppProps } from 'next/app'
import Router from 'next/router'
import NProgress from 'nprogress'
import { ToastContainer } from 'react-toastify'
import I18nProvider from '../locales/i18n'
import DappContextProvider from '@context/dapp-context'
import { MoralisProvider } from 'react-moralis'
import '../../assets/theme-universe.scss'

Router.events.on('routeChangeStart', NProgress.start)
Router.events.on('routeChangeComplete', NProgress.done)
Router.events.on('routeChangeError', NProgress.done)

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <MoralisProvider appId={process.env.NEXT_PUBLIC_MORALIS_APP_ID} serverUrl={process.env.NEXT_PUBLIC_MORALIS_SERVER_URL}>
        <DappContextProvider>
            <I18nProvider>
                <ToastContainer position="top-center" />
                {/* @ts-ignore */ }
                <Component {...pageProps} />
            </I18nProvider>
        </DappContextProvider>
    </MoralisProvider>
  )
}

export default App
