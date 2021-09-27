import styled from 'styled-components'
import Select from '@components/atoms/form/select'

export const VerticalLine = styled.div`
    border-right: 1px solid #244166;
    margin: 0 30px;
`

export const HorizontalLine = styled.div`
    border-top: 1px solid #244166;
    margin: 30px 0 35px;
    position: relative;
    div {
        background: #192434;
        position: absolute;
        top: -12px;
        left: 45%;
        width: 30px;
        height: 25px;
        span {
            position: absolute;
            display: inline-block;
            vertical-align: middle;
            color: #a6a6a6;
            box-sizing: border-box;
            width: 0;
            height: 0;
            border-width: 3px;
            border-style: solid;
            border-bottom-color: transparent;
            border-left-color: transparent;
            margin: 10px;
            transform: rotate(135deg);
            left: 4px;
            top: 2px;
            &:after, &:before {
                content: "";
                box-sizing: border-box;
            }
            &:before {
                right: -2px;
                top: -3px;
                position: absolute;
                height: 2px;
                box-shadow: inset 0 0 0 32px;
                transform: rotate(-45deg);
                width: 10px;
                -webkit-transform-origin: right top;
                -ms-transform-origin: right top;
                transform-origin: right top;
            }
            
            &:last-child { 
                transform: rotate(314deg);
                left: -1px;
                top: -6px;
            }
        }
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

export const CurrencyInputLabel = styled.h5`
    text-transform: uppercase;
    letter-spacing: .08em;
    color: #a6a6a6;
    margin-bottom: 10px;
`

export const Headline = styled.h2`
    text-transform: uppercase;
    font-size: 22px;
    color: #FFFFFF;
`

export const SelectWrapper = styled.div`
    position: relative;
    display: flex;
    cursor: pointer;
    height: 100%;
    img {
        margin-right: 6px;
        margin-top: 4px;
    }
    
    > div {
      width: 75%;
    }
`

export const LeftCol = styled.div`
    width: 40%;
    padding: 25px 0 25px 30px;
  
    @media only screen and (max-width : 768px) {
      width: 100%;
      padding: 25px;
    }
  
`

export const RightCol = styled.div`
    width: 60%;
    padding: 25px 30px 25px 0;
      
    @media only screen and (max-width : 768px) {
        width: 100%;
        padding: 25px;
    }
`

export const StyledButton = styled.button`
    background: linear-gradient(86deg, rgba(133,12,167,1) 0%, rgba(66,1,220,1) 100%);
    color: #FFF;
    font-weight: 300;
    padding: 8px 80px;
    &:hover {
      text-decoration: underline;
    }
`
