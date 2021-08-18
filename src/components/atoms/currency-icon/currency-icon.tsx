import React from 'react'

export interface CurrencyIconProps {
  symbol: string;
  width?: number;
  height?: number;
  className?: string;
  style?: object;
}

const CurrencyIcon: React.FC<CurrencyIconProps> = ({ symbol, width = 20, height = 20, className, style}) => {
  return (
    <img
      src={`/assets/icons/${symbol}.svg`}
      alt={symbol}
      width={width}
      height={height}
      className={className}
      style={style}
    />
  )
}

export default CurrencyIcon
