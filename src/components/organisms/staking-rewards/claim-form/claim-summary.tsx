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
        pendingReward,
        totalAmountClaimed,
        lastRewardTime,
        claimIsFetching,
        claimError,
        claimIsLoading,
        claimIsSuccess,
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
      <>
          <div className="d-flex justify-content-center mb-5">
              <img width="75" src="/assets/paycer-gradient.svg" className="mt-3" alt="Paycer" />
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

          <div className="d-flex justify-content-center w-100">
              <GradientButton className="w-75" disabled={pendingReward === 0} onClick={pendingReward > 0 ? () => setShowFormApproveModal(true) : null}>
                  {t`Claim rewards`}
              </GradientButton>
          </div>

          {((lastRewardTime || totalAmountClaimed > 0) &&
            <div className={(lastRewardTime && totalAmountClaimed) ? 'row justify-content-between w-100' : 'row justify-content-center w-100'}>
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
                  setShowFormApproveModal(false)
              }}
              title={t`Confirm Claim`}
              btnLabel={t`Claim now`}
              onClick={() => handleClaim()}
              error={claimError}
              success={claimIsSuccess}
              successMessage={t`Transaction was successfully executed`}
              loading={claimIsLoading || claimIsFetching}
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
                                style={{position: 'relative', top: '-5px'}}
                                width={55}
                                height={55}
                                symbol="PCR"
                                className="ms-3"
                            />
                            </span>
                  </div>
              </div>
          </TransactionApproveModal>
      </>
  )

}
