import React from 'react'
import { t } from '@lingui/macro'
import * as Yup from 'yup'
import { FormikValues } from 'formik'
import { rewardSymbol, rewardDepositFee as depositFee, rewardWithdrawFee as withdrawFee } from '@config/staking-rewards'
import DashNumber from '@components/organisms/dashboard/dash-number'
import TransactionApproveModal from '@components/organisms/transaction-approve-modal'
import Form from '@components/atoms/form/form'
import useToken from '@hooks/use-token'
import useWallet from '@hooks/use-wallet'
import useStaking from '@hooks/use-staking'
import StakeRangeSlider from './fields/stake-range-slider'
import StakedInput from './fields/staked-input'
import SubmitButton from './fields/submit-button'
import RewardFee from './reward-fee'
import { StakingProps } from '../types'
import CurrencyIcon from '@components/atoms/currency-icon'
import { FormattedNumber } from '../../../atoms/number/formatted-number'
import truncateText from '../../../../helpers/truncate-text'

export default function StakingForm() {
  const wallet = useWallet()

const {
  withdraw,
  deposit,
  stakedBalance,
  rewardRate,
  withdrawTx,
  approveTx,
  depositTx,
  resetStatus,
  showFormApproveModal,
  setShowFormApproveModal,
  withdrawError,
  depositError,
  isLoading
} = useStaking()

  const token = useToken(rewardSymbol)
  const tokenBalance = token.tokenBalance()

  const initialValues: StakingProps = {
    rewardSymbol,
    stakedBalance,
    tokenBalance,
    rewardRate,
    stakeRange: stakedBalance ? (stakedBalance * 100) / (stakedBalance + tokenBalance) : 0,
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
    if (values.stakedBalance > initialValues.stakedBalance) {
      const stakeAmount = values.stakedBalance - initialValues.stakedBalance
      await deposit(stakeAmount)
    } else {
      const withdrawAmount = initialValues.stakedBalance - values.stakedBalance
      await withdraw(withdrawAmount)
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
                  <div className="col-12 col-md-6 pb-3 pb-md-0">
                    <label className="form-label">
                      {values.stakedBalance !== initialValues.stakedBalance  ? t`Token Balance after` : t` Current Token Balance`}
                    </label>

                    <div className="form-control bg-transparent border-0 ps-0 pt-0 pt-md-3">
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
                  <div className="col-12 col-md-6">
                    <StakedInput />
                  </div>
                </div>
              </div>
              <div className="mb-4 pb-md-3">
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
                      value={values.stakedBalance * values.rewardRate / 100 / 12}
                      symbol={values.rewardSymbol}
                    />
                  </div>
                </div>
                <RewardFee />
              </div>
              <SubmitButton />
            </div>

            <TransactionApproveModal
              show={showFormApproveModal}
              onHide={() => {
                resetStatus()
                setShowFormApproveModal(false)
              }}
              title={t`Confirm Transaction`}
              onClick={() => handleStaking(values)}
              successMessage={t`Transaction was successfully executed`}
              error={
                depositTx.status === 'Fail' ||
                depositTx.status === 'Exception' ||
                approveTx.status === 'Fail' ||
                approveTx.status === 'Exception' ||
                withdrawTx.status === 'Fail' ||
                withdrawTx.status === 'Exception' ||
                withdrawError || depositError
              }
              success={
                depositTx.status === 'Success' ||
                withdrawTx.status === 'Success'
              }
              loading={
                depositTx.status === 'Mining' ||
                withdrawTx.status === 'Mining' ||
                approveTx.status === 'Mining' ||
                isLoading
              }
            >
              <>
                <div className="card blur-background">
                  <div className="card-body">
                    <div className="row mb-4">
                      <div className="col-6">
                        {t`You will stake:`}
                      </div>
                      <div className="col-6 fw-bold">
                        <DashNumber
                            value={values.stakedBalance}
                            symbol={values.rewardSymbol}
                        />
                      </div>
                    </div>
                    <div className="row mb-4">
                      <div className="col-6">
                        {t`Balance after:`}
                      </div>
                      <div className="col-6 fw-bold">
                        <DashNumber
                            value={values.tokenBalance}
                            symbol={values.rewardSymbol}
                        />
                      </div>
                    </div>
                    <div className="row mb-4">
                      <div className="col-6">
                        {t`Daily rewards:`}
                      </div>
                      <div className="col-6 fw-bold">
                        <DashNumber
                            value={values.stakedBalance * values.rewardRate / 100 / 365}
                            symbol={values.rewardSymbol}
                        />
                      </div>
                    </div>
                    <div className="row mb-4">
                      <div className="col-6">
                        {t`Monthly rewards:`}
                      </div>
                      <div className="col-6 fw-bold">
                        <DashNumber
                            value={values.stakedBalance * values.rewardRate / 100 / 30}
                            symbol={values.rewardSymbol}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <RewardFee />
              </>
            </TransactionApproveModal>
          </>
        )
      }}
    </Form>
  )
}
