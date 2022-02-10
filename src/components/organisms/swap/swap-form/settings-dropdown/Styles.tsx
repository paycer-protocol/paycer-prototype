import styled from 'styled-components'
import DropdownComponent from "@components/atoms/dropdown/dropdown";


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
    &[aria-expanded="true"] {
 
    }
`

export const StyledDropdownMenu = styled(DropdownComponent.Menu)`
    font-size: 14px;
    inset: initial!important;
    top: -20px!important;
    width: 300px;
    padding: 20px;
    border-width: 1px;    right: 0!important;
`

