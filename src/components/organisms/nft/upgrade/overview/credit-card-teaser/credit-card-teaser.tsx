import Card from '@components/molecules/card'
import {t} from '@lingui/macro'
import React, {useState} from 'react'
import * as Styles from './styles'
import GradientButton from "@components/atoms/button/gradient-button";

const CreditCardTeaser = () => {
    // TODO
    const [mintingApproveModal, setMintingApproveModal] = useState(false)
    return (
        <div className="blur-background blur--weak">
            <h2 className="display-4 mb-5">
                {t`Paycer Credit Card`}
            </h2>
            <Styles.StyledCard className="bg-dark border border-purple-dark mb-0">
                <Card.Body className="p-5">
                    <div className="col-6">
                        <p className="mb-5 text-muted">
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. Sed diam voluptua. <br /> <br /> At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                        </p>
                        <span onClick={() => setMintingApproveModal(true)}>
                            <GradientButton>
                                {t`Apply`}
                            </GradientButton>
                        </span>
                    </div>
                </Card.Body>
            </Styles.StyledCard>
        </div>

    )
}

export default CreditCardTeaser