import styled from 'styled-components'

// Todo: Align with components/organisms/swap/Styles.ts

export const VerticalLine = styled.div`
    border-right: 1px solid #244166;
    margin: 0 30px;
`

export const LeftCol = styled.div`
    width: 40%;
    padding: 30px 0 30px 30px;

    @media only screen and (max-width : 978px) {
      width: 100%;
      padding: 25px;
    }
`

export const RightCol = styled.div`
    width: 60%;
    padding: 30px 30px 30px 0;

    @media only screen and (max-width : 978px) {
        width: 100%;
        padding: 25px;
    }
`