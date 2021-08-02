import React from 'react'
import Header from '@components/organisms/header'
import styled, { css } from 'styled-components'

export interface LayoutProps {
    children: any
}

const DemoBadge = styled.div`
    position: fixed;
    transform: rotate(48deg);
    right: -89px;
    top: 19px;
    line-height: 25px;
    font-size: 11px;
    width: 222px;
    padding-left: 3px;
    text-align: center;
    font-weight: 500;
    color: white;
    text-shadow: rgb(0 0 0) -1px 1px 7px;
    height: 19px;
    justify-content: center;
    display: flex;
    align-items: center;
    text-transform: uppercase;
    background: linear-gradient(101deg,#ca3dbf,#c3cef7);
    letter-spacing: 0.1px;
    z-index: 1;
`

const Layout = (props: LayoutProps) => {
    const { children } = props

    return (
        <>
            <Header />
            <main role="main">
                {children}
            </main>
            <DemoBadge>
                Demo
            </DemoBadge>
        </>
    )
}

export default Layout
