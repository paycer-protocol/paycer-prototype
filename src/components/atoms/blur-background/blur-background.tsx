import React from 'react'
import styled from 'styled-components'

const BlurBackground = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(122deg,#86325591,#229c7a4d);
    filter: blur(80px);
    -webkit-filter: blur(80px);
    opacity: 0.85;
`

export default BlurBackground