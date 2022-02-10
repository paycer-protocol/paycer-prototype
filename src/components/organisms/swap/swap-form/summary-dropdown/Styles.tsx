import styled from 'styled-components'
import DropdownComponent from "@components/atoms/dropdown/dropdown";

export const Header = styled.div`
    .card-body { 
        padding: 13px 15px 11px 20px;  
    } 
    font-size: 13px;     &:hover { opacity: 0.7 }
`

export const Content = styled.div`
    z-index: 2; 
    border-top-left-radius: 0; 
    border-top-right-radius: 0;
    margin-top: -2px;
    max-height: 0;
    transition: max-height 0.15s ease-out;
    overflow: hidden; font-size: 14px;
    &.is--Open {
        max-height: 700px;
        transition: max-height 0.15s ease-in;
    }
    .card-body { 
        padding: 10px 20px 15px 20px; 
    } 
`