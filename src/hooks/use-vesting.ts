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
    showFormApproveModal: boolean
    setShowFormApproveModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function useVesting():UseVestingProps {
    const wallet = useWallet()
    const { chainId } = wallet
    const vestingConfig = VestingContractProvider[chainId] || VestingContractProvider[ChainId.Mainnet]
    const vesting = vestingConfig.contract
    const vestingContract = new Contract(vesting.address, vesting.abi)
    const [showFormApproveModal, setShowFormApproveModal] = useState(false)
    const { send: withdraw, state: withdrawTx } = useContractFunction(vestingContract, 'withdraw')

    const getWithdrawable = (): number => {
        const result = useContractCall(
            {
                abi: new Interface(vesting.abi),
                address: vesting.address,
                method: 'withdrawable',
                args: ['0x596Ee9e6612571914b80510D577CF34a3B2e0269'],
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
        }
    }

    return {
        withdrawAble: getWithdrawable(),
        withdrawTx,
        withdraw: withdrawVesting,
        showFormApproveModal,
        setShowFormApproveModal
    }
}
