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
import { Copy, LogOut, RefreshCw, CheckCircle, Compass } from '@styled-icons/feather'
import useToken from "@hooks/use-token";
import CurrencyIcon from "@components/atoms/currency-icon";
import {FormattedNumber} from "../../../atoms/number/formatted-number";

const WalletMenu = () => {

    const [copiedWalletAdress, setCopiedWalletAdress] = useCopyClipboard()
    const [showWalletProviderModal, setShowWalletProviderModal] = useState(false)
    const wallet = useWallet()
    const token = useToken('PCR')
    const { symbol, tokenBalance } = token
    const balance = tokenBalance()

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

    return (
        <>
            <Dropdown label={wallet.shortenAddress} desktopWidth={300} openBy="click" icon={Wallet}>
                <>
                    <a onClick={() => setCopiedWalletAdress(wallet.address)} className="mb-4 d-flex justify-content-between">
                        <div>
                            <h3 className="mb-0">{wallet.shortenAddress}</h3>
                            <small className="text-muted" style={{fontSize: 10}}>
                                {t`Copy Wallet Address`}
                            </small>
                        </div>

                        <div className="d-flex">
                            <Icon component={Copy} size={23} />
                            {copiedWalletAdress && <Icon className="ms-2 ps-2" component={CheckCircle} size={23} />}
                        </div>
                    </a>
                    <div className="mb-4 border-bottom light-border pb-4 mb-4">
                        <div className="mb-3 d-flex align-items-center">
                            <CurrencyIcon
                                className="me-3"
                                width={23}
                                height={23}
                                symbol={symbol}
                                style={{position: 'relative', left: '-3px'}}
                            />
                            <FormattedNumber
                                value={balance}
                                minimumFractionDigits={2}
                                maximumFractionDigits={4}
                            />
                        </div>
                        <div className="d-flex align-items-center">
                            <CurrencyIcon
                                className="me-3"
                                width={22}
                                height={22}
                                symbol={wallet.etherSymbol}
                                style={{position: 'relative', left: '-3px'}}
                            />
                            <FormattedNumber
                                value={wallet.etherBalance}
                                minimumFractionDigits={2}
                                maximumFractionDigits={4}
                            />
                        </div>
                    </div>

                    <a href={wallet.explorerUrl} target="_blank" className="mb-4 d-flex justify-content-between d-block">
                        <div>
                            <h3 className="mb-0">{t`Explorer`}</h3>
                            <small className="text-muted" style={{fontSize: 10}}>
                                {t`View your Wallet in Blockchain-Explorer`}
                            </small>
                        </div>
                        <Icon component={Compass} size={23} />
                    </a>

                    <a onClick={() => {
                        setShowWalletProviderModal(true)
                    }} className="mb-4 d-flex justify-content-between">
                        <div>
                            <h3 className="mb-0">{t`Switch Wallet`}</h3>
                            <small className="text-muted" style={{fontSize: 10}}>
                                {t`Switch your Wallet Provider`}
                            </small>
                        </div>
                        <Icon component={RefreshCw} size={23} />
                    </a>
                    <a onClick={async () => {
                        window.localStorage.setItem('walletConnectedProviderName', '')
                        await wallet.disconnect()
                    }} className="d-flex justify-content-between">
                        <div>
                            <h3 className="mb-0">{t`Disconnect Wallet`}</h3>
                            <small className="text-muted" style={{fontSize: 10}}>
                                {t`Disconnect from your Wallet Extension`}
                            </small>
                        </div>
                        <Icon component={LogOut} size={23} />
                    </a>
                </>
            </Dropdown>

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
