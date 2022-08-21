import { t } from '@lingui/macro'
import React from 'react'

const HowItWorks = () => (
  <div>

    <div className="row">
      <div className="col-md-4">

        <div className="card">

          <div className="card-body">

            <div className="row mb-4">
              <div className="col-md-6">
                <div className="mb-2 d-flex align-items-center">
                  <div className="fw-normal display-3">
                      6
                    </div>
                  <div className="ps-3">
                      x
                    </div>
                </div>
                {t`different Qualities`}
                <br />
              </div>
              <div className="col-md-6">
                <div className="mb-2 d-flex align-items-center">
                  <div className="fw-normal display-3">
                      5
                    </div>
                  <div className="ps-3">
                      x
                    </div>
                </div>
                {t`different NFT Tiers`}
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="mb-2 d-flex align-items-center">
                  <div className="fw-normal display-3">
                      20K
                    </div>
                </div>
                {t`possible combinations`}
              </div>
              <div className="col-md-6">
                <div className="mb-2 d-flex align-items-center">
                  <div className="fw-normal display-3">
                      40
                    </div>
                  <div className="ps-3">
                      %
                    </div>
                </div>
                {t`possible rewards`}
              </div>
            </div>

          </div>

        </div>

      </div>
      <div className="col-md-8">
        <div className="ps-md-5">
          <div className="mb-5">
            <h5 className="text-uppercase mb-3 text-pink">{t`Possible Features`}</h5>
            <div className="header-title h1">{t`How it works`}</div>
          </div>
          <p className="text-muted">
            {t`Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.`}
          </p>
        </div>

      </div>
    </div>

  </div>

)

export default HowItWorks
