import styled from 'styled-components'
import Select from "@components/atoms/form/select";

export const VerticalLine = styled.div`
    border-right: 1px solid #244166;
    margin: 20px 30px 20px 50px;
`

export const HorizontalLine = styled.div`
    border-top: 1px solid #244166;
    margin: 30px 0 40px;
`

export const StyledSelect = styled(Select)`
    background: transparent;
    border: 0;
    text-transform: uppercase;
    font-size: 20px;
    font-weight: 400;
    cursor: pointer;
    &:focus {
      background: transparent;
    }
`

export const CurrencyInputLabel = styled.h5`
    text-transform: uppercase;
    letter-spacing: .08em;
    color: #a6a6a6;
    margin-bottom: 0;
`

export const SelectWrapper = styled.div`
    position: relative;
    display: flex;
    cursor: pointer;
    img {
        margin-right: 6px;
        margin-top: 10px;
    }
    
    div {
      width: 100%;
    }
    &:after {
        content: "";
        width: 0;
        height: 0;
        border: 3px solid transparent;
        border-top: 3px solid;
        border-right: 3px solid;
        margin: 15px;
        transform: rotate(135deg);
        position: absolute;
        top: 6px;
        right: 35px;
    }
`
