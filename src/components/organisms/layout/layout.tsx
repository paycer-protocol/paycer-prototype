import React from 'react'
import Header from '../../organisms/header'

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
        </>
    )
}

export default Layout
