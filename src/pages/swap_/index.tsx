import React, {useState} from 'react'
import useSwap from '@hooks/use-swap_'
export default function Swap_() {
    const [supplyTabActive, setSupplyTabActive] = useState(false)

    const { bla } = useSwap()

    return (
        <div>
            {bla}
        </div>
    )
}
