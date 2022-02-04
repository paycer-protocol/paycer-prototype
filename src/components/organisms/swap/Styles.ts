import styled from 'styled-components'
import Select from '@components/atoms/form/select'


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

export const LeftCol = styled.div`
    width: 40%;
    padding: 35px 20px 35px 35px;
    align-items: stretch;
    @media only screen and (max-width : 978px) {
      width: 100%; padding: 20px;    
    } 
`

export const RightCol = styled.div`
    width: 60%;
    padding: 35px 35px 35px 20px;
    align-items: stretch;
    @media only screen and (max-width : 978px) {
      width: 100%; padding: 20px;    
    }
`

export const SwapCard = styled.div`
  .card-body { padding: 20px; } &:hover { border-color #365172; }
`