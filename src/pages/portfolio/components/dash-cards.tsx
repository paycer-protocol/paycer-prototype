import { Trans, t } from '@lingui/macro'
import DashCard from '@components/organisms/dashboard/dash-card'
import useWallet from '@hooks/use-wallet'
import { FormattedNumber, Money } from '@components/atoms/number'

export default function DashCards () {
  const wallet = useWallet()

  return (
    <div className="row">
      <div className="col-12 col-md-4 col-xl">
        <DashCard title={t`Total Balance`}>
          <FormattedNumber
            value={wallet.etherBalance}
            minimumFractionDigits={2}
            maximumFractionDigits={4}
          />
          &nbsp;{wallet.etherSymbol}
        </DashCard>
      </div>
      <div className="col-12 col-md-4 col-xl">
        <DashCard title={t`Savings`}>
          <Money value={0} currency="USD" />
        </DashCard>
      </div>
      <div className="col-12 col-md-4 col-xl">
        <DashCard title={t`Risk`}>
          <Trans>Low</Trans>
        </DashCard>
      </div>
    </div>
  )
}
