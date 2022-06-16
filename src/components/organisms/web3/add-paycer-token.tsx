import React from 'react'
import { useDapp } from '@context/dapp-context'
import ChainId from '@providers/chain-id'
import useToken from '../../../hooks/use-token'

export interface AddPaycerTokenProps {
    children: React.ReactNode
}

const AddPaycerToken = (props: AddPaycerTokenProps) => {
    const { children } = props
    const { isAuthenticated, currentNetworkId, currentNetworkProvider} = useDapp()
    const token = useToken('PCR')
    const { tokenAddress, tokenSymbol, tokenDecimals, tokenBalance } = token

    const addPCRToken = async () => {
        try {
            //@ts-ignore
            await window.ethereum.request({
                method: 'wallet_watchAsset',
                params: {
                    type: 'ERC20', // Initially only supports ERC20, but eventually more!
                    options: {
                        address: tokenAddress,
                        symbol: tokenSymbol,
                        decimals: tokenDecimals,
                        image: 'https://paycer-prototype.vercel.app/assets/icons/pcr.svg',
                    },
                },
            });

        } catch (error) {
            console.log(error);
        }
    }

    // @ts-ignore
    if (!isAuthenticated || (!currentNetworkId && ![ChainId.Polygon].includes(currentNetworkId) && !currentNetworkProvider && !currentNetworkProvider?.isMetaMask))  {
      return null
    }

    return (
      <div
          onClick={async () => {
            await addPCRToken()
          }}
      >
          {children}
      </div>
    )
}

export default AddPaycerToken
