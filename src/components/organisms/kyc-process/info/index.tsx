import React from 'react'
import { Trans } from '@lingui/macro'
import Button from '@components/atoms/button'
import Card from '@components/molecules/card'
import * as Styles from '../Styles'

const KycProcessInfo = () => {
    return (
      <>
        <Card className="rounded-0">
          <Card.Body>
            <Card.Title>Headline</Card.Title>
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
          </Card.Body>
        </Card>
      </>
    )
}

export default KycProcessInfo
