import styled from 'styled-components'

export const StyledDropdownToggle = styled.div`
    background: transparent!important;
    border: 0 none;
    padding: 0;
    font-weight: 300;    
    &:after { display: none }
    &:focus {
      box-shadow: none!important;
    }
    &:hover { opacity: 0.7 }
    .card-body {
        width: 48px;
        padding: 11px 8px 10px;
        font-size: 11px; font-weight: 600;
    }
`

export const StyledDropdownMenu = styled.div`
    position: absolute; z-index: 1;
    padding: 14px;
    border-width: 1px;
    width: 50px!important;
    min-width: auto; font-size: 11px;
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

