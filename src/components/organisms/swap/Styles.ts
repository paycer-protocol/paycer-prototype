import styled from 'styled-components'
import Select from '@components/atoms/form/select'

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
    margin-bottom: 15px;
`

export const InfoHeadline = styled.h5`
    text-transform: uppercase;
    letter-spacing: .08em;
    color: #a6a6a6;
    margin-bottom: 15px;
`

export const Headline = styled.h2`
    text-transform: uppercase;
    font-size: 22px;
    color: #FFFFFF;
`

export const StyledButton = styled.button`
    background: linear-gradient(86deg, rgba(133,12,167,1) 0%, rgba(66,1,220,1) 100%);
    color: #FFF;
    font-weight: 300;
    padding: 8px 80px;
`