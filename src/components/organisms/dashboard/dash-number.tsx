import React from 'react'
import { FormattedNumber } from '../../atoms/number/formatted-number'
import CurrencyIcon from '@components/atoms/currency-icon'

export interface DashNumberProps {
    label?: string
    value: number
    symbol: string,
    withIcon?: boolean
}

const DashNumber = (props: DashNumberProps) => {
    const { withIcon = false, label, value, symbol } = props

    return (
      <div className="d-flex flex-column">
          {label &&
              <span className="text-muted mb-2">
                  {label}
              </span>
          }
          <span>
            <FormattedNumber
              value={value}
              minimumFractionDigits={2}
              maximumFractionDigits={4}
            />
              {(withIcon ?
                <CurrencyIcon
                  symbol={symbol}
                  className="ms-2"
                  width={28}
                  height={28}
                  style={{marginTop: '-4px'}}
                /> : <>&nbsp; {symbol}</>
              )}
          </span>
      </div>
    )
}

export default DashNumber
