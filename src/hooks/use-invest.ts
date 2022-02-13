import { useState } from 'react'
import { useContractCall, useContractFunction } from '@usedapp/core'
import { BigNumber } from '@ethersproject/bignumber'
import { ChainId } from '@usedapp/core'
import { formatUnits, parseUnits } from '@ethersproject/units'
import { Contract } from '@ethersproject/contracts'
import InvestAbi from '../deployments/Invest.json'
import ERC20Abi from '../deployments/ERC20.json'
import useWallet from '@hooks/use-wallet'
import { Interface } from '@ethersproject/abi'
import { StrategyType } from '../types/investment'

interface UseVestingProps {
    deposit: (amount: Number) => Promise<void>
    withdraw: (amount: Number) => Promise<void>
    resetStatus: () => void
    balanceOf: number
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
    const strategyAddress =  strategy.chainAddresses[chainId] ||  strategy.chainAddresses[ChainId.Polygon]
    const strategyContract = new Contract(strategyAddress, InvestAbi)
    const tokenContract = new Contract(strategy.input.chainAddresses[chainId], ERC20Abi)

    const [showFormApproveModal, setShowFormApproveModal] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [withdrawError, setWithdrawError] = useState(false)
    const [depositError, setDepositError] = useState(false)
    const [claimError, setClaimError] = useState(false)

    let { send: sendDeposit, state: depositTx } = useContractFunction(strategyContract, 'deposit')
    let { send: sendWithdraw, state: withdrawTx } = useContractFunction(strategyContract, 'withdraw')
    let { send: approve, state: approveTx } = useContractFunction(tokenContract, 'approve')

    //let allowance = useTokenAllowance(paycerToken.address, wallet.address, stakingAddress)
    //const formattedAllowance = BigNumber.isBigNumber(allowance) ? Number(formatUnits(allowance, 18)) : 0

    const balanceOfArgs:any = wallet.isConnected ? {
        abi: new Interface(InvestAbi),
        address: strategyAddress,
        method: 'balanceOf',
        args: [wallet.address],
    } : false

    let balanceOf = useContractCall(balanceOfArgs) ?? 0

    balanceOf = BigNumber.isBigNumber(balanceOf) ? Number(formatUnits(balanceOf, 18)) : 0

    console.log(balanceOf)

    const deposit = async (amount: number) => {
        setLoading(true)
        try {
            await approve(strategyAddress, parseUnits(String(amount * 2), 18))

            await sendDeposit(parseUnits(String(amount), 18), wallet.address)

            if (depositTx.status === 'Success') {
                setTimeout(() =>{
                    setShowFormApproveModal(false)
                }, 3000);
            }
        } catch(e) {
            setDepositError(true)
        }
        setLoading(false)
    }

    const withdraw = async (amount: number) => {
        setLoading(true)
        try {
            if (amount > formattedAllowance) {
                await approve(stakingAddress, parseUnits(String(amount * 2), 18))
            }

            await sendWithdraw(parseUnits(String(amount), 18), wallet.address)

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
        resetStatus,
        // @ts-ignore
        balanceOf: BigNumber.isBigNumber(balanceOf) ? Number(formatUnits(balanceOf, 18)) : 0,
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
        claimError,
        isLoading
    }
}
