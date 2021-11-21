import styled from 'styled-components'
import Select from '@components/atoms/form/select'

export const LeftCol = styled.div`
    width: 50%;
    padding: 30px 0 30px 30px;
  
    @media only screen and (max-width : 978px) {
      width: 100%;
      padding: 25px;
    }
`

export const RightCol = styled.div`
    width: 50%;
    padding: 30px 30px 30px 0;
      
    @media only screen and (max-width : 978px) {
        width: 100%;
        padding: 25px;
    }
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

export const SelectWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    cursor: pointer;
    height: 100%;
    
    > div {
      width: 100%;
    }
`

export const StyledButton = styled.button`
    background: linear-gradient(86deg, rgba(133,12,167,1) 0%, rgba(66,1,220,1) 100%);
    color: #FFF;
    font-weight: 300;
    padding: 8px 80px;
`

export const TokenToggle = styled.div`
    color: #FFF;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 22px;
`
