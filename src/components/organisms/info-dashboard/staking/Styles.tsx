import styled from 'styled-components'
import DropdownComponent from "@components/atoms/dropdown/dropdown"

export const StyledDropdownToggle = styled(DropdownComponent.Toggle)`
    background: transparent!important;
    border: 0 none;
    padding: 0;
    font-weight: 300;    
    &:after { display: none }
    &:focus {
      box-shadow: none!important;
    }
    &:hover { opacity: 0.7 }
    .card-body { width: 54px; padding: 12px 0 10px}
`

export const StyledDropdownMenu = styled(DropdownComponent.Menu)`
    inset: initial!important;
    top: 0!important;
    padding: 14px;
    border-width: 1px;
    right: 0!important;
    width: 57px!important;
    min-width: auto;
    > div {
        &:hover { 
            color: #FFF!important; 
        }
        &:last-child {
            margin-bottom: 0!important;
        }
        cursor: pointer;
    }
`
export const StyledDropdownComponent = styled(DropdownComponent)`

`

