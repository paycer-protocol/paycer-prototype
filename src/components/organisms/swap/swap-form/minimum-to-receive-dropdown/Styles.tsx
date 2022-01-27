import styled from 'styled-components'
import DropdownComponent from "@components/atoms/dropdown/dropdown";

export const StyledDropdownToggle = styled(DropdownComponent.Toggle)`
    background: transparent!important;
    border: 0 none;
    padding: 0;
    font-weight: 300;
    &:after {
      display: none;
    }
    
    &:focus {
      box-shadow: none!important;
    }
`

export const StyledDropdownMenu = styled(DropdownComponent.Menu)`
    inset: initial!important;
    top: 0!important;
    width: 350px;
    padding: 20px;
    left: 20px!important;
    border-width: 1px;
`