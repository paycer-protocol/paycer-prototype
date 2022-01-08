import { useContractCall, useContractFunction } from '@usedapp/core'
import { BigNumber } from '@ethersproject/bignumber'
import { ChainId } from '@usedapp/core'
import { Contract } from '@ethersproject/contracts'
import VestingContractProvider from '@providers/vesting'
import useWallet from '@hooks/use-wallet'
import { Interface } from '@ethersproject/abi'
import { useState } from 'react'

interface UseVestingProps {
    withdraw: () => Promise<void>
    withdrawAble: number
    withdrawTx: any
    withdrawError?: boolean
    showFormApproveModal: boolean
    setShowFormApproveModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function useVesting(type):UseVestingProps {
    const wallet = useWallet()
    const { chainId } = wallet
    const vestingConfig = VestingContractProvider[chainId] ? VestingContractProvider[chainId][type] : VestingContractProvider[ChainId.Mainnet][type]
    const vesting = vestingConfig.contract
    const vestingContract = new Contract(vesting.address, vesting.abi)
    const [showFormApproveModal, setShowFormApproveModal] = useState(false)
    const [withdrawError, setWithdrawError] = useState(false)
    const { send: withdraw, state: withdrawTx } = useContractFunction(vestingContract, 'withdraw')

    console.log(vestingConfig)

    const getWithdrawable = (): number => {
        const result = useContractCall(
            {
                abi: new Interface(vesting.abi),
                address: vesting.address,
                method: 'withdrawable',
                args: [wallet.address],
            }
        ) ?? 0
        return BigNumber.isBigNumber(result) ? result.toNumber() : 0
    }

    const withdrawVesting = async () => {
        /* TODO DEFINE BETTER ERROR HANDLING FOR FRONTEND NOTIFICATIONS */
        try {
            await withdraw()
            if (withdrawTx.status === 'Success') {
                setTimeout(() =>{
                    setShowFormApproveModal(false)
                }, 3000)
            }
        } catch(e) {
            setWithdrawError(true)
        }
    }

    return {
        withdrawAble: getWithdrawable(),
        withdrawTx,
        withdrawError,
        withdraw: withdrawVesting,
        showFormApproveModal,
        setShowFormApproveModal
    }
}
