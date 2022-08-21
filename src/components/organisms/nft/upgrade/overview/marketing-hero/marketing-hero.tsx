import Button from '@components/atoms/button'
import Link from 'next/link'
import GradientButton from '@components/atoms/button/gradient-button'
import { t } from '@lingui/macro'
import React from 'react'
import { useDapp } from '@context/dapp-context'

const MarketingHero = () => {
  const { isAuthenticated } = useDapp()
  return (
    <div className="row">
      <div className="col-md-6">
        <h1 className="display-3">Earn and collect bonuses through extraordinary Paycer NFTs</h1>
      </div>
      <div className="col-md-6">
        <p className="mb-5 text-muted">
          Claim your special NFT utlity token simply by owning and staking Paycer PCR Tokens. There more you stake the more rare your Paycer NFT Tier and the higher your change for exclusiv utilites connected with your nft like higher staking rewards, lower trading fees, free beer and many more. If you don’t already own or stalk PCR Tokens start now buy buying your first PCR tokens.
        </p>

        <Button.Group>
          {
                        !isAuthenticated
                            && (
                            <span className="me-3">
                              add connect wallet btn
                            </span>
                            )
                    }
          <Link href="/swap">
            <GradientButton>
              {t`Buy PCR`}
            </GradientButton>
          </Link>
        </Button.Group>
      </div>
    </div>
  )
}

export default MarketingHero
