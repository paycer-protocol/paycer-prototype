import React, { useState } from 'react'
import classnames from 'classnames'
import styled from 'styled-components'
import Button from '@components/atoms/button'
import { useDapp } from '@context/dapp-context'
import CurrencyIcon from '@components/atoms/currency-icon'
import { FormattedNumber } from '@components/atoms/number'
import NetworkProvider  from './network-provider'
import { mainNetProviders, chainedNetworkProvider } from '@providers/networks'

function isDebug() {
  return window.location.hostname === 'localhost'
    || window.location.search === '?debug=1'
}

const StyledButton = styled(Button)`
    @media screen and (min-width: 769px) {
         background-color: #192434!important;
        margin-right: -100px;
        padding-right: 98px;
    }
`

const Network = (props) => {
  const [showNetworkModal, setShowNetworkModal] = useState(false)
  const { isAuthenticated, chainName, nativeSymbol, nativeBalanceFormatted } = useDapp()

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="d-flex flex-column-reverse flex-md-row">
      <StyledButton
        className={classnames('d-flex align-items-center justify-content-center bg-dark text-light w-100', props.className)}
        onClick={() => setShowNetworkModal(true)}
      >
          <div className="me-3">
              <div className="d-flex">
                  <CurrencyIcon
                      style={{ marginTop: '1px' }}
                      className="me-3"
                      symbol={nativeSymbol}
                      width={20}
                  />
                  {nativeBalanceFormatted}
              </div>
          </div>

      </StyledButton>

      <Button onClick={() => setShowNetworkModal(true)} className="mb-3 mb-md-0 w-100 d-flex align-items-center justify-content-center bg-dark text-light bg-primary">
          <span className="mx-2">{chainName}</span>
      </Button>

      <NetworkProvider
        providers={isDebug() ? chainedNetworkProvider : mainNetProviders}
        show={showNetworkModal}
        onHide={() => setShowNetworkModal(false)}
      />
    </div>
  )
}

export default Network
