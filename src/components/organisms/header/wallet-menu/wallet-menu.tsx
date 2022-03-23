import React, { useState } from 'react'
import classnames from 'classnames'
import {t, Trans} from '@lingui/macro'
import Button from '@components/atoms/button'
import useWallet from '@hooks/use-wallet'
import WalletProvider from '@components/organisms/web3/wallet-provider'
import WalletDetail from './wallet-detail'
import { connectors } from '@providers/connectors'
import { Wallet } from '@styled-icons/ionicons-sharp'
import Icon from "@components/atoms/icon";
import Dropdown from '@components/molecules/dropdown'
import useCopyClipboard from "@hooks/use-copy-clipboard";
import { CheckCircle } from "@styled-icons/bootstrap";
import { Copy } from '@styled-icons/feather'
import {useEthers} from "@usedapp/core";
import useToken from "@hooks/use-token";
import CurrencyIcon from "@components/atoms/currency-icon";
import {FormattedNumber} from "../../../atoms/number/formatted-number";
import { GlobeSearch } from '@styled-icons/fluentui-system-filled'

export interface WalletConnectProps {
    className?: string
}

const WalletMenu = (props: WalletConnectProps) => {
    const { className } = props
    const [copiedWalletAdress, setCopiedWalletAdress] = useCopyClipboard()
    const [showWalletProviderModal, setShowWalletProviderModal] = useState(false)
    const wallet = useWallet()
    const token = useToken('PCR')
    const { tokenAddress, symbol, decimals, tokenBalance } = token
    const balance = tokenBalance()


    if (!wallet.isConnected) {
        return (
            <>
                <Button
                    className={classnames(className, 'px-4 text-nowrap p-2 pt-3 pb-3 text-light')}
                    onClick={() => setShowWalletProviderModal(true)}
                >
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


            <Dropdown desktopWidth={300} openBy="click" icon={Wallet}>
                <>
                    <div onClick={() => setCopiedWalletAdress(wallet.address)} className="border-bottom pb-4 mb-4 d-flex justify-content-between align-items-center cursor-pointer">
                        {wallet.shortenAddress}
                        <div className="d-flex align-items-center">
                            <Icon component={Copy} size={20} />
                            {copiedWalletAdress && <Icon className="ms-2 ps-2" component={CheckCircle} size={20} />}
                        </div>
                    </div>
                    <div className="mb-4 border-bottom pb-4 mb-4">
                        <div className="mb-3 d-flex align-items-center">
                            <CurrencyIcon
                                className="me-2"
                                width={21}
                                height={21}
                                symbol={symbol}
                                style={{position: 'relative', left: '-3px'}}
                            />
                            <FormattedNumber
                                value={balance}
                                minimumFractionDigits={2}
                                maximumFractionDigits={4}
                            />
                            &nbsp; PCR
                        </div>
                        <div className="d-flex align-items-center">
                            <CurrencyIcon
                                className="me-2"
                                width={21}
                                height={21}
                                symbol={wallet.etherSymbol}
                                style={{position: 'relative', left: '-3px'}}
                            />
                            <FormattedNumber
                                value={wallet.etherBalance}
                                minimumFractionDigits={2}
                                maximumFractionDigits={4}
                            />
                            &nbsp; {wallet.etherSymbol}
                        </div>
                    </div>
                    <div className="mb-4 d-flex justify-content-between">
                        <div>
                            <h3 className="mb-0">{t`Explorer`}</h3>
                            <small className="text-muted" style={{fontSize: 10}}>
                                {t`View your Wallet in Blockchain-Explorer`}
                            </small>
                        </div>
                        <Icon component={Wpexplorer} size={20} />

                    </div>

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
