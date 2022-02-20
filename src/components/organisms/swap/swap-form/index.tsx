import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { tokenProvider } from '@providers/tokens'
import { swapTokens } from '@config/market-pairs'
import useToken from '@hooks/use-token'
import useNetwork from '@hooks/use-network'
import useWallet from '@hooks/use-wallet'
import Form from '@components/atoms/form/form'
import TokenInputPanel from '@components/organisms/token-input-panel'
import Token0Select from './fields/token0-select'
import Token0Input from './fields/token0-input'
import Token1Select from './fields/token1-select'
import SubmitButton from './fields/submit-button'
import Token1Input from './fields/token1-input'
import FlipSwap from './fields/flip-swap'
import SummaryDropdown from './summary-dropdown'
import SettingsDropdown from './settings-dropdown'
import PriceChart from './price-chart'
import { SwapProps } from './types'
import { Trade, TradeContext, UniswapProvider } from '../../../../lib/trade'


export default function SwapForm() {
    const network = useNetwork()
    const wallet = useWallet()
    const token0 = useToken(tokenProvider.USDT.symbol)
    const token1 = useToken(tokenProvider.USDC.symbol)
    const [tradeContext, setTradeContext] = useState<TradeContext|undefined>(undefined)

    const provider = new UniswapProvider()
    const tradeFactory = new Trade(provider)

    let initialValues: SwapProps = {
        token0,
        token0Value: null,
        token0Markets: swapTokens,

        token1,
        token1Value: null,
        token1Markets: swapTokens,

        tradePair: {
            fromTokenAddress: token0.tokenAddress,
            toTokenAddress: token1.tokenAddress,
            amount: "1",
        },
        tradeSettings: {
            slippage: 3,
            deadlineMinutes: 20,
            disableMultihops: false,
        },
        networkSettings: {
            providerUrl: network.rpcUrls[0],
            walletAddress: wallet.address,
            networkProvider: network.provider,
            chainId: network.chainId,
            nameNetwork: network.chainName,
            multicallContractAddress: network.multicallAddress,
            nativeCurrency: network.nativeCurrency,
            nativeWrappedTokenInfo: network.nativeWrappedTokenInfo
        },
        tradeContext,
        initFactory: async (values: SwapProps) => {
            const tradeContext = await tradeFactory.init(
              values.tradePair,
              values.tradeSettings,
              values.networkSettings
            )

            setTradeContext(tradeContext)

            return tradeContext
        }
    }

    const validationSchema = Yup.object().shape({
        token0Value: Yup.number().min(0).required(),
        token1Value: Yup.number().min(0).required(),
    })

    const handleSubmit = async (values: SwapProps) => {
        console.log(values)
    }

    useEffect(() => {
        if (wallet.isConnected && wallet.address && !tradeContext) {
            initialValues.initFactory(initialValues)
        }
    }, [wallet.isConnected, wallet.address])

    if (!tradeContext) {
        return null;
    }

    return (
        <Form
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {() => (
              <div className="d-lg-flex animated-wrapper">
                  <div className="col-md-5">
                      <div className="p-4 p-md-5 pe-md-0">
                          <div className="d-flex flex-column flex-md-row mb-3">
                              <div className="d-flex flex-column">
                                  <TokenInputPanel
                                    tokenInputSibling={<Token0Select/>}
                                    tokenInput={<Token0Input/>}
                                  />
                                  <div className="d-flex justify-content-center position-relative" style={{zIndex: 1, top: '15px', marginTop: '-34px'}}>
                                      <FlipSwap/>
                                  </div>
                                  <TokenInputPanel
                                    tokenInputSibling={<Token1Select/>}
                                    tokenInput={<Token1Input/>}
                                  />
                              </div>
                          </div>
                          <div className="d-flex">
                              <div className="col-10">
                                  <SummaryDropdown />
                              </div>
                              <div className="col-2 ps-0">
                                  <SettingsDropdown/>
                              </div>
                          </div>

                          <div
                            className="d-flex align-items-center justify-content-center w-100 mt-4 mt-md-5">
                              <SubmitButton/>
                          </div>
                      </div>
                  </div>

                  {/*<div className="col-md-7">*/}
                  {/*    <div className="p-4 p-md-5">*/}
                  {/*        <PriceChart*/}
                  {/*            token0={values.token0}*/}
                  {/*            token1={values.token1}*/}
                  {/*            token1Price={values.token1Price}*/}
                  {/*        />*/}
                  {/*    </div>*/}
                  {/*</div>*/}
              </div>
            )}
        </Form>
    )
}
