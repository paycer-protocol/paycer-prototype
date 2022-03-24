import React from 'react'
import useWallet from '@hooks/use-wallet'
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
    const wallet = useWallet()
    const token = useToken('PCR')
    const { tokenAddress, symbol, decimals, tokenBalance } = token

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
                  symbol: symbol,
                  decimals: decimals,
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
    if (!wallet.isConnected || (!chainId && ![ChainId.Mainnet].includes(chainId) && !library && !library.provider.isMetaMask))  {
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
