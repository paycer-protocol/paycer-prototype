import React, { useState } from 'react'
import styled from 'styled-components'
import { useFormikContext } from 'formik'
import { t } from '@lingui/macro'
import Icon from '@components/atoms/icon'
import { Settings } from '@styled-icons/fluentui-system-regular/Settings'
import { Settings as SettingsActive } from '@styled-icons/ionicons-sharp/Settings'
import CurrencyIcon from '@components/atoms/currency-icon'
import { useDapp } from '@context/dapp-context'
import SlippageTollerance from '@components/organisms/swap/fields/slippage-tollerance'
import { FormattedNumber } from '../../../atoms/number/formatted-number'
import { SwapProps } from '../types'

const Content = styled.div`
    z-index: 2; 
    border-top-left-radius: 0; 
    border-top-right-radius: 0;
    margin-top: -2px;
    max-height: 0;
    transition: max-height 0.15s ease-out;
    overflow: hidden; font-size: 14px;
    &.is--Open {
        max-height: 700px;
        transition: max-height 0.15s ease-in;
    }
`

const SettingsDropdown = () => {
  const { values } = useFormikContext<SwapProps>()
  const [open, setOpen] = useState(false)

  return (
    <div className="position-relative">
      <div
        onClick={() => {
          if (values?.fromToken && values?.toToken) {
            setOpen(!open)
          }
        }}
        className={`cursor-pointer card shadow-none mb-0  ${open ? 'bg-dark border-bottom-0' : ''}`}
      >
        <div className="card-body p-3 p-md-3">
          <div className="d-flex align-items-center justify-content-between w-100">
            {t`Settings`}
            <Icon
              component={open ? SettingsActive : Settings}
              size={24}
              style={{ position: 'relative', top: '-1px' }}
            />
          </div>
        </div>
      </div>
      <Content
        className={`cursor-pointer card shadow-none mb-2 bg-dark position-absolute w-100 border-bottom-0 border-top-0 ${open ? 'is--Open' : ''}`}
      >
        <div className="card-body p-3 p-md-3">
          <div className="d-flex justify-content-between">
            <SlippageTollerance />
          </div>
        </div>
      </Content>
    </div>
  )
}

export default SettingsDropdown
