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
    height: 100%;
    img {
        margin-right: 6px;
        margin-top: 10px;
    }
    
    > div {
      width: 100%;
    }
`
