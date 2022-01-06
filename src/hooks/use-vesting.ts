import { useContractCall, useContractFunction, useTokenAllowance } from '@usedapp/core'
import { BigNumber } from '@ethersproject/bignumber'
import { ChainId } from "@usedapp/core";
import { formatUnits, parseUnits } from '@ethersproject/units'
import { Contract } from '@ethersproject/contracts'
import VestingContractProvider from '@providers/vesting'
import useWallet from '@hooks/use-wallet'
import { Interface } from '@ethersproject/abi'
import { useState } from 'react'

interface UseVestingProps {
    withdraw: () => Promise<void>
    vested: number
    withdrawTx: any
    showFormApproveModal: boolean
    setShowFormApproveModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function useVesting():UseVestingProps {
    const wallet = useWallet()
    const { chainId } = wallet
    const vestingConfig = VestingContractProvider[chainId] || VestingContractProvider[ChainId.Mainnet]

    console.log(vestingConfig)

    const vesting = vestingConfig.contract
    const vestingContract = new Contract(vesting.address, vesting.abi)
    const [showFormApproveModal, setShowFormApproveModal] = useState(false)

    const { send: withdraw, state: withdrawTx } = useContractFunction(vestingContract, 'withdraw')

    const vested = useContractCall(
        {
        abi: new Interface(vesting.abi),
        address: vesting.address,
        method: 'vested',
        args: [wallet.address],
        }
    )

    const withdrawVesting = async () => {
        /* TODO DEFINE BETTER ERROR HANDLING FOR FRONTEND NOTIFICATIONS */
        try {
            await withdraw()
            if (withdrawTx.status === 'Success') {
                setTimeout(() =>{
                    setShowFormApproveModal(false)
                }, 3000);
            }
        } catch(e) {
        }
    }

    return {
        vested: BigNumber.isBigNumber(vested) ? Number(formatUnits(vested, 18)) : 0,
        withdrawTx,
        withdraw: withdrawVesting,
        showFormApproveModal,
        setShowFormApproveModal
    }
}
