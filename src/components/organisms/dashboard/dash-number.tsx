import React from 'react'
import { StyledIcon } from '@styled-icons/styled-icon'
import { Variant } from 'react-bootstrap/types'
import Icon from '@components/atoms/icon'
import Card from '@components/molecules/card'
import {Trans} from "@lingui/macro";
import {FormattedNumber} from "../../atoms/number/formatted-number";

export interface DashNumberProps {
    label: string
    value: number
    symbol: string
}

const DashNumber = (props: DashNumberProps) => {
    const { label, value, symbol } = props

    return (
      <div className="d-flex flex-column">
          <span className="text-muted mb-1">
              {label}
          </span>
          <span>
            <FormattedNumber
              value={value}
              minimumFractionDigits={2}
              maximumFractionDigits={4}
            />
            &nbsp;{symbol}
          </span>
      </div>
    )
}

export default DashNumber
