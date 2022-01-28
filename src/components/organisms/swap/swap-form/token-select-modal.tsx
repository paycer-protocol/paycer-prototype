import React from 'react'
import { Trans } from '@lingui/macro'
import Modal from '@components/molecules/modal'
import CurrencyIcon from '@components/atoms/currency-icon'
import { TokenType } from '../../../../types/investment'
import { useFormikContext } from "formik";
import { SwapProps } from "@components/organisms/swap/swap-form/types";

interface TokenSelectModalProps {
  show: boolean
  onHide: () => void
  onClick: (token: TokenType) => void
  tokens: TokenType[]
}

export default function TokenSelectModal(props: TokenSelectModalProps) {
  const { show, onHide, onClick, tokens } = props
  const { values } = useFormikContext<SwapProps>()
  return (
    <Modal centered show={show} onHide={onHide} className="mb-5">
      <>
        <Modal.Header closeButton onHide={onHide}>
          <Modal.Title>
            <Trans>Select a token</Trans>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-0">
          <div className="card bg-darkest shadow-none mb-2">
            <div className="card-body p-0">
              <ul className="list-group list-group-flush">
                {tokens.map((token, i) => (
                  <li key={i} className="list-group-item list-group-item-action px-4 border-0">
                    <a
                      className="d-flex align-items-center"
                      onClick={() => onClick(token)}
                    >
                      <CurrencyIcon
                        symbol={token.symbol}
                        className="me-3"
                        width={32}
                        height={32}
                      />
                      <div className="d-flex flex-column">
                        <small className="text-muted fw-lighter">{token.name}</small>
                        <h3 className="mb-0 text-white">{token.symbol}</h3>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Modal.Body>
      </>
    </Modal>
  )
}
