import styled from 'styled-components'

export const ModelWrapper = styled.div`
  position: absolute;
  width: 600px; height: 600px;
  canvas { 
    height: 700px; width: 600px; position: absolute; top: -235px;
    @media screen and (max-width: 768px) {
      left: -35vw;
    }
  }
`

export const SubLine = styled.h4`
  font-size: 16px;
`

export const Content = styled.section`

`

export const AttributeCardImageContainer = styled.div`
  background: radial-gradient(circle at center, rgba(101, 108, 170, 0.3) 0, rgba(13, 17, 36, 0.3), #0f0d27 100%);
  border-radius: 8px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
`
