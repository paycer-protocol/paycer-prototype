import GradientButton from '@components/atoms/button/gradient-button'
import React from 'react'
import Icon from '@components/atoms/icon'
import { Shuffle } from '@styled-icons/material'
import {t} from "@lingui/macro";
import {useDapp} from "@context/dapp-context"

const Stats = () => {
    return (
        <div className="row">
            <div className="col-3 d-flex flex-column pe-3">
                <h1 className="display-4 mb-1">
                    6<Icon component={Shuffle} size={20} />
                </h1>
                <span>{t`different Qualities`}</span>
            </div>
            <div className="col-3 d-flex flex-column pe-3">
                <h1 className="display-4 mb-1">
                    5 <Icon component={Shuffle} size={20} />
                </h1>
                <span>{t`different NFT Tiers`}</span>
            </div>
            <div className="col-3 d-flex flex-column pe-3">
                <h1 className="display-4 mb-1">20,000</h1>
                <span>{t`possible combinations`}</span>
            </div>
            <div className="col-3 d-flex flex-column pe-3">
                <h1 className="display-4 mb-1">40%</h1>
                <span>{t`possible rewards`}</span>
            </div>
        </div>
    )
}

interface StageProps {
    onMintClicked: () => void
    onMoreInfoClicked: () => void
}

const Stage = (props: StageProps) => {
    const { isAuthenticated } = useDapp()

    return (
        <div className="blur-background blur--weak">
            <div className="row">
                <div className="col-xl-7 pe-5">
                    <h1 className="display-1 mb-4">
                        {
                            isAuthenticated
                                ? t`Collect your Paycer Utility NFT`
                                : t`Earn even more Paycer`
                        }
                    </h1>
                    <div className="mt-5 mb-5">
                        <span className="me-4">
                            {
                                isAuthenticated
                                    ? <GradientButton onClick={props.onMintClicked}>
                                        {t`Mint your NFT now`}
                                    </GradientButton>
                                    : 'add connect walllet button'
                            }
                        </span>
                        <GradientButton isInverted onClick={props.onMoreInfoClicked}>
                            <span className="bg-dark">Learn more</span>
                        </GradientButton>
                    </div>
                    <p className="m-0 text-muted">
                        {
                            isAuthenticated
                                ? t`Simply collect your limited super rare NFT. Your staked PCR Token will be locked for 6 months. Click on Mint your NFT now to start gaining extra profits.`
                                : <Stats />
                        }
                    </p>
                </div>
                <div className="col-xl-5">
                    <div className="card p-0 mb-0 overflow-hidden border-purple-dark">
                        <div className="card-body p-0 d-flex">
                            <video width="100%" height="100%" controls={false} loop autoPlay>
                                <source src="/img/nft/animated_medium20220126-24456-1gd6r9n.mp4" type="video/mp4" />
                            </video>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Stage
