import React, { useState } from 'react'
import {t, Trans} from '@lingui/macro'
import Button from '@components/atoms/button'
import useWallet from '@hooks/use-wallet'
import WalletProvider from '@components/organisms/web3/wallet-provider'
import { connectors } from '@providers/connectors'
import { Wallet } from '@styled-icons/ionicons-sharp'
import Icon from "@components/atoms/icon";
import Dropdown from '@components/molecules/dropdown'
import useCopyClipboard from "@hooks/use-copy-clipboard";
import { Copy, CheckCircle, Compass } from '@styled-icons/feather'
import { SwitchCamera } from '@styled-icons/material'
import { PlugDisconnected } from '@styled-icons/fluentui-system-regular'
import useToken from "@hooks/use-token";
import CurrencyIcon from "@components/atoms/currency-icon";
import {FormattedNumber} from "../../../atoms/number/formatted-number";
import AddPaycerToken from '@components/organisms/web3/add-paycer-token'
import { AddCircle } from '@styled-icons/fluentui-system-regular'
import RoundetIconButton from "@components/atoms/button/roundet-icon-button";
import {useMediaQuery} from "react-responsive";

const WalletMenu = () => {

    const [copiedWalletAdress, setCopiedWalletAdress] = useCopyClipboard()
    const [showWalletProviderModal, setShowWalletProviderModal] = useState(false)
    const wallet = useWallet()
    const token = useToken('PCR')
    const { symbol, tokenBalance } = token
    const balance = tokenBalance()
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 991.98px)' })

    if (!wallet.isConnected) {
        return (
            <>
                <Button
                    className="px-4 text-nowrap p-2 pt-3 pb-3 text-light"
                    onClick={() => setShowWalletProviderModal(true)}>
                    <Trans>Connect to a Wallet</Trans>
                </Button>
                {(showWalletProviderModal &&
                  <WalletProvider
                    providers={connectors}
                    onHide={() => setShowWalletProviderModal(false)}
                  />
                )}
            </>
        )
    }

    const renderMenu = () => {
        return (
            <>
                <a onClick={() => setCopiedWalletAdress(wallet.address)} className="mb-4 d-flex">
                    <div className="d-flex me-3 pe-1">
                        <Icon component={Copy} size={21} />
                        {copiedWalletAdress && <Icon className="ms-2 ps-2" component={CheckCircle} size={23} />}
                    </div>
                    <div>
                        <h3 className="mb-0">{wallet.shortenAddress}</h3>
                        <small className="text-muted" style={{fontSize: 10}}>
                            {t`Copy Wallet Address`}
                        </small>
                    </div>
                </a>
                <a href={wallet.explorerUrl} target="_blank" className="mb-4 d-flex">
                    <div className="d-flex me-3 pe-1">
                        <Icon component={Compass} size={21} />
                    </div>
                    <div>
                        <h3 className="mb-0">{t`Explorer`}</h3>
                        <small className="text-muted" style={{fontSize: 10}}>
                            {t`View your Wallet in Blockchain-Explorer`}
                        </small>
                    </div>

                </a>

                <a onClick={() => {
                    setShowWalletProviderModal(true)
                }} className="mb-4 d-flex">
                    <div className="d-flex me-3 pe-1">
                        <Icon component={SwitchCamera} size={21} />
                    </div>
                    <div>
                        <h3 className="mb-0">{t`Switch Wallet`}</h3>
                        <small className="text-muted" style={{fontSize: 10}}>
                            {t`Switch your Wallet Provider`}
                        </small>
                    </div>

                </a>
                <AddPaycerToken>
                    <a className="d-flex mb-4">
                        <div className="d-flex me-3 pe-1">
                            <Icon component={AddCircle} size={21} />
                        </div>
                        <div>
                            <h3 className="mb-0">{t`Add PCR Token`}</h3>
                            <small className="text-muted" style={{fontSize: 10}}>
                                {t`Add our PCR Token to your Wallet`}
                            </small>
                        </div>
                    </a>
                </AddPaycerToken>
                <a onClick={async () => {
                    window.localStorage.setItem('walletConnectedProviderName', '')
                    await wallet.disconnect()
                }} className="d-flex">
                    <div className="d-flex me-3 pe-1">
                        <Icon component={PlugDisconnected} size={21} />
                    </div>
                    <div>
                        <h3 className="mb-0">{t`Disconnect Wallet`}</h3>
                        <small className="text-muted" style={{fontSize: 10}}>
                            {t`Disconnect from your Wallet Extension`}
                        </small>
                    </div>
                </a>
                <div className="mt-4 border-top light-border pt-4">

                    <div className="mb-4">
                        <h3 className="mb-0">Balance</h3>
                        <small className="text-muted" style={{fontSize: 10}}>
                            {t`Balances in connected wallet`}
                        </small>
                    </div>

                    <div className="mb-3 d-flex align-items-center me-2">
                        <CurrencyIcon
                            className="me-3"
                            width={21}
                            height={21}
                            symbol={symbol}
                        />
                        <div className="ps-1 mb-0">
                            <FormattedNumber
                                value={balance}
                                minimumFractionDigits={2}
                                maximumFractionDigits={4}
                            />
                        </div>
                        &nbsp; PCR
                    </div>

                    <div className="d-flex align-items-center">
                        <CurrencyIcon
                            className="me-3"
                            width={21}
                            height={21}
                            symbol={wallet.etherSymbol}
                        />
                        <div className="ps-1 mb-0">
                            <FormattedNumber
                                value={wallet.etherBalance}
                                minimumFractionDigits={2}
                                maximumFractionDigits={4}
                            />
                        </div>
                        &nbsp; {wallet.etherSymbol}
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            {isTabletOrMobile ?
              renderMenu()
            : <Dropdown desktopWidth={300} openBy="click" opener={<RoundetIconButton toggleActive icon={Wallet} label={wallet.shortenAddress} />}>
                {renderMenu()}
              </Dropdown>
            }

            {(showWalletProviderModal &&
              <WalletProvider
                providers={connectors}
                onHide={() => setShowWalletProviderModal(false)}
              />
            )}
        </>
    )
}

export default WalletMenu
