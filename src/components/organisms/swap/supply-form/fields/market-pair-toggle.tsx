import React from 'react'
import {ChevronDown} from '@styled-icons/bootstrap'
import * as Styles from '@components/organisms/swap/Styles'
import CurrencyIcon from '@components/atoms/currency-icon'
import Icon from '@components/atoms/icon'
import { TokenType } from '../../../../../types/investment'
import {t} from "@lingui/macro";

export interface MarketPair {
    pairs: TokenType[]
}

interface MarketPairToggleProps {
    marketPair: MarketPair
    onClick: () => void
}


export default function MarketPairToggle(props: MarketPairToggleProps) {
    const { marketPair, onClick } = props
    return (

    )
}
