import React from 'react'
import BlockExplorers from '@config/block-explorers'
import TruncateText from '../../../helpers/truncate-text'
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
        <>
            <a target="_blank" className="d-none d-lg-block" href={href}>{txnHash}</a>
            <a target="_blank" className="d-lg-none" href={href}>{TruncateText(txnHash, 30)}</a>
        </>
    )
}

export default TxnLink
