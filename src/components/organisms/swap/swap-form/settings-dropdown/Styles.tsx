import styled from 'styled-components'
import DropdownComponent from "@components/atoms/dropdown/dropdown";

export const Header = styled.div`
    .card-body { 
        padding: 13px 15px 11px 15px;  
    } 
`

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
        ${Header} { background: #0B1120 !important; }
    }
`

export const StyledDropdownMenu = styled(DropdownComponent.Menu)`
    font-size: 14px;
    inset: initial!important;
    top: -20px!important;
    width: 350px;
    padding: 20px;
    right: 20px!important;
    border-width: 1px;
`

