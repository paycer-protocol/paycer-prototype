import { useState } from 'react'
import {useContractCall, useContractFunction, useTokenAllowance} from '@usedapp/core'
import { BigNumber, FixedFormat } from '@ethersproject/bignumber'
import { ChainId } from '@usedapp/core'
import { formatUnits, parseUnits } from '@ethersproject/units'
import { Contract } from '@ethersproject/contracts'
import InvestAbi from '../deployments/Invest.json'
import ERC20Abi from '../deployments/ERC20.json'
import useWallet from '@hooks/use-wallet'
import { StrategyType } from '../types/investment'
import {Interface} from "@ethersproject/abi";

interface UseVestingProps {
    deposit: (amount: Number) => Promise<void>
    withdraw: (amount: Number) => Promise<void>
    resetStatus: () => void
    withdrawAbleAmount: number
    depositTx: any
    withdrawTx: any
    approveTx: any
    showFormApproveModal: boolean
    setShowFormApproveModal: React.Dispatch<React.SetStateAction<boolean>>
    withdrawError?: boolean
    depositError?: boolean
    claimError?: boolean
    isLoading?: boolean
}

export default function useInvest(strategy: StrategyType):UseVestingProps {
    const wallet = useWallet()
    const { chainId } = wallet
    const strategyAddress = strategy.chainAddresses[chainId] || strategy.chainAddresses[ChainId.Polygon]

    const strategyContract = new Contract(strategyAddress, InvestAbi)
    const tokenContract = new Contract(strategy.input.chainAddresses[chainId], ERC20Abi)

    const [showFormApproveModal, setShowFormApproveModal] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [withdrawError, setWithdrawError] = useState(false)
    const [depositError, setDepositError] = useState(false)

    let { send: sendDeposit, state: depositTx } = useContractFunction(strategyContract, 'deposit')
    let { send: sendWithdraw, state: withdrawTx } = useContractFunction(strategyContract, 'withdraw')
    let { send: approve, state: approveTx } = useContractFunction(tokenContract, 'approve')
    
    let decimalsArray = useContractCall({abi: new Interface(ERC20Abi), address: tokenContract.address, method: 'decimals', args: []});

    let decimals = decimalsArray && decimalsArray[0] || 18

    const getContractValue = (method: string) => {
        const balanceOfArgs:any = wallet.isConnected ? {
            abi: new Interface(InvestAbi),
            address: strategyAddress,
            method: method,
            args: [wallet.address],
        } : false
        let [data] = useContractCall(balanceOfArgs) ?? []
        return BigNumber.isBigNumber(data) ? Number(formatUnits(data, decimals)) : 0
    }

    const withdrawAbleAmount = getContractValue('balanceOf')

    let allowance = useTokenAllowance(tokenContract.address, wallet.address, strategyAddress)
    const formattedAllowance = BigNumber.isBigNumber(allowance) ? Number(formatUnits(allowance, decimals)) : 0

    const deposit = async (amount: number) => {
        setLoading(true)
        try {
            if (amount > formattedAllowance) {
                await approve(strategyAddress, parseUnits(String(amount * 2), decimals))
            }

            await sendDeposit(parseUnits(String(amount.toFixed(decimals)), decimals))

            if (depositTx.status === 'Success') {
                setTimeout(() =>{
                    setShowFormApproveModal(false)
                }, 3000);
            }
        } catch(e) {
            console.log(e)
            setDepositError(true)
        }
        setLoading(false)
    }

    const withdraw = async (amount: number) => {
        setLoading(true)
        try {
            await approve(strategyAddress, parseUnits(String(amount * 2), decimals))
            await sendWithdraw(parseUnits(String(amount.toFixed(decimals)), decimals))

            if (withdrawTx.status === 'Success') {
                setTimeout(() =>{
                    setShowFormApproveModal(false)
                }, 3000);
            }
        } catch(e) {
            setWithdrawError(true)
        }
        setLoading(false)
    }

    const resetStatus = () => {
        depositTx.status = 'None'
        withdrawTx.status = 'None'
        approveTx.status = 'None'
    }

    return {
        deposit,
        withdraw,
        withdrawAbleAmount,
        resetStatus,
        // @ts-ignore
        /* TODO ADD TOTAL AMOUNT CLAIMED */
        // @ts-ignore
        depositTx,
        withdrawTx,
        approveTx,
        showFormApproveModal,
        setShowFormApproveModal,
        withdrawError,
        depositError,
        isLoading
    }
}
