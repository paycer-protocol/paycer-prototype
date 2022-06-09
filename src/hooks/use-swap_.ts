import { useSendTransaction } from '@usedapp/core'
import Moralis from "moralis";
import {useEffect, useState} from 'react'
import { SwapProps } from '@components/organisms/swap/types'
import {FormikValues} from "formik";
import {useDapp} from "@context/dapp-context";
import {swapTokens} from '@config/market-pairs'

interface UseSwapProps {
    bla: string
}

export default function useSwap():UseSwapProps {
    const { walletAddress, currentNetworkId, currentChainId, chainName, isWeb3Enabled, isAuthenticated, currentNetwork } = useDapp()

    console.log('HI')

    const fetchAvailableTokens = async () => {
        // Get all tokens

        const result = await Moralis.Plugins.oneInch.getSupportedTokens({
            chain: currentNetwork.chainName.toLowerCase(), // The blockchain you want to use (eth/bsc/polygon)
        });

        let tokens = result.tokens

        tokens = Object.keys(tokens).map((k) => tokens[k])

        const nextTokens = tokens.filter(f =>
            swapTokens.some(k => f.symbol === k.symbol)
        )

        console.log(nextTokens, 'yo')



        const quote = await getQuote(nextTokens[0].address, nextTokens[1].address)



        return result.tokens
    }

    const getQuote = async(fromTokenAddress: string, toTokenAddress: string) => {

        const options = {
            chain: currentNetwork.chainName.toLowerCase(), // The blockchain you want to use (eth/bsc/polygon)
            fromTokenAddress: fromTokenAddress, // The token you want to swap
            toTokenAddress: '0xa6083abe845fbB8649d98B8586cBF50b7f233612', // The token you want to receive
            amount: '100',
        }

        console.log(options)

        try {
            const quote = await Moralis.Plugins.oneInch.quote(options);
            console.log(quote, 'bla');
        } catch (e) {
            console.log(e)
        }


    }

    const fetchAllowance = async(fromTokenAddress: string, toTokenAddress: string) => {


        const options = {
            chain: currentNetwork.chainName.toLowerCase(), // The blockchain you want to use (eth/bsc/polygon)
            fromTokenAddress: swapTokens[0].chainAddresses[currentNetworkId], // The token you want to swap
            toTokenAddress: walletAddress, // The token you want to receive
            amount: '1',
        }

        try {
            const allowance = await Moralis.Plugins.oneInch.hasAllowance(options)
            console.log(allowance);
        } catch (e) {
            console.log(e, 'ferror')
        }



    }

    useEffect(() => {
        const fetchTokens = async () => {
            await fetchAvailableTokens()
        }
        fetchTokens()
    }, [])


    return {
        bla: 'yoyoyo'
    }
}
