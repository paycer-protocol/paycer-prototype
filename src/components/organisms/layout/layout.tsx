import React from 'react'
import Header from '@components/organisms/header'
import Footer from '@components/organisms/footer'

export interface LayoutProps {
    children: any
}

const Layout = (props: LayoutProps) => {
    const { children } = props

    return (
        <>
            <Header />
            <main role="main">
                {children}
            </main>
            <Footer />
        </>
    )
}

export default Layout
