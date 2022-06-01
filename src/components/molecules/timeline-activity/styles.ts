import styled, { css } from 'styled-components'

export const StyledTimeline = styled.div<any>`
    background: #1B2236;
    border: 1px solid #3B506C;

    svg {
      fill: #3B506C;
    }
    
   ${props => props.isActive && css`
    border: 1px solid #00D97E;
    svg {
      fill: #00D97E;
    }
  `}
    
`


export const StyledListGroupItem = styled.div<any>`
  ${props => props.isIndendet && css`
    margin-left: 30px;
  `}
  
  ${props => props.isIndendetOpener && css`
    &:before {
      transform: rotate(150deg);
      top: 46px!important;
      left: 32px!important;
      height: 69%!important;
    }
  `}
  
  ${props => props.isActive && css`

    &:before {
      border-color: #00D97E!important;
    }
  `}
  
`