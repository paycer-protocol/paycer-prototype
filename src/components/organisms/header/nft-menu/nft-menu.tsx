import React from 'react'
import styled from 'styled-components'
import {t, Trans} from '@lingui/macro'
import useWallet from '@hooks/use-wallet'
import Icon from "@components/atoms/icon";
import Dropdown from '@components/molecules/dropdown'
import { ChevronDown } from '@styled-icons/entypo'
import { ChevronUp } from '@styled-icons/entypo'
import useNetwork from "@hooks/use-network";
import {toast} from "react-toastify";
import {chainedNetworkProvider, mainNetProviders} from "@providers/networks"
import { Check2 } from '@styled-icons/bootstrap'
import RoundetIconButton from "@components/atoms/button/roundet-icon-button"
import {useMediaQuery} from "react-responsive"
import Link from "next/link";
import classnames from "classnames";
import { nftRoutes } from '@config/nft-routes'
import {useRouter} from "next/router";

function isDebug() {
    return window.location.hostname === 'localhost'
        || window.location.search === '?debug=1'
}

export const NetworkItem = styled.a`
`

const NftMenu = () => {
    const providers = isDebug() ? chainedNetworkProvider : mainNetProviders
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 991.98px)' })
    const { pathname } = useRouter()
    const wallet = useWallet()
    const isAuthenticatedRoute = (route, wallet) => (route.auth ? wallet.isConnected : true);
    const qualifiedNftRoutes = nftRoutes.filter((route) => isAuthenticatedRoute(route, wallet))

    const renderMenu = () => {
        return (
            <>
                <div>
                    {qualifiedNftRoutes.map((route, key) => (
                        <li className={`${key +1 === qualifiedNftRoutes.length ? 'mb-0' : 'mb-3'}`}  key={`nav${key}`}>
                            <Link href={route.path}>
                                <a className={classnames({'text-white': pathname == route.path}, 'nav-link p-0 text-nowrap')} title={route.label}>
                                    {route.label}
                                </a>
                            </Link>
                        </li>
                    ))}
                </div>

            </>
        )
    }

    return (
        <>
            {isTabletOrMobile ?
                renderMenu()
                : <Dropdown desktopWidth={300} openBy="click" opener={<RoundetIconButton toggleActive icon={ChevronDown} activeIcon={ChevronUp} label={t`NFT`} />}>
                    {renderMenu()}
                </Dropdown>
            }
        </>
    )
}

export default NftMenu
