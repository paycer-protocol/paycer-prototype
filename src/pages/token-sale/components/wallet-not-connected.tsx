import { Trans } from '@lingui/macro'

// P368 | Todo: Ok or change?
const WalletNotConnected = () => (
  <div className="card">
    <div className="card-body">
      <div className="card-title text-danger">
        <Trans>Please connect your wallet to see this area.</Trans>
      </div>
    </div>
  </div>
)

export default WalletNotConnected