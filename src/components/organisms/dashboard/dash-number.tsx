import React from 'react'
import { StyledIcon } from '@styled-icons/styled-icon'
import { Variant } from 'react-bootstrap/types'
import Icon from '@components/atoms/icon'
import Card from '@components/molecules/card'
import {Trans} from "@lingui/macro";
import {FormattedNumber} from "../../atoms/number/formatted-number";
import {normalizeFilename} from "../../../helper/filename";

export interface DashNumberProps {
    label: string
    value: number
    symbol: string,
    withIcon?: boolean
}

const DashNumber = (props: DashNumberProps) => {
    const { withIcon = false, label, value, symbol } = props

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
              {(withIcon &&
                <img width="28" className="ms-2" style={{marginTop: '-4px'}} src={`/assets/icons/${normalizeFilename(symbol)}.svg`} alt={symbol} />
              )}
          </span>
      </div>
    )
}

export default DashNumber
