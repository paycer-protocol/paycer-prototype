import { Trans, t } from '@lingui/macro'
import DashCard from '@components/organisms/dashboard/dash-card'
import useWallet from '@hooks/use-wallet'
import { FormattedNumber, Money } from '@components/atoms/number'
import {normalizeFilename} from "../../../helper/filename";
import React from "react";

export default function DashCards () {
  const wallet = useWallet()

  return (
    <div className="row">
      <div className="col-12 col-md-4 col-xl">
        <DashCard title={t`Total Balance`} style={{ zIndex: 1000 }}>
            <div className="mt-3 d-flex justify-content-between">
                <div>
                    <FormattedNumber
                        value={wallet.etherBalance}
                        minimumFractionDigits={2}
                        maximumFractionDigits={4}
                    />
                    &nbsp;
                    {wallet.etherSymbol}
                </div>
                <img width="40" className="ms-2" style={{marginTop: '-12px'}} src={`/assets/icons/${normalizeFilename(wallet.etherSymbol)}.svg`} alt={wallet.etherSymbol} />
            </div>
            </DashCard>
      </div>
      <div className="col-12 col-md-4 col-xl">
        <DashCard title={t`Savings`} style={{ zIndex: 1000 }}>
            <div className="mt-3 d-flex justify-content-between">
              <Money value={0} currency="USD" />
              <img width="40" className="ms-2" style={{marginTop: '-12px'}} src={`/assets/icons/${normalizeFilename(`usd`)}.svg`} alt="usd" />
            </div>
        </DashCard>
      </div>
      <div className="col-12 col-md-4 col-xl">
        <DashCard title={t`Risk`} style={{ zIndex: 1000 }}>
            <div className="mt-3 d-flex justify-content-between">
              <Trans>Low</Trans>
            </div>
        </DashCard>
      </div>
    </div>
  )
}
