import styled from 'styled-components'
import DropdownComponent from '@components/atoms/dropdown/dropdown'

export const StyledDropdownToggle = styled(DropdownComponent.Toggle)`
    position: absolute;
    background: transparent!important;
    border: 0 none;
    padding: 0;
    font-weight: 300;    
    top: -5px;
    left: 4px;
    &:after { display: none }
    &:focus {
      box-shadow: none!important;
    }
`

export const StyledDropdownMenu = styled(DropdownComponent.Menu)`
    line-height: 30px;
    inset: initial!important;
    top: 0!important;
    max-width: 350px;
    padding: 15px 20px;
    left: 20px!important;
    border-width: 1px;
    min-width: 200px;
`
