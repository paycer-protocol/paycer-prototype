import { useContractCall, useContractFunction } from '@usedapp/core'
import { BigNumber } from '@ethersproject/bignumber'
import { ChainId } from '@usedapp/core'
import { Contract } from '@ethersproject/contracts'
import { formatUnits } from '@ethersproject/units'
import VestingContractProvider from '@providers/vesting'
import useWallet from '@hooks/use-wallet'
import { Interface } from '@ethersproject/abi'
import { useState } from 'react'
import moment from 'moment'

interface UseSwapProps {
    handleSwap: () => Promise<void>
    resetStatus: () => void
    swapTx: any
    swapError?: boolean
    isLoading?: boolean
    showFormApproveModal: boolean
    setShowFormApproveModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function useSwap():UseSwapProps {
    const wallet = useWallet()
    const { chainId } = wallet


    const [showFormApproveModal, setShowFormApproveModal] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [swapError, setSwapError] = useState(false)

    const { send: swap, state: swapTx } = useContractFunction(null, 'swap')

    const handleSwap = async () => {
        setLoading(true)
        try {
            await swap()
        } catch(e) {
            setSwapError(true)
        }

        setLoading(false)
    }

    const resetStatus = () => {
        swapTx.status = 'None'
    }

    return {
        swapTx,
        swapError,
        resetStatus,
        handleSwap,
        showFormApproveModal,
        setShowFormApproveModal,
        isLoading,
    }
}
