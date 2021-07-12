import React from 'react'
import { StyledIconProps } from '@styled-icons/styled-icon'
import { ProgressBar , Step } from 'react-step-progress-bar'

export interface StepLineProps extends StyledIconProps {
    steps?: any,
    progress?: number,
    symbolName?: string,
    symbolShorthand?: string
}

const StepProgressBar: React.FC<StepLineProps> = ({ steps, progress, symbolName, symbolShorthand }: StepLineProps) => {

    if (!steps) {
        return null
    }

    return (
        <div className="m-4">
            <ProgressBar percent={progress}>
                <Step>
                    {({ accomplished}) => (
                        <div
                            className={`indexedStep ${accomplished ? "accomplished" : null}`}
                        >
                            <img src={`assets/token/svg/color/${symbolShorthand}.svg`} />
                            <span>{symbolName}</span>
                        </div>
                    )}
                </Step>
                {steps.map((data) => (
                    <Step>
                        {({accomplished}) => (
                            <div
                                className={`indexedStep ${accomplished ? "accomplished" : null}`}
                            >
                                <img src={data.imgPath} />
                                <span>{data.label}</span>
                            </div>
                        )}
                    </Step>
                ))}
                <Step>
                    {({accomplished}) => (
                        <div
                            className={`indexedStep ${accomplished ? "accomplished" : null}`}
                        >
                            <img src={`assets/token/svg/color/${symbolShorthand}.svg`} />
                            <span>{symbolName}</span>
                        </div>
                    )}
                </Step>
            </ProgressBar>
        </div>
    )
}

export default StepProgressBar
