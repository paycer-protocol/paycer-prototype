import React from 'react'
import useWallet from '@hooks/use-wallet'
import Button from '@components/atoms/button'
import { ChainId } from '@usedapp/core'
import { useEthers } from '@usedapp/core'
import useToken from '../../../hooks/use-token'
import {toast} from "react-toastify";
import {t} from "@lingui/macro";

const AddPaycerToken = () => {
    const { library, chainId } = useEthers()
    const wallet = useWallet()
    const token = useToken('PCR')
    const { tokenAddress, symbol, decimals } = token

    const addToken = async () => {

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

    if (!wallet.isConnected || (!chainId && ![ChainId.Mainnet].includes(chainId) && !library && !library.provider.isMetaMask))  {
      return null
    }

    return (
      <Button
          variant="light"
          className="d-flex align-items-center justify-content-center bg-dark border-0 btn-rounded-circle"
          onClick={async () => {
            await addToken()
          }}
      >
          <span>
            <img width="28" src={`assets/icons/pcr.svg`} alt="Add PCR token" />
          </span>
      </Button>
    )
}

export default AddPaycerToken
