import React, { useState } from 'react'
import {t, Trans} from '@lingui/macro'
import useWallet from '@hooks/use-wallet'
import Icon from "@components/atoms/icon";
import Dropdown from '@components/molecules/dropdown'
import { Network } from '@styled-icons/entypo'
import useNetwork from "@hooks/use-network";
import {toast} from "react-toastify";
import {chainedNetworkProvider, mainNetProviders} from "@providers/networks";
import Button from "@components/atoms/button";
import { Copy, LogOut, RefreshCw, CheckCircle, Compass } from '@styled-icons/feather'
import CurrencyIcon from "@components/atoms/currency-icon";

function isDebug() {
    return window.location.hostname === 'localhost'
        || window.location.search === '?debug=1'
}

const NetworkMenu = () => {
    const providers = isDebug() ? chainedNetworkProvider : mainNetProviders
    const network = useNetwork()
    const wallet = useWallet()

    const handleSwitchNetwork = async provider => {
        try {
            await network.switchNetwork(provider)
        } catch (error) {
            if (error.code === -32002) {
                toast(<Trans>Network-Switch Pending, please open your Wallet</Trans>)
            }
            if (error.code === 4902) {
                toast(<Trans>Adding Network to Wallet ...</Trans>)
                try {
                    await network.addNetwork(provider)
                } catch (error) {
                    if (error.code === -32002) {
                        toast(<Trans>Previously added network Pending, please open your Wallet</Trans>)
                    }
                }
            }
        }
    }


    if (!wallet.isConnected) {
        return null
    }





    return (
        <>
            <Dropdown label={t`Network`} desktopWidth={300} openBy="click" icon={Network}>
                <>
                    {Object.keys(providers).map((chainId, index) => {
                        const provider = providers[chainId]
                        const isActive = wallet.isConnected && Number(chainId) === wallet.chainId
                        const isLast = Object.keys(providers).length === index +1

                        return (
                            <a title={provider.chainName} className={`${!isLast ? 'mb-4' : ''} d-flex justify-content-between align-items-center`} onClick={async () => {
                                await handleSwitchNetwork(provider)
                            }}>
                                <div className="d-flex align-items-center">
                                    <CurrencyIcon
                                        className="me-3"
                                        width={23}
                                        height={23}
                                        symbol={provider.nativeCurrency.symbol}
                                        style={{position: 'relative', left: '-3px'}}
                                    />
                                    <h3 className="mb-0">{provider.chainName}</h3>
                                </div>

                                <div className="d-flex">
                                    <Icon color={isActive ? '#00FF00' : '#FFFFFF'} component={isActive ? CheckCircle : RefreshCw} size={23} />
                                </div>
                            </a>
                        )
                    })}
                </>
            </Dropdown>
        </>
    )
}

export default NetworkMenu
