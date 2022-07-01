import React from 'react'
import styled from 'styled-components'
import { t } from '@lingui/macro'
import Icon from '@components/atoms/icon'
import Dropdown from '@components/molecules/dropdown'
import { Network } from '@styled-icons/entypo'
import { useDapp } from '@context/dapp-context'
import { toast } from 'react-toastify'
import { chainedNetworkProvider, mainNetProviders } from '@providers/networks'
import { Check2 } from '@styled-icons/bootstrap'
import CurrencyIcon from '@components/atoms/currency-icon'
import RoundetIconButton from '@components/atoms/button/roundet-icon-button'
import { Wallet } from '@styled-icons/ionicons-sharp'
import { useMediaQuery } from 'react-responsive'

function isDebug() {
  return window.location.hostname === 'localhost'
        || window.location.search === '?debug=1'
}

export const NetworkItem = styled.a`
`

const NetworkMenu = () => {
  const providers = isDebug() ? chainedNetworkProvider : mainNetProviders
  const { isAuthenticated, currentNetworkId, handleSwitchNetwork } = useDapp()
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 991.98px)' })

  if (!isAuthenticated) {
    return null
  }

  const activeNetworkLabel = providers[currentNetworkId]?.chainName

  const renderMenu = () => (
    <>
      <div>
        <div className="mb-4">
          <h3 className="mb-0">{t`Network`}</h3>
          <small className="text-muted" style={{ fontSize: 10 }}>
            {t`Switch the Blockchain Network`}
          </small>
        </div>
      </div>
      {Object.keys(providers).map((chainId, index) => {
        const provider = providers[chainId]
        const isActive = isAuthenticated && Number(chainId) === currentNetworkId
        const isLast = Object.keys(providers).length === index + 1

        return (
          <NetworkItem
            key={index}
            as={isActive ? 'div' : 'a'}
            title={provider.chainName}
            className={`${!isActive ? 'cursor-pointer' : ''} ${!isLast ? 'mb-4' : ''} d-flex align-items-center`}
            onClick={async () => {
              if (!isActive) {
                await handleSwitchNetwork(provider)
              }
            }}
          >
            <div className="d-flex align-items-center">
              <CurrencyIcon
                className="me-3"
                width={21}
                height={21}
                symbol={provider.nativeCurrency.symbol}
              />
              <div className="mb-0">{provider.chainName}</div>
            </div>
            {isActive
                            && (
                            <div className="d-flex ms-3">
                              <Icon color="#00FF00" component={Check2} size={23} />
                            </div>
                            )}
          </NetworkItem>
        )
      })}
    </>
  )

  return (
    <>
      {isTabletOrMobile
        ? renderMenu()
        : (
          <Dropdown desktopWidth={300} openBy="click" opener={<RoundetIconButton toggleActive icon={Network} label={activeNetworkLabel} />}>
            {renderMenu()}
          </Dropdown>
        )}
    </>
  )
}

export default NetworkMenu
