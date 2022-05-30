import React from 'react'
import Footer from '@components/organisms/footer'
import useNetwork from '@hooks/use-network'
import Header from "@components/organisms/header";

export interface NftRevealLayoutProps {
    children: any
}

const NftRevealLayout = (props: NftRevealLayoutProps) => {
    const {children} = props
    const network = useNetwork()

    return (
        <>
            <Header />
            <main role="main">
                {children}
            </main>
            <Footer/>
        </>
    )

}

export default NftRevealLayout

