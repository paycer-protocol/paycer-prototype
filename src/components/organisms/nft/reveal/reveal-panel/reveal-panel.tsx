import React from 'react'
import {t} from "@lingui/macro";
import GradientButton from "@components/atoms/button/gradient-button";

export interface RevealPanelProps {

}

const RevealPanel = (props: RevealPanelProps) => {
    const startTime = new Date(Date.parse('30 Oct 2022 00:00:00 GMT'));
    const timeLeft = startTime.getTime() - Date.now()
    const isRevealAble = true

    function Countdown({timeLeft}: { timeLeft: number }) {
        const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
        const hours = Math.floor((timeLeft / 1000 / 60 / 60) % 24);
        const days = Math.floor((timeLeft / 1000 / 60 / 60 / 24));

        return (
            <div className="row d-flex align-items-center justify-content-between">
                <div className="col-4 col-md-3 position-relative">
                    <div className="card mb-0 p-3 bg-dark text-center">
                        <span className="fw-bold p-1" style={{fontSize: '22px'}}>{days}D</span>
                    </div>
                    <div className="d-md-none position-absolute" style={{right: '-11px', top: '20px'}}>
                        <span className="display-4 mx-2">:</span>
                    </div>
                </div>

                <div className="col-1 d-none d-md-block">
                    <span className="display-4 mx-1">:</span>
                </div>
                <div className="col-4 col-md-3 position-relative">
                    <div className="card mb-0 p-3 bg-dark text-center">
                        <span className="fw-bold p-1" style={{fontSize: '22px'}}>{hours}H</span>
                    </div>
                    <div className="d-md-none position-absolute" style={{right: '-11px', top: '20px'}}>
                        <span className="display-4 mx-1">:</span>
                    </div>
                </div>
                <div className="col-1 d-none d-md-block">
                    <span className="display-4 mx-2">:</span>
                </div>
                <div className="col-4 col-md-3">
                    <div className="card mb-0 p-3 bg-dark text-center">
                        <span className="fw-bold p-1" style={{fontSize: '22px'}}>{minutes}M</span>
                    </div>
                </div>
            </div>
        )
    }

    const handleReveal = () => {

    }

    return (
        <div>
            <h5 className="text-uppercase mb-2 text-pink fw-bold text-end">
                {t`Collect`}
            </h5>
            <div className="h1 mb-5 text-end">
                {t`Paycer Utility NFT`}
            </div>

            <h2 className="display-2 mb-3 mb-md-4 text-end">
                {t`Your NFT reveal`}
            </h2>

            <div className="mb-5">
                <Countdown timeLeft={timeLeft}/>
            </div>


            <div className="d-flex justify-content-end" onClick={() => handleReveal()}>
                <GradientButton disabled={!isRevealAble}>{t`REVEAL MY NFT`}</GradientButton>
            </div>

        </div>
    )

}

export default RevealPanel

