import styled from 'styled-components'
import { Quality, qualityColors } from "@config/nft-qualities"


const CitcleWrapper = styled.div`
padding: 1px;
width: 1rem;
height: 1rem;
border-radius: 100%;
box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25), inset 0px 4px 4px rgba(0, 0, 0, 0.25);
border: 1px solid #6e6abd;
`

export interface QualityCircleProps {
    quality: Quality,
}

const QualityCircle = (props: QualityCircleProps) => {
    return (
        <CitcleWrapper
            style={{
                backgroundColor: qualityColors[props.quality],
            }}
        />
    )
}

interface QualityCircleGroupProps {
    qualities: Quality[];
}

const QualityCircleGroup = ({ qualities }: QualityCircleGroupProps) => {
    return (
        <div className="d-flex">
            {qualities.map((quality, index) => <div className={index == qualities.length - 1 ? '' : 'me-2'}><QualityCircle quality={quality} /></div>)}
        </div>
    )
}

QualityCircle.Group = QualityCircleGroup

export default QualityCircle