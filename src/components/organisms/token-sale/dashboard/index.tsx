import {useTokenSale} from '@context/token-sale-context'
import React, {useState} from 'react'
import Spinner from '@components/atoms/spinner'
import {t, Trans} from '@lingui/macro'
import GradientButton from '@components/atoms/button/gradient-button'
import WalletProvider from '@components/organisms/web3/wallet-provider'
import {connectors} from '@providers/connectors'
import Transactions from '@components/organisms/token-sale/transactions'
import Vesting from '@components/organisms/token-sale/vesting'
import KycProcessInfo from '@components/organisms/token-sale/info'
import KycProcessTimeline from '@components/organisms/token-sale/timeline'
import { LeftCol, RightCol } from '../../../../pages/token-sale'

const TokenSaleDashboard = () => {
    const {
        tokenSaleData,
        loading,
        transactionTabActive,
        setTransactionTabActive
    } = useTokenSale()

    const transactions = tokenSaleData?.transactions
    const [showWalletProviderModal, setShowWalletProviderModal] = useState(false)

    if (loading) {
        return (
            <div className="card bg-transparent border-0 blur-background">
                <div className="bg-transparent d-flex justify-content-center align-items-center">
                    <Spinner animation="border" show />
                </div>
            </div>
        )
    }

    if (!tokenSaleData) {
        return (
            <div className="card blur-background">
                <div className="card-body">
                    <p className="mb-0">
                        {t`No transactions found, please connect with a wallet address that has token sale transactions.`}
                    </p>
                    <div className="w-25 mt-4">
                        <GradientButton
                            type="submit"
                            title={t`Claim`}
                            className="px-5"
                            onClick={() => setShowWalletProviderModal(true)}
                        >
                            <Trans>Connect to a Wallet</Trans>
                        </GradientButton>
                        <WalletProvider
                            providers={connectors}
                            onHide={() => setShowWalletProviderModal(false)}
                            show={showWalletProviderModal}
                        />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="d-flex">
                <div className={transactionTabActive ? 'PCR-Tab' : 'PCR-Tab PCR-Tab--isActive' } onClick={() => setTransactionTabActive(false)}>
                    {t`Status`}
                </div>
                {(transactions?.length > 0  &&
                  <div className={transactionTabActive ? 'PCR-Tab PCR-Tab--isActive' : 'PCR-Tab' } onClick={() => setTransactionTabActive(true)}>
                      {t`Transactions`}
                  </div>
                )}
            </div>
            <div className="card blur-background">
                <div className="card-body p-0">
                    <div className="d-lg-flex">
                        {(transactionTabActive
                            ?
                            <Transactions />
                            :
                            <>
                                <LeftCol>
                                    <Vesting />
                                    <KycProcessInfo />
                                </LeftCol>
                                <div className="vertical-line" />
                                <div className="horizontal-line d-md-none" />
                                <RightCol>
                                    <KycProcessTimeline />
                                </RightCol>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default TokenSaleDashboard