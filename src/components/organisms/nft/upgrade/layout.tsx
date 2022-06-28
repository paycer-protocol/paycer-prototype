import React from 'react'
import Footer from '@components/organisms/footer'
import Header from "@components/organisms/header";

export interface NftUpgradeLayoutProps {
    children: any
}

const NftUpgradeLayout = (props: NftUpgradeLayoutProps) => {
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

export default NftUpgradeLayout

