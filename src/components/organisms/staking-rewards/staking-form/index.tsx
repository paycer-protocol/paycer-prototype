import React, {useState} from 'react'
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
import TokenInput from './fields/token-input'
import SubmitButton from './fields/submit-button'
import RewardFee from './reward-fee'
import StakingSummary from './staking-summary'
import { StakingProps } from '../types'

export default function StakingForm() {
  const [showFormApproveModal, setShowFormApproveModal] = useState(false)
  const { withdraw, withdrawTx, deposit, depositTx, stakedBalance } = useStaking()
  const token = useToken(rewardSymbol)

  const tokenBalance = token.tokenBalance()
  const rewardRate = 10 // todo rewardrate

  const initialValues: StakingProps = {
    rewardSymbol,
    stakedBalance,
    tokenBalance,
    rewardRate,
    stakeRange: 0,
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
        const result = await deposit(stakeAmount)
        console.log(result)
      } else {
        const withdrawAmount = initialValues.stakedBalance - values.stakedBalance
        const result = await withdraw(withdrawAmount)
        console.log(result)
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
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <h2 className="m-0"><Trans>Staking</Trans></h2>
                  <span>{initialValues.rewardRate}% <Trans>APY</Trans></span>
                </div>
                <div className="mb-5">
                  <StakeRangeSlider />
                </div>
                <div className="row mb-4">
                  <div className="col-6">
                    <TokenInput />
                  </div>
                  <div className="col-6">
                    <StakedInput />
                  </div>
                </div>
                <div className="row mb-5">
                  <div className="col-6">
                    <DashNumber
                        label={t`Daily rewards`}
                        value={values.stakedBalance * values.rewardRate / 100 / 365}
                        symbol={values.rewardSymbol}
                    />
                  </div>
                  <div className="col-6">
                    <DashNumber
                        label={t`Monthly rewards`}
                        value={values.stakedBalance * values.rewardRate / 100 / 30}
                        symbol={values.rewardSymbol}
                    />
                  </div>
                </div>
                <SubmitButton />
                <RewardFee />
              </div>
              <FormApproveModal
                  show={showFormApproveModal}
                  onHide={() => setShowFormApproveModal(false)}
                  title={t`Stake the current Selection?`}
                  onClick={() => handleStaking(values)}
              >
                <>
                  <div className="pb-3 mb-3">
                    <div className="text-muted">
                      {t`Will be staked`}
                    </div>
                    {values.stakedBalance}
                  </div>
                  <div className="pb-3 mb-3">
                    <div className="text-muted">
                      {t`Balance after`}
                    </div>
                    {values.tokenBalance}
                  </div>
                  <div className="pb-3 mb-3">
                    <DashNumber
                        label={t`Daily rewards`}
                        value={values.stakedBalance * values.rewardRate / 100 / 365}
                        symbol={values.rewardSymbol}
                    />
                  </div>
                  <div>
                    <DashNumber
                        label={t`Monthly rewards`}
                        value={values.stakedBalance * values.rewardRate / 100 / 30}
                        symbol={values.rewardSymbol}
                    />
                  </div>
                </>
              </FormApproveModal>
            </>
        )
      }}
    </Form>
  )
}
