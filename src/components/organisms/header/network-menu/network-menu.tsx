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
import { Check2 } from '@styled-icons/bootstrap'
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
            <Dropdown label={network.chainName} desktopWidth={250} openBy="click" icon={Network}>
                <>
                    <div>
                        <div className="mb-4">
                            <h3 className="mb-0">{t`Network`}</h3>
                            <small className="text-muted" style={{fontSize: 10}}>
                                {t`Switch the Blockchain Network`}
                            </small>
                        </div>
                    </div>
                    {Object.keys(providers).map((chainId, index) => {
                        const provider = providers[chainId]
                        const isActive = wallet.isConnected && Number(chainId) === wallet.chainId
                        const isLast = Object.keys(providers).length === index +1

                        return (
                            <a title={provider.chainName} className={`${!isLast ? 'mb-4' : ''} d-flex align-items-center`} onClick={async () => {
                                await handleSwitchNetwork(provider)
                            }}>
                                <div className="d-flex align-items-center">
                                    <CurrencyIcon
                                        className="me-3"
                                        width={21}
                                        height={21}
                                        symbol={provider.nativeCurrency.symbol}
                                    />
                                    <div className="mb-0">{provider.chainName}</div>
                                </div>
                                {isActive &&
                                <div className="d-flex ms-3">
                                  <Icon color={'#00FF00'} component={Check2} size={23} />
                                </div>
                                }

                            </a>
                        )
                    })}
                </>
            </Dropdown>
        </>
    )
}

export default NetworkMenu
