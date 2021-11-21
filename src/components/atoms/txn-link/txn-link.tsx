import React from 'react'
import {explorers} from '../../../providers/explorers'
import {Link45deg} from '@styled-icons/bootstrap'
import TruncateText from '../../../helpers/truncate-text'
import Icon from "@components/atoms/icon";
import {ChainId} from "@usedapp/core";

interface TxnLinkProps {
    chain: string
    txnHash: string
}

const TxnLink = (props: TxnLinkProps) => {
    const { chain, txnHash } = props

    let href = ''

    if (chain === 'eth') {
        href = explorers[ChainId.Mainnet] + '/tx/' + txnHash
    }

    if (chain === 'bsc') {
        href = explorers[ChainId.BSC] + '/tx/' + txnHash
    }

    if (!href) {
        return (
            <span>
                {txnHash}
            </span>
        )
    }
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
