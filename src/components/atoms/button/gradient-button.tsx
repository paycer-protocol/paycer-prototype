import styled, { css } from 'styled-components'
import Button from './button'

const GradientButton = styled(Button)`
  background: linear-gradient(86deg, rgba(133, 12, 167, 1) 0%, rgba(66, 1, 220, 1) 100%);
  color: #FFF;
  font-weight: bold;
  padding: 8px 40px;
  transition: all;
  border-radius: 25px;
  text-align: center;

  &:hover {
    background: linear-gradient(86deg, rgb(109, 12, 136) 0%, rgb(59, 4, 189) 100%);
  }
  ${props => props.isSmall && css`
     border-radius: 0.25rem;
  `}
  ${props => props.disabled && css`
    background: none;
  `}
`

export default GradientButton
