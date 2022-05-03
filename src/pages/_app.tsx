import React from 'react'
import { AppProps } from 'next/app'
import Router from 'next/router'
import NProgress from 'nprogress'
import { ToastContainer } from 'react-toastify'
import I18nProvider from '../locales/i18n'
import Web3Context from '@components/organisms/web3/web3-context'
import '../../assets/theme-universe.scss'

Router.events.on('routeChangeStart', NProgress.start)
Router.events.on('routeChangeComplete', NProgress.done)
Router.events.on('routeChangeError', NProgress.done)

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Web3Context>
      <I18nProvider>
        <ToastContainer position="top-center" />
       <Component {...pageProps} />
      </I18nProvider>
    </Web3Context>
  )
}

export default App
