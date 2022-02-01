import React from 'react'
import {ChevronDown} from '@styled-icons/bootstrap'
import * as Styles from '@components/organisms/swap/Styles'
import Icon from '@components/atoms/icon'
import { MarketPair } from '../types'
import CurrencyIcon from "@components/atoms/currency-icon";

interface TokenToggleProps {
    marketPair: MarketPair
    onClick: () => void
}

export default function MarketPairSelectToggle(props: TokenToggleProps) {
    const { marketPair, onClick } = props
    return (
        <div onClick={onClick}>
            <div>
                <div className="d-flex">
                    <div className="d-flex align-items-center">
                        <CurrencyIcon
                            symbol={marketPair.token0.symbol}
                            className="me-3"
                            width={30}
                            height={30}
                        />
                        {marketPair.token0.symbol}
                    </div>
                    <span className="ms-3 me-3">
                        /
                    </span>
                    <div className="d-flex align-items-center">
                        <CurrencyIcon
                            symbol={marketPair.token1.symbol}
                            className="me-3"
                            width={30}
                            height={30}
                        />
                        {marketPair.token1.symbol}
                    </div>
                </div>
            </div>
            <Icon
                component={ChevronDown}
                size={20}
                style={{ fontWeight: 'bold' }}
            />
        </div>
    )
}
