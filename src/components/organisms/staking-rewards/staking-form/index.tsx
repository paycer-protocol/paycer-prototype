import React from 'react'
import {t, Trans} from '@lingui/macro'
import * as Yup from 'yup'
import {FormikValues} from 'formik'
import {rewardSymbol, rewardDepositFee as depositFee, rewardWithdrawFee as withdrawFee} from '@config/staking-rewards'
import DashNumber from '@components/organisms/dashboard/dash-number'
import TransactionApproveModal from '@components/organisms/transaction-approve-modal'
import Form from '@components/atoms/form/form'
import useToken from '@hooks/use-token'
import useStaking from '@hooks/use-staking'
import StakeRangeSlider from './fields/stake-range-slider'
import StakedInput from './fields/staked-input'
import SubmitButton from './fields/submit-button'
import RewardFee from './reward-fee'
import {StakingProps} from '../types'
import CurrencyIcon from '@components/atoms/currency-icon'
import InfoTooltip from "@components/atoms/info-tooltip"
import TokenInputPanel from "@components/organisms/token-input-panel"

export default function StakingForm() {
    const {
        withdraw,
        deposit,
        stakedBalance,
        rewardRate,
        showFormApproveModal,
        setShowFormApproveModal,
        depositIsLoading,
        depositIsFetching,
        depositIsSuccess,
        approveIsLoading,
        approveIsFetching,
        withdrawIsLoading,
        withdrawIsFetching,
        withdrawIsSuccess,
        contractCallError,
        resetStatus
    } = useStaking()

    const token = useToken(rewardSymbol)
    const tokenBalance = token.tokenBalance

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
            const depositAmount = (values.stakedBalance - initialValues.stakedBalance) - values.depositFee
            await deposit(depositAmount)
        } else {
            const withdrawAmount = (initialValues.stakedBalance - values.stakedBalance) - values.withdrawFee
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
            {({values}) => {
                return (
                    <>
                        <div className="animated-wrapper">
                            <div className="d-flex mb-3">
                                <label className="form-label">
                                    {t`Your APR:`}
                                </label>
                                <span className="ps-2">
                                    <div className="d-flex">
                                        {initialValues.rewardRate}%
                                        <InfoTooltip>
                                            <>
                                                <strong>{t`Associate`}</strong> - Stake min 5.000 PCR: 15%<br/>
                                                <strong>{t`Senior`}</strong> - Stake min 15.000 PCR: 18%<br/>
                                                <strong>{t`Manager`}</strong> - Stake min 35.000 PCR: 21%<br/>
                                                <strong>{t`Partner`}</strong> - Stake min 100.000 PCR: 24%
                                            </>
                                        </InfoTooltip>
                                    </div>
                                </span>
                            </div>
                            <div className="mb-4">
                                <StakeRangeSlider/>
                            </div>

                            <div className="py-4 py-md-5">
                                <TokenInputPanel
                                    tokenInputSibling={
                                        <div className="d-flex align-items-center">
                                            <CurrencyIcon
                                                symbol={values.rewardSymbol}
                                                className="me-3"
                                                width={32}
                                                height={32}
                                            />
                                            <div>
                                                <div className="d-flex align-items-center">
                                                    <h3 className="mb-0 text-white">{values.rewardSymbol}</h3>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    tokenInput={<StakedInput/>}
                                />
                            </div>
                            <div className="mb-4 mb-md-5 pb-2">
                                <div className="card shadow-none bg-card-blue-light mb-0">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-6 col-md-4">
                                                <DashNumber
                                                    label={t`Daily rewards`}
                                                    value={values.stakedBalance * values.rewardRate / 100 / 365}
                                                    symbol={values.rewardSymbol}
                                                />
                                            </div>
                                            <div className="col-6 col-md-4">
                                                <DashNumber
                                                    label={t`Monthly rewards`}
                                                    value={values.stakedBalance * values.rewardRate / 100 / 12}
                                                    symbol={values.rewardSymbol}
                                                />
                                            </div>
                                            <div className="col-4 d-none d-md-flex">
                                                <div className="d-flex flex-column">
                                                    <span className="text-muted mb-3">
                                                        <Trans>Estimated fee</Trans>&nbsp;
                                                    </span>
                                                    <RewardFee/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-4 d-md-none">
                                <span className="text-muted mb-1">
                                    <Trans>Estimated fee</Trans>&nbsp;&nbsp;
                                </span>
                                <RewardFee/>
                            </div>
                            <SubmitButton/>
                        </div>

                        <TransactionApproveModal
                            show={showFormApproveModal}
                            onHide={() => {
                                setShowFormApproveModal(false)
                                resetStatus()
                            }}
                            title={t`Confirm Transaction`}
                            onClick={() => handleStaking(values)}
                            successMessage={t`Transaction was successfully executed`}
                            error={contractCallError}
                            success={withdrawIsSuccess || depositIsSuccess}
                            loading={withdrawIsLoading || withdrawIsFetching || depositIsLoading || depositIsFetching || approveIsLoading || approveIsFetching}
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
                                                    value={values.stakedBalance * values.rewardRate / 100 / 12}
                                                    symbol={values.rewardSymbol}
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6">
                                                {t`Fee:`}
                                            </div>
                                            <div className="col-6 fw-bold">
                                                <RewardFee/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        </TransactionApproveModal>
                    </>
                )
            }}
        </Form>
    )
}
