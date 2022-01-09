import React from 'react'
import { t, Trans } from '@lingui/macro'
import styled from 'styled-components'
import GradientButton from '@components/atoms/button/gradient-button'
import useVesting from '@hooks/use-vesting'
import { FormattedNumber } from '../../../atoms/number/formatted-number'
import DashNumber from '@components/organisms/dashboard/dash-number'
import TransactionApproveModal from '@components/organisms/transaction-approve-modal'
import { useTokenSaleDashboard } from '@context/token-sale-dashboard-context'

const AnimatedDiv = styled.div`
    animation: fadeIn 2s;

    @keyframes fadeIn {
      0% { opacity:0; }
      100% { opacity:1; }
    }
`

const Vesting = () => {
    const { dashboardData } = useTokenSaleDashboard()

    const {
        withdrawAble,
        withdrawTx,
        withdraw,
        showFormApproveModal,
        setShowFormApproveModal,
        withdrawError,
        isLoading
    } = useVesting(dashboardData?.type)

    const handleSubmit = async () => {
        await withdraw()
    }

    return (
      <AnimatedDiv className="list-group list-group-flush list-group-activity">
          <div className="display-4 fw-normal pb-4 text-center text-md-start">
              {t`Claim`}
          </div>
          <div className="card bg-dark border-0 w-100">
              <div className="card-body">
                  <div className="d-flex justify-content-center mb-5">
                      <img width="80" className="mt-2" src="/assets/paycer-gradient.svg" alt="Paycer" />
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

                  <div className="d-flex justify-content-center">
                      <GradientButton className="w-75" disabled={withdrawAble === 0} onClick={withdrawAble > 0 ? () => setShowFormApproveModal(true) : null}>
                          {t`Claim`}
                      </GradientButton>
                  </div>

                  <TransactionApproveModal
                    show={showFormApproveModal}
                    onHide={() => setShowFormApproveModal(false)}
                    title={t`Claim confirmation`}
                    btnLabel={t`Claim now`}
                    onClick={() => handleSubmit()}
                    error={withdrawTx.status === 'Fail' || withdrawTx.status === 'Exception' || withdrawError}
                    success={withdrawTx.status === 'Success'}
                    loading={isLoading || withdrawTx.status === 'Mining'}
                  >
                      <div className="my-5">
                          <h3 className="mb-0 pb-0 text-center text-center text-muted">
                              <Trans>Claim PCR Tokens</Trans>
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
                      </div>
                  </TransactionApproveModal>
              </div>
          </div>
      </AnimatedDiv>
    )
}

export default Vesting
