import styled from 'styled-components'

// Matches Bootstrap states
type IndicatorStates = 'success' | 'danger' | 'warning' | 'error';

interface IndicatorProps {
  children: any
  state: IndicatorStates
}

const StyledIndicatorItem = styled.div`
  align-items: center;
  display: inline-flex;

  .icon-indicator {
    display: inline-block;
    border-radius: 50%;
    margin-right: .375em;
    width: .5em;
    height: .5em;
    background:red;
    box-shadow: 0 0 0.5em 0.025em;
  }
`

/**
 * Text item with state indicator visual (dot).
 * Derived from Dashkit layout for online/offline states and table legends;
 * but with better text alignment for scalable typefaces.
 */
export default function IndicatorItem({ children, state, ...props }: IndicatorProps) {
  console.log('IndicatorItem')

  return (
    <StyledIndicatorItem>
      <span className={`icon-indicator text-${state} bg-${state}`}></span>
      {children}
    </ StyledIndicatorItem>
  )
}
