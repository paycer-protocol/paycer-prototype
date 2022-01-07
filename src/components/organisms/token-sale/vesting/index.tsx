import React from 'react'
import {t, Trans} from '@lingui/macro'
import GradientButton from '@components/atoms/button/gradient-button'
import useVesting from '@hooks/use-vesting'
import { BigNumber } from "@ethersproject/bignumber";
import { FormattedNumber } from '../../../atoms/number/formatted-number'
import CurrencyIcon from '@components/atoms/currency-icon'
import { rewardSymbol } from '@config/staking-rewards'
import DashNumber from "@components/organisms/dashboard/dash-number";
import RewardFee from "@components/organisms/staking-rewards/staking-form/reward-fee";
import TransactionApproveModal from "@components/organisms/transaction-approve-modal";

const Vesting = () => {

    const {
        withdrawAble,
        withdrawTx,
        withdraw,
        showFormApproveModal,
        setShowFormApproveModal,
        withdrawError
    } = useVesting()

    const handleSubmit = async () => {
        await withdraw()
    }

    return (
      <>
        <h2 className="mb-4">
            <Trans>Claimable PCR Tokens</Trans>
        </h2>

        <div className="d-flex flex-column mb-4">
              <span className="display-4">
              +&nbsp;
                  <FormattedNumber
                      value={withdrawAble}
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

        <GradientButton disabled={withdrawAble === 0} onClick={withdrawAble > 0 ? () => setShowFormApproveModal(true) : null}>
            {t`Claim`}
        </GradientButton>

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

      </>
    )
}

export default Vesting
