import React  from 'react'

interface TokenInputPanelProps {
    tokenInput: React.ReactNode
    tokenInputSibling: React.ReactNode
}
export default function TokenInputPanel(props: TokenInputPanelProps) {

    const {
        tokenInput,
        tokenInputSibling
    } = props

    return (
      <div className="card bg-dark shadow-none mb-1 input-card">
          <div className="card-body">
              <div className="row">
                  <div className="col-5 d-flex">
                      {tokenInputSibling}
                  </div>
                  <div className="col-7 d-flex align-items-center">
                      {tokenInput}
                  </div>
              </div>
          </div>
      </div>
    )
}
