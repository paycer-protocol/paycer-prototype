import React, { useState } from 'react'
import { t, Trans } from '@lingui/macro'
import * as Yup from 'yup'
import { FormikValues } from 'formik'
import { rewardSymbol, rewardDepositFee as depositFee, rewardWithdrawFee as withdrawFee } from '@config/staking-rewards'
import DashNumber from '@components/organisms/dashboard/dash-number'
import FormApproveModal from '@components/organisms/form-approve-modal'
import Form from '@components/atoms/form/form'
import useToken from '@hooks/use-token'
import useStaking from '@hooks/use-staking'
import StakeRangeSlider from './fields/stake-range-slider'
import StakedInput from './fields/staked-input'
import SubmitButton from './fields/submit-button'
import RewardFee from './reward-fee'
import StakingSummary from './staking-summary'
import { StakingProps } from '../types'
import CurrencyIcon from "@components/atoms/currency-icon";
import {FormattedNumber} from "../../../atoms/number/formatted-number";

export default function StakingForm() {
  const [showFormApproveModal, setShowFormApproveModal] = useState(false)
  const {
    withdraw,
    deposit,
    stakedBalance,
    rewardRate,
    isLoading,
    hasFailed,
    hasException
  } = useStaking()

  const token = useToken(rewardSymbol)

  const tokenBalance = token.tokenBalance()

  const initialValues: StakingProps = {
    rewardSymbol,
    stakedBalance,
    tokenBalance,
    rewardRate,
    stakeRange: stakedBalance ? (stakedBalance * 100) / tokenBalance : 0,
    depositFee,
    withdrawFee,
    disabled: true,
  }

  const validationSchema = Yup.object().shape({
    stakedBalance: Yup.number().min(0).required(),
    tokenBalance: Yup.number().min(0).required(),
  })

  const handleSubmit = () => {
    setShowFormApproveModal(true)
  }

  const handleStaking = async (values: FormikValues) => {
    try {
      if (values.stakedBalance > initialValues.stakedBalance) {
        const stakeAmount = values.stakedBalance - initialValues.stakedBalance
        await deposit(stakeAmount)
      } else {
        const withdrawAmount = initialValues.stakedBalance - values.stakedBalance
        await withdraw(withdrawAmount)
      }
    } catch(e) {
      console.log(e)
    }
  }

  return (
    <Form
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ values }) => {
        if (values.disabled) {
          return <StakingSummary />
        }

        return (
            <>
              <div>
                <div className="d-flex mb-4">
                  <label className="form-label">
                    {t`APY`}
                  </label>
                  <span className="ps-3">{initialValues.rewardRate}%</span>
                </div>
                <div className="mb-2 pb-2">
                  <StakeRangeSlider />
                </div>

                <div className="border-bottom mb-5 py-5">
                  <div className="row">
                    <div className="col-6">
                      <label className="form-label">
                        {values.stakedBalance !== initialValues.stakedBalance  ? t`Token Balance after` : t` Current Token Balance`}
                      </label>

                      <div className="form-control bg-transparent border-0 ps-0">
                        <CurrencyIcon
                            symbol='PCR'
                            className="me-2"
                            width={28}
                            height={28}
                            style={{marginTop: '-2px', marginLeft: '-5px'}}
                        />
                        <FormattedNumber
                            value={values.tokenBalance}
                            minimumFractionDigits={2}
                            maximumFractionDigits={4}
                        />
                        &nbsp;
                        {t`PCR`}
                      </div>

                    </div>
                    <div className="col-6">
                      <StakedInput />
                    </div>
                  </div>
                </div>
                <div className="mb-4 pb-4">
                  <div className="row">
                    <div className="col-4">
                      <DashNumber
                          label={t`Daily rewards`}
                          value={values.stakedBalance * values.rewardRate / 100 / 365}
                          symbol={values.rewardSymbol}
                      />
                    </div>
                    <div className="col-4">
                      <DashNumber
                          label={t`Monthly rewards`}
                          value={values.stakedBalance * values.rewardRate / 100 / 30}
                          symbol={values.rewardSymbol}
                      />
                    </div>
                    <div className="col-4">
                      <RewardFee />
                    </div>
                  </div>
                </div>
                <SubmitButton />
              </div>

              <FormApproveModal
                  show={showFormApproveModal}
                  onHide={() => setShowFormApproveModal(false)}
                  title={values.stakedBalance > initialValues.stakedBalance ? t`Deposit the current selection?` : t`Withdraw the current Selection?`}
                  onClick={() => handleStaking(values)}
                  isLoading={isLoading}
                  errorMessage={hasFailed || hasException ? t`Something went wrong` : null}
              >
                <>
                  <div className="pb-3 mb-3">
                    <DashNumber
                        label={t`Amount`}
                        value={values.stakedBalance}
                        symbol={values.rewardSymbol}
                    />
                  </div>
                  <div className="pb-3 mb-3">
                    <DashNumber
                        label={t`Balance after`}
                        value={values.tokenBalance}
                        symbol={values.rewardSymbol}
                    />
                  </div>
                  <div className="pb-3 mb-3">
                    <DashNumber
                        label={t`Daily rewards`}
                        value={values.stakedBalance * values.rewardRate / 100 / 365}
                        symbol={values.rewardSymbol}
                    />
                  </div>
                  <div className="pb-3 mb-3">
                    <DashNumber
                        label={t`Monthly rewards`}
                        value={values.stakedBalance * values.rewardRate / 100 / 30}
                        symbol={values.rewardSymbol}
                    />
                  </div>
                  <RewardFee />
                </>
              </FormApproveModal>
            </>
        )
      }}
    </Form>
  )
}
