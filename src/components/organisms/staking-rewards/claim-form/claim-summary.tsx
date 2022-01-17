import React from 'react'
import styled from 'styled-components'
import { t, Trans } from '@lingui/macro'
import useStaking from '@hooks/use-staking'
import CurrencyIcon from '@components/atoms/currency-icon'
import { FormattedNumber } from '@components/atoms/number/formatted-number'
import { rewardSymbol } from '@config/staking-rewards'
import GradientButton from '@components/atoms/button/gradient-button'
import Spinner from '@components/atoms/spinner'
import TransactionApproveModal from '@components/organisms/transaction-approve-modal'

const RewardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 15px;
  height: 242px;
`

const HorizontalLine = styled.div`
  border-bottom: 1px solid #244166;
  width: 100%;
  margin: 1rem 2rem;
`

export default function ClaimSummary() {
  const {
    claim,
    claimTx,
    resetStatus,
    pendingReward,
    totalAmountClaimed,
    lastRewardTime,
    claimError,
    isLoading,
    showFormApproveModal,
    setShowFormApproveModal
  } = useStaking()

  const handleClaim = async () => {
    try {
      await claim()
    } catch (e) {
    }
  }

  return (
      <div className="list-group list-group-flush list-group-activity h-100">
          <div className="card bg-dark border-0 w-100 mb-0 shadow-none h-100">
              <div className="card-body p-5">
                  <div className="d-flex justify-content-center mb-5">
                      <img width="90" src="/assets/paycer-gradient.svg" className="mt-3" alt="Paycer" />
                  </div>

                  <h3 className="mb-3 text-center text-center text-muted">
                      <Trans>Claim your rewards</Trans>
                  </h3>

                  <div className="d-flex flex-column mb-4 text-center">
                      <span className="display-2 my-3">
                          <FormattedNumber
                              value={pendingReward}
                              minimumFractionDigits={2}
                              maximumFractionDigits={4}
                          />
                      </span>
                  </div>

                  <div className="d-flex justify-content-center">
                      <GradientButton className="w-75" disabled={pendingReward === 0} onClick={pendingReward > 0 ? () => setShowFormApproveModal(true) : null}>
                          {t`Claim rewards`}
                      </GradientButton>
                  </div>

                  {((lastRewardTime || totalAmountClaimed > 0) &&
                  <div className={(lastRewardTime && totalAmountClaimed) ? 'row justify-content-between' : 'row justify-content-center'}>
                      {(lastRewardTime &&
                        <div className="col-6">
                        <small className="text-center pt-5 d-block">
                          <div className="text-muted">
                              {t`Last rewarded`}
                          </div>
                          <div>
                              {lastRewardTime}
                          </div>
                        </small>
                        </div>
                      )}
                      {(totalAmountClaimed > 0 &&
                        <div className="col-6">
                          <small className="text-center pt-5 d-block">
                            <div className="text-muted">
                                {t`Total claimed`}
                            </div>
                            <div>
                              <FormattedNumber
                                value={totalAmountClaimed}
                                minimumFractionDigits={2}
                                maximumFractionDigits={2}
                              />
                            </div>
                          </small>
                        </div>
                      )}
                  </div>
                  )}

                  <TransactionApproveModal
                      show={showFormApproveModal}
                      onHide={() => {
                          resetStatus()
                          setShowFormApproveModal(false)
                      }}
                      title={t`Confirm Claim`}
                      btnLabel={t`Claim now`}
                      onClick={() => handleClaim()}
                      error={claimTx.status === 'Fail' || claimTx.status === 'Exception' || claimError}
                      success={claimTx.status === 'Success'}
                      successMessage={t`Transaction was successfully executed`}
                      loading={isLoading || claimTx.status === 'Mining'}
                  >
                      <div className="my-5">
                          <div className="d-flex flex-column mb-4 text-center">
                            <span className="display-2 my-3">
                                <FormattedNumber
                                    value={pendingReward}
                                    minimumFractionDigits={2}
                                    maximumFractionDigits={2}
                                />
                              <CurrencyIcon
                                  style={{position: 'relative', top: '-4px'}}
                                  width={70}
                                  height={70}
                                  symbol="PCR"
                              />
                            </span>
                          </div>
                      </div>
                  </TransactionApproveModal>
              </div>
          </div>
      </div>
  )

}
