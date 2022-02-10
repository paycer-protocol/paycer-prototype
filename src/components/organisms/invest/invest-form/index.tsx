import React, {memo} from 'react'
import * as Yup from 'yup'
import useToken from '@hooks/use-token'
import Form from '@components/atoms/form/form'
import DashNumber from '@components/organisms/dashboard/dash-number'
import InvestRangeSlider from './fields/invest-range-slider'
import InvestInput from './fields/invest-input'
import SubmitButton from './fields/submit-button'
import {InvestFormFields} from '../types'
import { t } from '@lingui/macro'
import {useInvestList} from '@context/invest-list-context'
import CurrencyIcon from "@components/atoms/currency-icon";
import TokenInputPanel from "@components/organisms/token-input-panel";
import InfoTooltip from "@components/atoms/info-tooltip";

const InvestForm = () => {

    const {
        strategy
    } = useInvestList()

    const handleSubmit = (values: InvestFormFields) => {
        alert(values.investAmount)
    }

    const baseToken = useToken(strategy.input.symbol)

    const initialValues: InvestFormFields = {
        // invest pairs
        baseSymbol: strategy.input.symbol,
        investAmount: null,
        balance: baseToken.tokenBalance(),
        investSymbol: strategy.output.symbol,

        // interest
        interestRate: strategy.interest.interestRate,
        interestSymbol: strategy.interest.interestSymbol,
        dailyInterest: 0,

        // rewards
        rewardSymbol: strategy.rewards.rewardSymbol,
        rewardRate: strategy.rewards.rewardRate,
        dailyRewards: 0,

        // fees
        feeSymbol: strategy.fees.feeSymbol,
        investFee: strategy.fees.investFee,
        fee: 0,

        investRange: 0
    }

    const validationSchema = Yup.object().shape({
        investAmount: Yup.number().min(0).required()
    })

    return (
        <Form
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
            enableReinitialize
        >
            {({values}) => (
                <div className="shadow-none mb-0">
                    <div className="d-flex mb-3">
                        <label className="form-label">
                            {t`Your APR:`}
                        </label>
                        <span className="ps-2">
                        <div className="d-flex">
                            {strategy.interest.interestRate + strategy.rewards.rewardRate}%
                            <InfoTooltip>
                                <>
                                    <div className="d-flex align-items-center">
                                        <CurrencyIcon
                                            symbol={strategy.input.symbol}
                                            className="me-3"
                                            width={15}
                                            height={15}
                                        />
                                        {strategy.interest.interestRate}&nbsp;%&nbsp;{strategy.input.symbol}
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <CurrencyIcon
                                            symbol="PCR"
                                            className="me-3"
                                            width={15}
                                            height={15}
                                        />
                                        {strategy.rewards.rewardRate}&nbsp;%&nbsp;{t`PCR`}
                                    </div>
                                </>
                            </InfoTooltip>
                        </div>
                    </span>
                    </div>

                    <div className="mb-5 pb-2">
                        <InvestRangeSlider/>
                    </div>

                    <TokenInputPanel
                        tokenInputSibling={
                            <div className="d-flex align-items-center cursor-pointer">
                                <CurrencyIcon
                                    symbol={strategy.input.symbol}
                                    className="me-3"
                                    width={32}
                                    height={32}
                                />
                                <div>
                                    <div className="d-flex align-items-center">
                                        <h3 className="mb-0 text-white">{strategy.input.symbol}</h3>
                                    </div>
                                </div>
                            </div>
                        }
                        tokenInput={<InvestInput/>}
                    />

                    <div className="card shadow-none mt-4 bg-card-blue-light ">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-4">
                                    <DashNumber
                                        label={t`Daily rewards`}
                                        value={values.dailyRewards}
                                        symbol={values.rewardSymbol}
                                    />
                                </div>
                                <div className="col-4">
                                    <DashNumber
                                        label={t`Daily interest`}
                                        value={values.dailyInterest}
                                        symbol={values.interestSymbol}
                                    />
                                </div>
                                <div className="col-4">
                                    <DashNumber
                                        label={t`Fee`}
                                        value={values.fee}
                                        symbol={values.feeSymbol}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-center">
                        <SubmitButton/>
                    </div>
                </div>
            )}
        </Form>
    )
}

export default memo(InvestForm)
