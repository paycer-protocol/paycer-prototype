import React, { useEffect, useState } from 'react'
import { t, Trans } from '@lingui/macro'
import { useDapp } from '@context/dapp-context'
import { FormattedNumber } from '@components/atoms/number'
import TxnLink from '@components/atoms/txn-link'
import api from '../../../api'

interface RewardType {
  chain: string
  historicalUSDPrice: number
  refereeAddress: string
  referrerAddress: string
  rewardPRC: number
  rewardUSD: number
  tokenSymbol: string
  transactionDateTime: string
  transactionHash: string
  type: string
  unixTimestamp: number
  value: number
}

export default function Referrals () {
  const { walletAddress, isAuthenticated} = useDapp()
  const [rewards, setRewards] = useState<RewardType[] | []>([])
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    async function fetchReferralRewards(walletAddress) {
      try {
        const response = await api.fetchReferralRewards(walletAddress)
        setRewards(response.data.transactions)
      } catch (e) {
        setErrorMessage(t`An error has occurred. Please refresh the page`)
      }
    }

    setErrorMessage('')

    if (isAuthenticated && walletAddress) {
      fetchReferralRewards(walletAddress)
    }
  }, [isAuthenticated])

  return (
    <div className="table-responsive">
      <table className="table table-sm table-nowrap card-table">
        <thead>
        <tr>
          <th>
            <span className="text-muted">
              {t`Date`}
            </span>
          </th>
          <th>
            <span className="text-muted">
              {t`Referral Bonus`}
            </span>
          </th>
          <th>
            <span className="text-muted">
              {t`Transaction`}
            </span>
          </th>
        </tr>
        </thead>
        <tbody className="list">
        {rewards.length ? rewards.map((reward) => (
          <tr key={reward.transactionHash}>
            <td>{reward.transactionDateTime}</td>
            <td>
                <FormattedNumber
                  value={reward.rewardPRC}
                  minimumFractionDigits={2}
                  maximumFractionDigits={4}
                  className="me-2"
                />
                <span className="ms-2">PCR</span>
              </td>
            <td>
              <TxnLink
                chain={reward.chain}
                txnHash={reward.transactionHash}
              />
            </td>
          </tr>
        )) : null}
        {rewards.length === 0 ? (
          <tr>
            <td colSpan={3}>
              <div className="text-center">
                <h4 className="text-muted mb-4">
                  {errorMessage ? errorMessage : t`You have no rewards`}
                </h4>
              </div>
            </td>
          </tr>
        ) : null}
        </tbody>
      </table>
    </div>
  )
}
