import React from 'react'
import { t, Trans } from '@lingui/macro'
import styled from 'styled-components'
import GradientButton from '@components/atoms/button/gradient-button'
import useVesting from '@hooks/use-vesting'
import { FormattedNumber } from '../../../atoms/number/formatted-number'
import CurrencyIcon from '@components/atoms/currency-icon'
import { rewardSymbol } from '@config/staking-rewards'
import DashNumber from "@components/organisms/dashboard/dash-number";
import TransactionApproveModal from "@components/organisms/transaction-approve-modal";
import {useTokenSale} from "@context/token-sale-context";


export const StyledVestingCard = styled.div`
    border: 1px solid #2c2f4c!important;
`

const Vesting = () => {

    const {
        tokenSaleData
    } = useTokenSale()

    const {
        withdrawAble,
        withdrawTx,
        withdraw,
        showFormApproveModal,
        setShowFormApproveModal,
        withdrawError
    } = useVesting(tokenSaleData?.type)

    const handleSubmit = async () => {
        await withdraw()
    }

    return (
        <StyledVestingCard className="card bg-dark border-0 mb-0">
            <div className="card-body">
                <div className="d-flex justify-content-center mb-5">
                    <img width="100" className="mt-2" src="/assets/paycer-gradient.svg" alt="Paycer" />
                </div>

                <h2 className="mb-3 text-center fw-bold text-center">
                    <Trans>Claimable PCR Tokens</Trans>
                </h2>

                <p className="text-center">
                    <Trans>Please find your claimable PCR tokens below, you can claim your PCR daily.</Trans>
                </p>

                <div className="d-flex flex-column mb-4 text-center">
                      <span className="display-4">
                          <FormattedNumber
                              value={withdrawAble}
                              minimumFractionDigits={2}
                              maximumFractionDigits={4}
                          />
                        <CurrencyIcon
                            symbol={rewardSymbol}
                            className="ms-2"
                            width={30}
                            height={30}
                            style={{marginTop: '-4px'}}
                        />
                  </span>
                </div>

                <div className="d-flex justify-content-center">
                    <GradientButton className="w-75" disabled={withdrawAble === 0} onClick={withdrawAble > 0 ? () => setShowFormApproveModal(true) : null}>
                        {t`Claim`}
                    </GradientButton>
                </div>

                <TransactionApproveModal
                    show={showFormApproveModal}
                    onHide={() => setShowFormApproveModal(false)}
                    title={t`Claim PCR Tokens?`}
                    onClick={() => handleSubmit()}
                    error={withdrawTx.status === 'Fail' || withdrawTx.status === 'Exception' || withdrawError}
                    success={withdrawTx.status === 'Success'}
                    loading={withdrawTx.status === 'Mining'}
                >
                <>
                  <div className="row mb-4">
                      <div className="col-6">
                          <div className="row mb-4">
                              <div className="col-6">
                                  <DashNumber
                                      label={t`Withdrawable`}
                                      value={withdrawAble}
                                      symbol="PCR"
                                  />
                              </div>
                          </div>
                      </div>
                  </div>
                </>
                </TransactionApproveModal>
        </div>
    </StyledVestingCard>
    )
}

export default Vesting
