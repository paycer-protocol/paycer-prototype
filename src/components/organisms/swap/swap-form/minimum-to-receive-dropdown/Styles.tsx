import styled from 'styled-components'
import DropdownComponent from "@components/atoms/dropdown/dropdown";

export const StyledDropdownToggle = styled(DropdownComponent.Toggle)`
    background: transparent!important;
    border: 0 none;
    padding: 0;
    font-weight: 300;
    :after {
        content: "";
        display: inline-block;
        border-right: 2px solid #FFF!important;
        border-bottom: 2px solid #FFF!important;
        width: 8px;
        height: 8px;
        transform: rotate(45deg);
        margin-left: 13px;
        position: relative;
        top: -3px;
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