import Card from "@components/molecules/card"
import {t, Trans} from "@lingui/macro"
import Icon from "@components/atoms/icon"
import React from "react"
import { Lock, ArrowsAngleContract } from '@styled-icons/bootstrap'
import { Reward } from '@styled-icons/fluentui-system-regular'
import { StyledIcon } from '@styled-icons/styled-icon'

interface ExplanationCardProps {
    title: string
    description: string
    icon: StyledIcon
}

const ExplanatoryCard = (props: ExplanationCardProps) => {
    return (
        <div className="col-xl-4">
            <Card>
                <Card.Body className="text-center">
                    <Icon component={props.icon} className="m-auto" size={45} />
                    <h1 className="text-center mb-4 mt-4">{props.title}</h1>
                    <p className="mb-0 text-muted">{props.description}</p>
                </Card.Body>
            </Card>
        </div>
    )
}

const Explanatory = () => {
    return (
        <div>
            <h2 className="display-4 mb-5">
                {t`Learn more`}
            </h2>
            <div className="row">
                <ExplanatoryCard
                    title={t`Mixed reward Qualites`}
                    icon={Reward}
                    description={t`Claim your special NFT utlity token simply by owning and staking Paycer PCR Tokens. There more you stake the more rare your Paycer NFT Tier and the higher your change for exclusiv utilites connected with your nft like higher staking rewards.`}
                />
                <ExplanatoryCard
                    title={t`Locked Period`}
                    icon={Lock}
                    description={t`Claim your special NFT utlity token simply by owning and staking Paycer PCR Tokens. There more you stake the more rare your Paycer NFT Tier and the higher your change for exclusiv utilites connected with your nft like higher staking rewards`}
                />
                <ExplanatoryCard
                    title={t`Value in value Out`}
                    icon={ArrowsAngleContract}
                    description={t`Claim your special NFT utlity token simply by owning and staking Paycer PCR Tokens. There more you stake the more rare your Paycer NFT Tier and the higher your change for exclusiv utilites connected with your nft like higher staking rewards.`}
                />
            </div>
        </div>

    )
}

export default Explanatory