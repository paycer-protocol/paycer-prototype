import styled, { css } from 'styled-components'

export const DropdownContent = styled.div`
position: absolute; right: 0;  margin-top: 15px; border-radius: 10px; z-index: 44;
`

export const DropdownOpener = styled.div`
   ${props => props.isOpen && css`
    background: linear-gradient(86deg,rgba(133,12,167,1) 0%,rgba(66,1,220,1) 100%)!important;
  `}
   cursor: pointer; 
   border-radius: 25px;
   &:hover {
     svg { color: #a6a6a6; }
   }
   svg { color: #FFFFFF; }
   padding: 13px;
`

export const DropdownContentChevron = styled.div`
  width: 0;
  height: 0;
  border-top: 9px solid transparent;
  border-bottom: 9x solid transparent;
  border-right: 9px solid #213752;
  position: relative;
  transform: rotate(90deg);
  top: -9px;
  position: absolute;
  right: 17px;
  &:after {
    content: '';
    width: 0;
    height: 0;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
    border-right: 8px solid #192434;
    position: absolute;
    top: -8px;
    left: 1px;
  }
`