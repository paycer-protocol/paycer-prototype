import React from 'react'
import BlockExplorers from '@config/block-explorers'

interface TxnLinkProps {
    chain: string
    txnHash: string
}

const TxnLink = (props: TxnLinkProps) => {
    const { chain, txnHash } = props
    const blockExplorer = BlockExplorers.find(b => b.chain === chain)
    if (!blockExplorer) {
        return (
            <span>
                {txnHash}
            </span>
        )
    }
    const href = `${blockExplorer.url}${blockExplorer.txnSearchParam}${txnHash}`
    return (
        <a target="_blank" href={href}>{txnHash}</a>
    )
}

export default TxnLink
