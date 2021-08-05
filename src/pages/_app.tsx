import React, { useEffect } from 'react'
import { AppProps } from 'next/app'
import Router from 'next/router'
import NProgress from 'nprogress'
import { ToastContainer } from 'react-toastify'
import TagManager from 'react-gtm-module'
import I18nProvider from '../locales/i18n'
import Web3Context from '@components/organisms/web3/web3-context'
import Layout from '@components/organisms/layout'
import '../../assets/theme-universe.scss'

Router.events.on('routeChangeStart', NProgress.start)
Router.events.on('routeChangeComplete', NProgress.done)
Router.events.on('routeChangeError', NProgress.done)

const tagManagerArgs = {
  gtmId: 'G-H24T1CYZ06',
}

const App = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    TagManager.initialize(tagManagerArgs)
  }, [])

  return (
    <Web3Context>
      <I18nProvider>
        <Layout>
          <ToastContainer position="top-center" />
          <Component {...pageProps} />
        </Layout>
      </I18nProvider>
    </Web3Context>
  )
}

export default App
