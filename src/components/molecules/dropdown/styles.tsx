import styled, { css } from 'styled-components'

export const DropdownContent = styled.div`
position: absolute; right: 0;  margin-top: 20px; border-radius: 10px; z-index: 44; top: 100%;
`

export const DropdownOpener = styled.div`
   ${props => props.isOpen && css`
    background: linear-gradient(86deg,rgba(133,12,167,1) 0%,rgba(66,1,220,1) 100%)!important;
  `}
    border-radius: 25px;
    flex-direction: row; padding: 0 20px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    .opener-svg {
        color: #FFFFFF;
        &:hover {
            color: #a6a6a6;
        }
    }
`

export const DropdownContentChevron = styled.div`
  width: 0;
  height: 0;
  border-top: 11px solid transparent;
  border-bottom: 11px solid transparent;
  border-right: 11px solid #213752;
  position: relative;
  transform: rotate(90deg);
  top: -16px;
  position: absolute;
  right: 17px;
  &:after {
    content: '';
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-right: 10px solid #192434;
    position: absolute;
    top: -10px;
    left: 1px;
  }
`

export const DropdownLabel = styled.div`
margin-left: 15px;
`