import React from 'react'
import Input from '@components/atoms/form/input'
import { useFormikContext } from 'formik'
import { InvestFormProps } from '../types'
import setWillReceive from '../../helper/set-will-receive'
import {preSaleReferralBonusPercantage} from "@config/token-sale";
import GradientButton from "@components/atoms/button/gradient-button";
import {t} from "@lingui/macro";

export default function ReferralCodeInput() {
    const { values, setFieldValue, setFieldError } = useFormikContext<InvestFormProps>()

    return (
        <div className="row">
            <div className="col-5">
                <Input
                    name="referralCode"
                    className="w-100"
                    disabled={!values.token0Balance}
                    onChange={(e) => {
                        const value = e.target.value

                        if (!value) {
                            setFieldValue('referralCodeValid', false)
                            setWillReceive(values.token0, values.token0Value, false, setFieldValue)
                        }

                        setFieldValue('referralCode', value)
                    }}
                />
            </div>
            <div className="col-6 d-flex align-items-center">
                <GradientButton className="px-4" onClick={() => {
                    //TODO API CALL
                    const referralCodeValid = true
                    setFieldValue('referralCodeValid', referralCodeValid)
                    setWillReceive(values.token0, values.token0Value, referralCodeValid, setFieldValue)
                }} disabled={!values.referralCode}>
                    {t`Check Code`}
                </GradientButton>
            </div>

        </div>
    )
}

