import {t} from '@lingui/macro'
import React from 'react'
import {useDapp} from "@context/dapp-context"

const HowItWorks = () => {
  const {isAuthenticated} = useDapp()

  return (
    <div>

      <div className="mb-5">
        <h5 className="header-pretitle">{t`Possible Features`}</h5>
        <div className="header-title h1">{t`How it works`}</div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <p className="text-muted">
            {t`Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.`}
          </p>
        </div>
        <div className="col-md-6">
          <p className="text-muted">
            {t`Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.`}
          </p>
        </div>
      </div>

    </div>

  )
}

export default HowItWorks
