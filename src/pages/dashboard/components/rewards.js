import Button from '@components/atoms/button'

export default function Rewards() {
  return (
    <div className="card">
      <div className="card-header">
        <div className="row align-items-center">
          <div className="col">
            <h4 className="card-header-title">
              Rewards
            </h4>
          </div>
        </div>
      </div>
      <div className="card-body">
        <div className="row mb-4">
          <div className="col-12">
            <div className="d-flex align-items-center justify-content-center mb-4">
              <div className="display-4">23872 PCR</div>
            </div>
          </div>
          <div className="col-4">
            <div className="text-center">
              <h6 className="header-pretitle text-secondary">
                Staked
              </h6>
              <h3 className="mb-0">
                0 PRC
              </h3>
            </div>
          </div>
          <div className="col-4">
            <div className="text-center">
              <h6 className="header-pretitle text-secondary">
                Unstaked
              </h6>
              <h3 className="mb-0">
                0 PRC
              </h3>
            </div>
          </div>
          <div className="col-4">
            <div className="text-center">
              <h6 className="header-pretitle text-secondary">
                APY
              </h6>
              <h3 className="mb-0">
                15%
              </h3>
            </div>
          </div>
        </div>

        <div className="d-flex align-items-center justify-content-center">
          <Button variant="light" className="w-100">
            Claim Rewards
          </Button>
        </div>
      </div>
    </div>
  )
}
