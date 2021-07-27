import React from 'react'
import styled from 'styled-components'

const BlurBackground = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(122deg,#86325591,#229c7a4d);
    -webkit-backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    backdrop-filter: blur(5px);
    -webkit-filter: blur(8px);
    filter: blur(8px);
    -webkit-filter: blur(80px);
    opacity: 0.78;
`

export default BlurBackground