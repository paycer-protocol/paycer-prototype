import {t} from '@lingui/macro'
import React from 'react'
import GradientButton from '@components/atoms/button/gradient-button'
import {useDapp} from "@context/dapp-context"
import ConnectWalletButton from '@components/organisms/nft/landing-page/connect-wallet-button'

const Stage = () => {
  const {isAuthenticated} = useDapp()

  return (
    <div>
      <div className="position-relative py-7">
        <img
          src="/img/nft/bg-stage.jpg"
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: -5,
            opacity: '50%',
          }}
        />
        <div className="container py-6">
          <div className="row position-relative">
            <div className="col-md-6">

              <div className="mb-4">
                <h5 className="header-pretitle">{t`Collect`}</h5>
                <h1 className="header-title">{t`Paycer Utility NFT`}</h1>
              </div>

              <h2 style={{fontSize: '50px', lineHeight: '64px'}}
                  className="display-2 mb-5">{t`Upgrade your Paycer NFT`}</h2>

              <div className="d-flex mb-5">
                <div className="w-50">
                  {isAuthenticated ?
                    <GradientButton className="w-100">
                      {t`Upgrade NFT`}
                    </GradientButton>
                    : <ConnectWalletButton/>
                  }
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>
      <div className="content-gradient-border"/>
    </div>
  )
}

export default Stage
