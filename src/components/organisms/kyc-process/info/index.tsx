import React from 'react'
import {t, Trans} from '@lingui/macro'
import Card from '@components/molecules/card'
import GradientButton from "@components/atoms/button/gradient-button";

// P368 | Todo: Replace demo content (stateful?)
const KycProcessInfo = () => {
    return (
      <>
        <h2>
            <Trans>Paycer Private is Live</Trans>
        </h2>
        <Card.Text className="mb-5">
            <p className="text-muted">
                <Trans>As an active investor, you can log in with your wallet and have your current status displayed.</Trans>
            </p>
            <p className="text-muted">
                <Trans>If you have not yet invested in Paycer you should have a look at our token sale.</Trans>
            </p>
        </Card.Text>

        <div className="d-flex justify-content-center">
            <GradientButton target="_blank" href="https://www.paycer.io/token-sale">
              {t`Join Private Sale`}
            </GradientButton>
        </div>

        <a target="_blank" href="https://www.paycer.io/token-sale" className="d-flex justify-content-center mb-3">
          <img className="mt-5 rounded" style={{ width: '75%'}} src="https://pbs.twimg.com/media/FBSCTq0WUAcEFWx?format=jpg&name=medium" />
        </a>

      </>
    )
}

export default KycProcessInfo
