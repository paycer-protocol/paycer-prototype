import React from 'react'
import { t, Trans } from '@lingui/macro'

export default function Referrals () {

  return (
    <div className="table-responsive">
      <table className="table table-sm table-nowrap card-table">
        <thead>
        <tr>
          <th>
            <span className="text-muted">
              <Trans>Friend`s User ID</Trans>
            </span>
          </th>
          <th>
            <span className="text-muted">
              <Trans>Referral Bonus</Trans>
            </span>
          </th>
          <th>
            <span className="text-muted">
              <Trans>Transaction Typ</Trans>
            </span>
          </th>
          <th>
            <span className="text-muted">
              <Trans>Date</Trans>
            </span>
          </th>
        </tr>
        </thead>
        <tbody className="list">
        <tr>
          <td colSpan={4}>
            <div className="text-center">
              <h4 className="text-muted mb-4">
                <Trans>You have no referrals</Trans>
              </h4>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  )
}
