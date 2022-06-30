import React from 'react';
import { t, Trans } from '@lingui/macro';
import Card from '@components/molecules/card';
import { FormattedNumber } from '@components/atoms/number';
import useToken from '@hooks/use-token';
import CurrencyIcon from '@components/atoms/currency-icon';
import GradientButton from '@components/atoms/button/gradient-button';
import { useInvestList } from '@context/invest-list-context';
import useInvestIsWithdrawable from '@hooks/use-invest-is-withdrawable';
import { riskLabels } from '../../../../locales';
import { StrategyType } from '../../../../types/investment';

const InvestCard = (strategy: StrategyType) => {
  const totalInterestRate = strategy.interest.interestRate + strategy.rewards.rewardRate;
  const investedToken = useToken(strategy.input.symbol);
  const investedBalance = investedToken.tokenBalance;

  const {
    setStrategy,
    setInvestType,
  } = useInvestList();

  const { isWithdrawAble } = useInvestIsWithdrawable(strategy);

  return (
    <Card className="box-shadow overflow-hidden">
      <Card.Body>
        <div className="mb-3">
          <h6 className="text-uppercase text-center my-4 font-size-lg">
            { strategy.name }
          </h6>
          <div className="row g-0 align-items-center justify-content-center">
            <div className="col-auto">
              <div className="h2 mb-0">%</div>
            </div>
            <div className="col-auto">
              <div className="display-2 mb-0">
                {totalInterestRate}
              </div>
            </div>
          </div>
          <div className="h6 text-uppercase text-center">
            /
            {' '}
            {t`APR`}
          </div>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item d-flex align-items-center justify-content-between px-0">
            <span className="">Assets</span>
            <div className="d-flex justify-content-center">
              <CurrencyIcon
                symbol={strategy.input.symbol}
                className="ms-2 position-relative"
                style={{ top: '-1px' }}
                width={30}
                height={30}
              />
            </div>
          </li>
          <li className="list-group-item d-flex align-items-center justify-content-between px-0">
            <span>{t`Total Volume`}</span>
            <span>-</span>
          </li>
          <li className="list-group-item d-flex align-items-center justify-content-between px-0">
            <span>{t`Holdings`}</span>
            {
                            investedBalance > 0
                              ? (
                                <>
                                  <FormattedNumber
                                    value={investedBalance}
                                    minimumFractionDigits={2}
                                    maximumFractionDigits={4}
                                  />
                                        &nbsp;
                                  {strategy.input.symbol}
                                </>
                              )
                              : (
                                <span>-</span>
                              )
                        }
          </li>
          <li className="list-group-item d-flex align-items-center justify-content-between px-0">
            <span>{t`Risk`}</span>
            {/* @ts-ignore */}
            <Trans id={riskLabels[strategy.riskLevel].id} />
          </li>
        </ul>
        <div className="row mt-4">
          <div className="col-6">
            <GradientButton
              className="me-4 w-100"
              onClick={() => {
                setInvestType('deposit');
                setStrategy(strategy);
              }}
            >
              <span>{t`Invest`}</span>
            </GradientButton>

          </div>
          <div className="col-6">

            <GradientButton
              disabled={!isWithdrawAble}
              onClick={() => {
                if (isWithdrawAble) {
                  setInvestType('withdraw');
                  setStrategy(strategy);
                }
              }}
            >
              <span className="bg-card-blue">{t`Withdraw`}</span>
            </GradientButton>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default InvestCard;
