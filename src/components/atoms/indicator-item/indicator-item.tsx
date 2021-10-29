import { HTMLAttributes } from 'react';
import styled from 'styled-components'

// Matches Bootstrap
type IndicatorStates = 'danger' | 'info' | 'success' | 'warning';

interface IndicatorProps extends HTMLAttributes<HTMLElement> {
  children: any
  state: IndicatorStates
}

const StyledIndicatorItem = styled.div`
  display: inline-flex;
  align-items: center;
  user-select: none;

  .icon-indicator {
    display: inline-block;
    border-radius: 50%;
    margin-right: .375em;
    width: .5em;
    height: .5em;
    box-shadow: 0 0 0.5em 0.025em;
  }
`

/**
 * Text item with state indicator visual (dot).
 * Derived from Dashkit layout for online/offline states and table legends;
 * but with better text alignment for scalable typefaces.
 */
export default function IndicatorItem({ children, ...props }: IndicatorProps) {
  const { state } = props;

  console.log('IndicatorItem')

  return (
    <StyledIndicatorItem {...props}>
      <span className={`icon-indicator text-${state} bg-${state}`}></span>
      {children}
    </ StyledIndicatorItem>
  )
}
