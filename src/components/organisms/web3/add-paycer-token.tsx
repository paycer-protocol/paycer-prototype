import React from 'react'
import useWallet from '@hooks/use-wallet'
import Button from '@components/atoms/button'
import { ChainId } from '@usedapp/core'
import styled from 'styled-components'
import { useEthers } from '@usedapp/core'
import useToken from '../../../hooks/use-token'
import {toast} from "react-toastify";
import {t} from "@lingui/macro";
import CurrencyIcon from "@components/atoms/currency-icon";
import {FormattedNumber} from "../../atoms/number/formatted-number";

const StyledButton = styled(Button)`
    @media screen and (min-width: 769px) {
         background-color: #11192e!important;
        margin-right: -100px;
        padding-right: 98px;
    }
`

const AddPaycerToken = () => {
    const { library, chainId } = useEthers()
    const wallet = useWallet()
    const token = useToken('PCR')
    const { tokenAddress, symbol, decimals, tokenBalance } = token
    const balance = tokenBalance()

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
      <StyledButton
          className="d-flex align-items-center justify-content-center bg-dark"
          onClick={async () => {
            await addToken()
          }}
      >
         <CurrencyIcon
             width={25}
             height={25}
             symbol={symbol}
         />
        <div className="pt-1 pb-1 mx-2">
            <FormattedNumber
                value={balance}
                minimumFractionDigits={2}
                maximumFractionDigits={4}
            />
        </div>
      </StyledButton>
    )
}

export default AddPaycerToken
