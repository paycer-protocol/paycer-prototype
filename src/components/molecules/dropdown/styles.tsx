import styled, { css } from 'styled-components'

export const DropdownContent = styled.div`
    position: absolute; 
    right: 28%;  
    margin-top: 20px; 
    border-radius: 10px; 
    z-index: 44; 
    top: 100%;
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




