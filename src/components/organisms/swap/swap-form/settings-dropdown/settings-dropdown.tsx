import React from 'react'
import * as Styles from './Styles'
import {useFormikContext} from 'formik'
import {t} from '@lingui/macro'
import {SwapProps} from '../types'
import Input from '@components/atoms/form/input'
import Icon from '@components/atoms/icon'
import DropdownComponent from '@components/atoms/dropdown/dropdown'
import {Settings} from '@styled-icons/fluentui-system-regular'

const SettingsDropdown = () => {
  const { values, setValues, setFieldValue } = useFormikContext<SwapProps>()

  const handleChange = async (e) => {
    let slippage = e.target.value
    if (slippage > 25) {
      slippage = 25
    }

    if (slippage < 0) {
      slippage = 0
    }

    const nextValues = {
      ...values,
      ...{
        tradeSettings: {
          ...values.tradeSettings,
          ... { slippage }
        },
      }
    }

    if (values.token0 && values.token1) {
      setFieldValue('isLoading', true)
      const nextTradeContext = await values.initFactory(nextValues)
      setValues(nextValues)
      setFieldValue('tradeContext', nextTradeContext)
      setFieldValue('isLoading', false)
    } else {
      setValues(nextValues)
    }
  }

  return (
    <DropdownComponent className="">
      <Styles.StyledDropdownToggle>
        <div className="cursor-pointer card shadow-none mb-2 bg-transparent d-none d-md-flex ms-3">
          <div className="card-body bg-transparent d-flex justify-content-center p-md-3 p-2 ">
            <Icon component={Settings} size={23} style={{ width: '32px' }} />
          </div>
        </div>

        <div className="cursor-pointer card border-0 pt-2 ps-2 shadow-none mb-2 bg-transparent d-md-none">
          <div className="card-body bg-transparent d-flex justify-content-center p-md-3 p-2 ">
            <Icon component={Settings} size={24} style={{ width: '27px' }} />
          </div>
        </div>
      </Styles.StyledDropdownToggle>
      <Styles.StyledDropdownMenu className="bg-dark border">
        <h4 className="mb-4">Transaction-Settings</h4>
        <div className="d-flex justify-content-between">
          <span className="w-50 d-flex align-items-center text-muted">{t`Slippage tolerance`}</span>
          <div className="w-50 d-flex justify-content-between ">
            <div className="w-100 d-flex align-items-center">
              <Input
                name="tradeSettings.slippage"
                style={{ padding: '4px 10px' }}
                type="number"
                value={values.tradeSettings.slippage}
                onChange={handleChange}
              />
              &nbsp;&nbsp;%
            </div>
          </div>
        </div>
      </Styles.StyledDropdownMenu>
    </DropdownComponent>
  )
}

export default SettingsDropdown
