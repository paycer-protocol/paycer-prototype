import React, { useRef }  from 'react'

interface TokenInputPanelProps {
    tokenInput: React.ReactNode
    tokenInputSibling: React.ReactNode
}

export default function TokenInputPanel(props: TokenInputPanelProps) {
    const panelInputRef = useRef(null);
    const { tokenInput, tokenInputSibling } = props

    const focusInput = () => {
        const input = panelInputRef.current.querySelector('input');
        input.focus()
    }

    return (
      <div className="card bg-dark shadow-none mb-1 input-card">
          <div className="card-body">
              <div className="row" onClick={focusInput}>
                  <div className="col-5 d-flex">
                      {tokenInputSibling}
                  </div>
                  <div ref={panelInputRef} className="col-7 d-flex align-items-center">
                      {tokenInput}
                  </div>
              </div>
          </div>
      </div>
    )
}
