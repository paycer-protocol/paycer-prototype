import React from 'react'
import { useWallet } from '@context/wallet-context'
import { ChainId } from '@usedapp/core'
import { useEthers } from '@usedapp/core'
import useToken from '../../../hooks/use-token'
import {toast} from "react-toastify";
import {t} from "@lingui/macro";

export interface AddPaycerTokenProps {
    children: React.ReactNode
}

const AddPaycerToken = (props: AddPaycerTokenProps) => {
    const { children } = props
    const { library, chainId } = useEthers()
    const { walletIsAuthenticated } = useWallet()
    const token = useToken('PCR')
    const { tokenAddress, tokenSymbol, tokenDecimals, tokenBalance } = token

    const addToken = async () => {

        // @ts-ignore
      if (!library && !library.provider.isMetaMask && !library.provider.request) {
          return false
      }

      try {
          const params: any = {
              type: 'ERC20',
              options: {
                  address: tokenAddress,
                  symbol: tokenSymbol,
                  decimals: tokenDecimals,
                  image: 'https://paycer-prototype.vercel.app/assets/icons/pcr.svg',
              },
          }
          // @ts-ignore
          library.provider
              .request({
                  method: 'wallet_watchAsset',
                  params,
              })
              .then((success) => {
                  if (success) {
                      // TODO check of token really was added
                      //toast(t`Successfully added PAYCER TOKEN to MetaMask`)
                  } else {
                      toast(t`Something went wrong`)
                  }
              })
              .catch(console.error)
      } catch {
          toast(t`Something went wrong`)
      }
    }
    // @ts-ignore
    if (!walletIsAuthenticated || (!chainId && ![ChainId.Mainnet].includes(chainId) && !library && !library.provider.isMetaMask))  {
      return null
    }

    return (
      <div
          onClick={async () => {
            await addToken()
          }}
      >
          {children}
      </div>
    )
}

export default AddPaycerToken
