import React from 'react'
import * as Styles from './Styles'
import SlippageTollerance from '../fields/slippage-tollerance'
import DeadlineMinutes from '../fields/deadline-minutes'
import DisableMultihops from '../fields/disable-multihops'
import Icon from '@components/atoms/icon'
import DropdownComponent from '@components/atoms/dropdown/dropdown'
import { Settings } from '@styled-icons/fluentui-system-regular'
import {useFormikContext} from "formik";
import {SwapProps} from '@components/organisms/swap/types'

const SettingsDropdown = () => {
  const { values } = useFormikContext<SwapProps>()
  return (
    <DropdownComponent>
      <Styles.StyledDropdownToggle style={!values.token1 || !values.token0 ? {opacity: '.5', pointerEvents: 'none'} : null}>
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
        <div>
          <div className="mb-4">
            <DisableMultihops />
          </div>
          <div className="mb-4">
            <SlippageTollerance />
          </div>
          <div className="">
            <DeadlineMinutes />
          </div>

        </div>
      </Styles.StyledDropdownMenu>
    </DropdownComponent>
  )
}

export default SettingsDropdown
