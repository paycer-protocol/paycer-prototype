import React from 'react'
import Slider from '@components/atoms/form/range'
import { useFormikContext } from 'formik'
import { StakingProps } from '../../types'
import GradientButton from "@components/atoms/button/gradient-button";
import {t} from "@lingui/macro";

export default function InvestRangeSlider() {
  const { values, initialValues, setFieldValue, dirty } = useFormikContext<StakingProps>()
  const totalBalance = initialValues.stakedBalance + initialValues.tokenBalance

  return (
      <>
          <Slider
              marks={{
                  0: '0%',
                  25: '25%',
                  50: '50%',
                  75: '75%',
                  100: '100%',
              }}
              min={0}
              max={100}
              step={1}
              value={values.stakeRange}
              onChange={(value) => {
                  let stakedBalance = 0 as number
                  let tokenBalance = 0 as number

                  const stakeDiff = totalBalance * value / 100
                  stakedBalance = stakeDiff
                  tokenBalance = totalBalance - stakeDiff

                  stakedBalance = stakedBalance > totalBalance ? totalBalance : stakedBalance
                  stakedBalance = stakedBalance < 0  ? 0 : stakedBalance

                  tokenBalance = tokenBalance > totalBalance ? totalBalance : tokenBalance
                  tokenBalance = tokenBalance < 0 ? 0 : tokenBalance

                  setFieldValue('stakedBalance', stakedBalance)
                  setFieldValue('tokenBalance', tokenBalance)
                  setFieldValue('stakeRange', value)
              }}
          />
          <div className="mt-5 d-flex justify-content-between">
              <div
                  onClick={() => {
                      setFieldValue('stakeRange', 0)
                      setFieldValue('stakedBalance', 0)
                  }}
                  className="btn-sm d-flex align-items-center btn-primary px-3 py-1 fw-normal cursor-pointer">
                  {t`min`}
              </div>
              <GradientButton
                isSmall
                onClick={() => {
                    setFieldValue('stakeRange', 100)
                    setFieldValue('stakedBalance', totalBalance)
                }}
                className="btn-sm d-flex align-items-center btn-primary px-3 py-1 fw-normal cursor-pointer">
                    {t`max`}
              </GradientButton>
          </div>
      </>

  )
}
