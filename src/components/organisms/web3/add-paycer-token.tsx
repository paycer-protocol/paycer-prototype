import React from 'react'
import Button from '@components/atoms/button'
import { useEthers } from '@usedapp/core'
import useToken from '../../../hooks/use-token'
import {toast} from "react-toastify";
import {t} from "@lingui/macro";

const AddPaycerToken = () => {
    const { library } = useEthers()
    const token = useToken('PCR')
    const { tokenAddress, symbol, decimals } = token

    const addToken = async () => {

      if (!library && !library.provider.isMetaMask && !library.provider.request && !tokenAddress) {
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

    return (
      <Button
          variant="light"
          className="d-flex align-items-center justify-content-center pe-3 bg-dark"
          onClick={async () => {
            await addToken()
          }}
      >
          <img width="34" src={`assets/icons/pcr.svg`} alt="Add PCR token" />
      </Button>
    )
}

export default AddPaycerToken
