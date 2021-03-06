import styled from 'styled-components'

export const Toolbar = styled.div`
    margin-bottom: 30px;
    display: flex;
    justify-content: flex-end; 
    div {
        border: 1px solid #FFF; height: 40px;
        font-weight: bold;
        transition: all;
        border-radius: 25px;
        width: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 10px; font-weight: 400; cursor: pointer;
        &:hover {
            background: linear-gradient(86deg, rgb(109, 12, 136) 0%, rgb(59, 4, 189) 100%); border-color: transparent;
        }
        &.is--Active {
            background: linear-gradient(86deg, rgba(133, 12, 167, 1) 0%, rgba(66, 1, 220, 1) 100%);
            color: #FFF; border-color: transparent;
        }
    }    
`

export const CurrencyInputLabel = styled.h5`
    text-transform: uppercase;
    letter-spacing: .08em;
    color: #a6a6a6;
    margin-bottom: 15px;
`


