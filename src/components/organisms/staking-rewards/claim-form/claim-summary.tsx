import React, {useState} from 'react'
import styled from 'styled-components'
import { t, Trans } from '@lingui/macro'
import useStaking from '@hooks/use-staking'
import Button from '@components/atoms/button'
import CurrencyIcon from '@components/atoms/currency-icon'
import { FormattedNumber } from '@components/atoms/number/formatted-number'
import DashNumber from '@components/organisms/dashboard/dash-number'
import { rewardSymbol } from '@config/staking-rewards'
import GradientButton from '@components/atoms/button/gradient-button'
import Spinner from '@components/atoms/spinner'
import TransactionApproveModal from '@components/organisms/transaction-approve-modal'
import truncateText from '../../../../helpers/truncate-text'
import {useMediaQuery} from 'react-responsive'
import useWallet from '@hooks/use-wallet'


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

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 991.98px)' })
  const wallet = useWallet()

  const {
    claim,
    claimTx,
    pendingReward,
    lastDepositedAt,
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
    <div>
      <RewardContainer>
        <div className="d-flex flex-column text-center mb-4 mb-md-0">
          <span className="text-muted">
              <Trans>Claimable rewards</Trans>
          </span>
          <span className="display-4">
              +&nbsp;
            <FormattedNumber
              value={pendingReward}
              minimumFractionDigits={2}
              maximumFractionDigits={4}
            />
            <CurrencyIcon
              symbol={rewardSymbol}
              className="ms-2"
              width={28}
              height={28}
              style={{marginTop: '-4px'}}
            />
          </span>
        </div>

        <HorizontalLine className="d-none pt-3 d-md-block"/>

        <div className="mt-3 row w-100 justify-content-md-between">
          <div className="col-6 text-center">
            <label className="form-label d-block">{t`Last Deposited at`}</label>
            {lastDepositedAt}
          </div>

          <div className="col-6 text-center">
            <label className="form-label d-block">{t`Last Rewardet at`}</label>
            {lastRewardTime}
          </div>
        </div>
      </RewardContainer>

      <div className="d-flex align-items-center justify-content-center mb-3">
        <GradientButton
            type="submit"
            title={t`Claim`}
            className="px-5"
            onClick={() => setShowFormApproveModal(true)}
            disabled={pendingReward === 0}
            style={{width: '150px'}}
        >
          {t`Claim`}

        </GradientButton>
      </div>

      <TransactionApproveModal
          show={showFormApproveModal}
          onHide={() => setShowFormApproveModal(false)}
          title={t`Claim confirmation`}
          btnLabel={t`Claim now`}
          onClick={() => handleClaim()}
          error={claimTx.status === 'Fail' || claimTx.status === 'Exception' || claimError}
          success={claimTx.status === 'Success'}
          successMessage={t`The tokens will be transferred to your wallet.`}
          loading={isLoading || claimTx.status === 'Mining'}
      >
        <div className="my-5">
          <h3 className="mb-0 pb-0 text-center text-center text-muted">
            <Trans>Claim PCR</Trans>
          </h3>
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
            {wallet.isConnected &&
            <div className="w-75 m-auto">
              <h3 className=" text-muted">
                  {t`Transfer to:`}
              </h3>
              <span className="text-center fw-bold text-wrap">
                    {!isTabletOrMobile ? wallet.address : truncateText(wallet.address, wallet.address.length / 2 )}
                </span>
            </div>
            }
        </div>
      </TransactionApproveModal>

      <div style={{position: 'absolute', left: '50%', top: '30%'}}>
        <Spinner animation="border" show={claimTx.status === 'Mining'} />
      </div>
    </div>
  )
}
