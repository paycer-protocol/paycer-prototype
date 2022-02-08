import React from 'react'
import { t, Trans } from '@lingui/macro'
import { useMediaQuery } from 'react-responsive'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import truncateText from '../../../../helpers/truncate-text'
import GradientButton from '@components/atoms/button/gradient-button'
import useVesting from '@hooks/use-vesting'
import { FormattedNumber } from '../../../atoms/number/formatted-number'
import TransactionApproveModal from '@components/organisms/transaction-approve-modal'
import { useVestingDashboard } from '@context/vesting-dashboard-context'
import useWallet from "@hooks/use-wallet";
import CurrencyIcon from "@components/atoms/currency-icon";

const AnimatedDiv = styled.div`
    animation: fadeIn 2s;

    @keyframes fadeIn {
      0% { opacity:0; }
      100% { opacity:1; }
    }
`

const Claim = () => {
    const { dashboardData } = useVestingDashboard()
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 991.98px)' })
    const wallet = useWallet()
    const router = useRouter()
    const {
        withdrawAble,
        withdrawTx,
        withdraw,
        showFormApproveModal,
        setShowFormApproveModal,
        withdrawError,
        isLoading,
        nextDistribution,
        resetStatus
    } = useVesting(dashboardData?.type)

    const handleSubmit = async () => {
        await withdraw()
    }

    return (
      <AnimatedDiv className="list-group list-group-flush list-group-activity h-100">
          <div className="card bg-dark border-purple-dark w-100 mb-0 shadow-none pt-4 pb-4 h-100">
              <div className="card-body p-5 align-items-center d-flex flex-column w-100 justify-content-center">
                  <div className="d-flex justify-content-center mb-5">
                      <img width="75" src="/assets/paycer-gradient.svg" alt="Paycer" />
                  </div>

                  <h3 className="mb-3 text-center text-center text-muted">
                      <Trans>Claimable PCR Tokens</Trans>
                  </h3>

                  <div className="d-flex flex-column mb-4 text-center">
                      <span className="display-2 my-3">
                          <FormattedNumber
                            value={withdrawAble}
                            minimumFractionDigits={2}
                            maximumFractionDigits={2}
                          />
                      </span>
                  </div>

                  <div className="d-flex justify-content-center w-100">
                      <GradientButton className="w-75" disabled={withdrawAble === 0} onClick={withdrawAble > 0 ? () => setShowFormApproveModal(true) : null}>
                          {t`Claim`}
                      </GradientButton>
                  </div>

                  {(nextDistribution &&
                    <small className="text-center pt-5 d-block">
                        <div className="text-muted">
                            {t`Next distribution`}
                        </div>
                        <div>
                            {nextDistribution}
                        </div>
                    </small>
                  )}

                  <TransactionApproveModal
                    show={showFormApproveModal}
                    onHide={() => {
                        setShowFormApproveModal(false)
                        resetStatus()
                    }}
                    title={t`Claim confirmation`}
                    btnLabel={t`Claim now`}
                    onClick={() => handleSubmit()}
                    error={withdrawTx.status === 'Fail' || withdrawTx.status === 'Exception' || withdrawError}
                    success={withdrawTx.status === 'Success'}
                    successMessage={t`Transaction was successfully executed.`}
                    loading={isLoading || withdrawTx.status === 'Mining'}
                    additionalSuccessContent={
                        <div className="d-flex justify-content-center mt-5">
                            <GradientButton className="w-100" onClick={() => router.push('/staking')}>
                                {t`Stake your tokens`}
                            </GradientButton>
                        </div>
                    }
                  >
                      <div className="my-5">
                          <h3 className="mb-0 pb-0 text-center text-center text-muted">
                              <Trans>Claim PCR</Trans>
                          </h3>
                          <div className="d-flex flex-column mb-5 text-center">
                              <span className="display-2 my-3">
                                  <FormattedNumber
                                    value={withdrawAble}
                                    minimumFractionDigits={2}
                                    maximumFractionDigits={2}
                                  />
                                 <CurrencyIcon
                                     style={{position: 'relative', top: '-5px'}}
                                     width={55}
                                     height={55}
                                     symbol="PCR"
                                     className="ms-3"
                                 />
                              </span>
                          </div>
                          <div className="w-75 m-auto">
                              <h3 className=" text-muted">
                                  {t`Transfer to:`}
                              </h3>
                              <span className="text-center fw-bold text-wrap">
                                {!isTabletOrMobile ? wallet.address : truncateText(wallet.address, wallet.address.length / 2 )}
                              </span>
                          </div>
                      </div>
                  </TransactionApproveModal>
              </div>
          </div>
      </AnimatedDiv>
    )
}

export default Claim
