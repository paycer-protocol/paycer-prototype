import React from 'react'
import BlockExplorers from '@config/block-explorers'
import {ArrowDown, Link45deg} from '@styled-icons/bootstrap'
import TruncateText from '../../../helpers/truncate-text'
import Icon from "@components/atoms/icon";
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
        <div className="d-flex align-items-center">
            <Icon
                component={Link45deg}
                size={18}
                color="white"
                className="me-3"
            />
            <a target="_blank" className="d-none d-lg-block" href={href}>{txnHash}</a>
            <a target="_blank" className="d-lg-none" href={href}>{TruncateText(txnHash, 30)}</a>
        </div>
    )
}

export default TxnLink
