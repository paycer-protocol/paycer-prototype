import Quality, { QUALITIES, QUALITY_COLORS } from "./quality";

export interface QualityCircleProps {
    quality: Quality,
}

const QualityCircle = (props: QualityCircleProps) => {
    return (
        <div
            style={{
                width: '1rem',
                height: '1rem',
                borderRadius: '100%',
                boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25), inset 0px 4px 4px rgba(0, 0, 0, 0.25)',
                backgroundColor: QUALITY_COLORS[props.quality],
            }}
        />
    );
}

interface QualityCircleGroupProps {
    qualities: Quality[];
}

const QualityCircleGroup = ({ qualities }: QualityCircleGroupProps) => {
    return (
        <div className="d-flex">
            {qualities.map((quality, index) => <div className={index == qualities.length - 1 ? '' : 'me-2'}><QualityCircle quality={quality} /></div>)}
        </div>
    );
}

QualityCircle.Group = QualityCircleGroup;

export default QualityCircle;