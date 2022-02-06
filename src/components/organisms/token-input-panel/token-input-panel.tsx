import React  from 'react'
import tokenInput from '@components/molecules/token-input'

interface TokenInputPanelProps {
    TokenInput: typeof tokenInput
}
export default function TokenInputPanel(props: TokenInputPanelProps) {

    const {
        TokenInput
    } = props

  return (
      <div className="card bg-dark shadow-none mb-1 input-card">
          <div className="card-body">
              <div className="row">
                  <div className="col-5 d-flex">
                  </div>
                  <div className="col-7 d-flex align-items-center">
                      <TokenInput />
                  </div>
              </div>
          </div>
      </div>
  )

}
