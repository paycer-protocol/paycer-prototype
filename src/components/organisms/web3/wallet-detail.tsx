import React from 'react'
import { Trans, t } from '@lingui/macro'
import { CheckCircle } from '@styled-icons/bootstrap'
import Button from '@components/atoms/button'
import Icon from '@components/atoms/icon'
import { FormattedNumber } from '@components/atoms/number'
import Modal from '@components/molecules/modal'
import useWallet from '@hooks/use-wallet'
import useCopyClipboard from '@hooks/use-copy-clipboard'
import ListGroup from '@components/molecules/list-group'
import { connectors } from '@providers/connectors'
import CurrencyIcon from '@components/atoms/currency-icon'


export interface AccountDetailProps {
    show: boolean
    onHide?: any
    setShowWalletProviderModal?: (state: boolean) => void
}

type ListGroupItemProps = {
    name: string
    description: string
    onClick?: any
    href?: string
    target?: string
    variant?: string
    children?: any
}

const AccountAction = (props: ListGroupItemProps) => {
    const { name, description, onClick, href, target, variant = 'outline-primary', children } = props

    return (
        <Button
          style={{ borderRadius: '10px' }}
          variant={variant}
          className="mb-2"
          href={href}
          target={target}
          onClick={onClick}
        >
            <div className="d-flex align-items-center justify-content-between py-3 px-2">
                <div className="text-start">
                    <strong className="text-white">{name}</strong>
                    <p className="text-muted mb-0">
                        <small>{description}</small>
                    </p>
                </div>
                {children}
            </div>
        </Button>
    )
}

const AccountBalance = () => {
    const wallet = useWallet()

    return (
        <div className="d-flex align-items-center justify-content-between mb-5 px-2">
            <div className="text-start">
                <strong><Trans>Balance</Trans></strong>
                <p className="text-muted mb-0">
                    <span className="h1">
                        <FormattedNumber
                          value={wallet.etherBalance}
                          minimumFractionDigits={2}
                          maximumFractionDigits={4}
                        />
                        &nbsp;
                        {wallet.etherSymbol}
                    </span>
                </p>
            </div>
            <CurrencyIcon
              symbol={wallet.etherSymbol}
              className="ms-2 mt-3"
              width={40}
              height={40}
            />
        </div>
    )
}

const WalletDetail = (props: AccountDetailProps) => {
    const { show, onHide, setShowWalletProviderModal } = props
    const wallet = useWallet()
    const [isCopied, setCopied] = useCopyClipboard()

    return (
        <Modal show={show} onHide={onHide}>
            <>
                <Modal.Header closeButton onHide={onHide}>
                    <Modal.Title>
                        <Trans>Account</Trans>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {wallet.isConnected && (
                      <>
                          <AccountBalance />
                          <ListGroup>
                              <AccountAction
                                name={t`Explorer`}
                                description={t`View your wallet in Blockchain Explorer`}
                                href={wallet.explorerUrl}
                                target="_blank"
                              />
                              <AccountAction
                                name={t`Copy address`}
                                description={t`Copy your wallet address to clipboard`}
                                onClick={() => setCopied(wallet.address)}
                              >
                                  {isCopied && <Icon component={CheckCircle} size={35} />}
                              </AccountAction>
                              <AccountAction
                                name={t`Switch wallet`}
                                description={t`Change your wallet provider`}
                                onClick={() => {
                                    onHide()
                                    setShowWalletProviderModal(true)
                                }}
                              />
                              <a
                                className="d-flex justify-content-center mt-3 text-center text-danger"
                                onClick={async () => {
                                    await onHide()
                                    window.localStorage.setItem('walletConnectedProvider', '')
                                    await wallet.disconnect()
                                }}
                              >
                                  <small><Trans>Disconnect</Trans></small>
                              </a>
                          </ListGroup>
                      </>
                    )}
                    {!wallet.isConnected && (
                      <div className="d-flex justify-content-center">
                          <Button variant="outline-primary" className="px-5" onClick={() => wallet.connect(connectors[0])}>
                              <Trans>Connect to a Wallet</Trans>
                          </Button>
                      </div>
                    )}
                </Modal.Body>
            </>
        </Modal>
    )
}

export default WalletDetail
