import React from 'react'
import { Trans } from '@lingui/macro'
import Card from '@components/molecules/card'
import * as Styles from '../styles'

// P368 | Todo: Replace demo content (stateful?)
const KycProcessInfo = () => {
    return (
      <>
        <h2 className="h2">Headline</h2>
        <Card.Text className="mb-5">
          <Trans>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Facilis non dolore est fuga nobis ipsum illum eligendi nemo iure repellat,
            soluta, optio minus ut reiciendis voluptates enim impedit veritatis officiis.
          </Trans>
        </Card.Text>
        <footer className="d-flex align-items-center justify-content-center">
          <Styles.StyledButton className="btn">
            <Trans>Action</Trans>
          </Styles.StyledButton>
        </footer>
      </>
    )
}

export default KycProcessInfo
