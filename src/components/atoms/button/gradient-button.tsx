import styled, { css } from 'styled-components'
import Button from './button'

interface GradientButtonProps {
  isInverted: boolean
  isSmall: boolean;
  disabled: boolean;
}

const GradientButton = styled(Button)<any>`
  background: linear-gradient(86deg, rgba(133, 12, 167, 1) 0%, rgba(66, 1, 220, 1) 100%);
  color: #FFF;
  font-weight: normal;
  padding: 11px 40px 10px 40px;
  transition: all;
  border-radius: 25px;
  text-align: center; border: 0 none;
  display: flex;
  align-items: center;
  justify-content: center;
  ${(props) => props.isInverted && css`
    background: linear-gradient(86deg, rgba(133, 12, 167, 1) 0%, rgba(66, 1, 220, 1) 100%);
     padding: 9px 2px;
     height: 43px;
     span { 
      padding: 8px 37px;
      border-radius: 25px;
      width: 100%;
    }
  `}
  &:hover {
    background: linear-gradient(86deg, rgb(109, 12, 136) 0%, rgb(59, 4, 189) 100%);
  }
  ${(props) => props.isSmall && css`
     border-radius: 0.25rem;
  `}
  ${(props) => props.disabled && css`
    background: none;
  `}
`

export default GradientButton
