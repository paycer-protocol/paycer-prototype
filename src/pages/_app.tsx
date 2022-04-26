import React from 'react'
import { AppProps } from 'next/app'
import Router from 'next/router'
import NProgress from 'nprogress'
import { ToastContainer } from 'react-toastify'
import I18nProvider from '../locales/i18n'
import { MoralisProvider, useMoralis } from 'react-moralis'
import Footer from '@components/organisms/footer'
import Layout from '@components/organisms/layout'
import '../../assets/theme-universe.scss'

Router.events.on('routeChangeStart', NProgress.start)
Router.events.on('routeChangeComplete', NProgress.done)
Router.events.on('routeChangeError', NProgress.done)

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <MoralisProvider appId={process.env.NEXT_PUBLIC_MORALIS_APP_ID} serverUrl={process.env.NEXT_PUBLIC_MORALIS_SERVER_URL}>
      <I18nProvider>
        <Layout>
          <ToastContainer position="top-center" />
          <Component {...pageProps} />
          <Footer />
        </Layout>
      </I18nProvider>
    </MoralisProvider>
  )
}

export default App
