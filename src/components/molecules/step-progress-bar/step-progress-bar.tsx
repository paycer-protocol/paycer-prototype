import React from 'react';
import { t } from '@lingui/macro';
import { ProgressBar, Step } from 'react-step-progress-bar';

export interface StepLineProps {
  steps: any,
  progress: number,
  symbolName: string,
  symbolShort: string
}

const StepProgressBar: React.FC<StepLineProps> = ({ steps, progress, symbolName, symbolShort }: StepLineProps) => {
  if (!steps) {
    return null;
  }

  return (
    <div className="m-4">
      <ProgressBar percent={progress}>
        <Step>
          {({ accomplished }) => (
            <div
              className={`indexedStep ${accomplished ? 'accomplished' : null}`}
            >
              <img src={`/assets/token/svg/color/${symbolShort.toLowerCase()}.svg`} alt={symbolName} />
              <span>
                {/* @ts-ignore */}
                {t`Invest`}
                <br />
                {symbolName}
              </span>
            </div>
          )}
        </Step>
        {steps.map((data, i) => (
          <Step key={`steps${i}`}>
            {({ accomplished }) => (
              <div
                className={`indexedStep ${accomplished ? 'accomplished' : null}`}
              >
                <img src={data.imgPath} alt="step" />
                <span>{data.label}</span>
              </div>
            )}
          </Step>
        ))}
        <Step>
          {({ accomplished }) => (
            <div
              className={`indexedStep ${accomplished ? 'accomplished' : null}`}
            >
              <img src={`/assets/token/svg/color/${symbolShort.toLowerCase()}.svg`} alt={symbolName} />
              <span>
                {/* @ts-ignore */}
                {t`Withdraw`}
                <br />
                {symbolName}
              </span>
            </div>
          )}
        </Step>
      </ProgressBar>
    </div>
  );
};

export default StepProgressBar;
