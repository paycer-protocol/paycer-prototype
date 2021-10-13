import React from 'react'
import { Trans } from '@lingui/macro'
import Card from '@components/molecules/card'
import * as Styles from '../Styles'

// Todo: Replace demo content (stateful, translatable?)
const KycProcessInfo = () => {
    return (
      <>
        <h2 className="h2">Headline</h2>
        <Card.Text>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Facilis non dolore est fuga nobis ipsum illum eligendi nemo iure repellat,
          soluta, optio minus ut reiciendis voluptates enim impedit veritatis officiis.
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
