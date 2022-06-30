import React, { useEffect, useState } from 'react';
import { t } from '@lingui/macro';
import styled from 'styled-components';
import Modal from '@components/molecules/modal';
import CurrencyIcon from '@components/atoms/currency-icon';
import Alert from '@components/atoms/alert';
import useSupportedTokens, { ITokenDataProvider } from '@hooks/use-supported-token';
import { FormattedNumber } from '@components/atoms/number/formatted-number';
import useToken from '@hooks/use-token';
import { TokenType } from '../../../types/investment';

interface TokenSelectModalProps {
  show: boolean
  onHide: () => void
  activeTokenSymbol: string
  onClick: (token: TokenType) => void
  tokens: TokenType[]
  errorMessage?: string
}

export default function TokenSelectModal(props: TokenSelectModalProps) {
  const { show, onHide, onClick, tokens, activeTokenSymbol, errorMessage } = props;
  const [filteredTokens, setFilteredTokens] = useState<TokenType[]>(tokens);

  useEffect(() => {
    setFilteredTokens(tokens);
  }, [tokens]);

  const handleSearch = (e) => {
    let keywords = e.target.value;

    if (keywords) {
      keywords = keywords.toLowerCase().split(' ');
      keywords = keywords.filter((f) => f !== '');

      const nextTokens = tokens.filter((f) => keywords.some((k) => f.name.toLowerCase().includes(k.toLowerCase()))
        || keywords.some((k) => f.symbol.toLowerCase().includes(k.toLowerCase())));

      setFilteredTokens(nextTokens);
    } else {
      setFilteredTokens(tokens);
    }
  };

  return (
    <Modal centered show={show} onHide={onHide} className="mb-5">
      <>
        <Modal.Header closeButton onHide={onHide}>
          <Modal.Title>
            {t`Select a token`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-0">
          <Alert show={!!errorMessage} variant="danger">
            {errorMessage}
          </Alert>
          <input
            className="form-control bg-darkest border-primary mb-3 fw-light"
            type="search"
            placeholder="Search ..."
            onChange={handleSearch}
          />
          <div className="card bg-darkest shadow-none mb-2">
            <div className="card-body p-0">
              <ul className="list-group list-group-flush">
                {filteredTokens.map((token, i) => (
                  <li onClick={token.symbol !== activeTokenSymbol ? () => onClick(token) : null} key={i} className={`list-group-item list-group-item-action px-4 border-0 ${token.symbol === activeTokenSymbol ? 'disabled opacity-20' : ''}`}>
                    <ListItem
                      token={token}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Modal.Body>
      </>
    </Modal>
  );
}

export const TokenBalanceLabel = styled.div`
  font-size: 18px; font-weight: 300;
`;

interface ListItemProps {
  token: TokenType
}

const ListItem = (props: ListItemProps) => {
  const { token } = props;
  const { tokenBalance } = useToken(token.symbol);

  return (
    <a className="d-flex align-items-center justify-content-between">
      <div className="d-flex align-items-center">
        <CurrencyIcon
          symbol={token.symbol}
          className="me-3"
          width={33}
          height={33}
        />
        <div className="d-flex flex-column">
          <small className="text-muted fw-lighter">{token.name}</small>
          <h3 className="mb-0 text-white">{token.symbol}</h3>
        </div>
      </div>
      <TokenBalanceLabel>
        <FormattedNumber
          value={tokenBalance}
          minimumFractionDigits={2}
          maximumFractionDigits={4}
        />
      </TokenBalanceLabel>
    </a>
  );
};
