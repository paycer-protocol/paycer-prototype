import React from 'react'
import { Trans } from '@lingui/macro'
import { normalizeFilename } from '../../../helper/filename'
import ProgressBar from '@components/atoms/progress-bars'
import { Money, Percentage } from '@components/atoms/number'
import Accordion from 'react-bootstrap/Accordion'
import StepProgressBar from '@components/molecules/step-progress-bar'

const portfolioFixtures = [
  {
    symbolName: 'ChainLink',
    symbolShort: 'LINK',
    balanceSymbol: 16.5,
    balanceUSD: 1200,
    priceUSD: 0.25,
    priceUSDChanged: 0.25,
    totalVolume: 1223892.23,
    stepsProgressBar: {
      progress: 80,
      steps: [
        {
          imgPath: 'assets/token/svg/color/usdt.svg',
          label: 'Lorem Yspsum',
        },
        {
          imgPath: 'assets/token/svg/color/usdt.svg',
          label: 'Lorem Yspsum',
        },
        {
          imgPath: 'assets/token/svg/color/usdt.svg',
          label: 'Lorem Yspsum',
        }
      ]
    }
  },
  {
    symbolName: 'Aave',
    symbolShort: 'AAVE',
    balanceSymbol: 16.5,
    balanceUSD: 234324,
    priceUSD: 0.25,
    priceUSDChanged: 0.25,
    totalVolume: 1223892.23,
    stepsProgressBar: {
      progress: 50,
      steps: [
        {
          imgPath: 'assets/token/svg/color/usdt.svg',
          label: 'Lorem Yspsum',
        },
        {
          imgPath: 'assets/token/svg/color/usdt.svg',
          label: 'Lorem Yspsum',
        },
        {
          imgPath: 'assets/token/svg/color/usdt.svg',
          label: 'Lorem Yspsum',
        }
      ]
    }
  },
  {
    symbolName: 'Tehter',
    symbolShort: 'USDT',
    balanceSymbol: 16.5,
    balanceUSD: 2342,
    priceUSD: 0.25,
    priceUSDChanged: 0.25,
    totalVolume: 1223892.23,
    stepsProgressBar: {
      progress: 50,
      steps: [
        {
          imgPath: 'assets/token/svg/color/usdt.svg',
          label: 'Lorem Yspsum',
        },
        {
          imgPath: 'assets/token/svg/color/usdt.svg',
          label: 'Lorem Yspsum',
        },
        {
          imgPath: 'assets/token/svg/color/usdt.svg',
          label: 'Lorem Yspsum',
        }
      ]
    }
  },
  {
    symbolName: 'USDC',
    symbolShort: 'USDC',
    balanceSymbol: 16.5,
    balanceUSD: 234323,
    priceUSD: 0.25,
    priceUSDChanged: 0.25,
    totalVolume: 1223892.23,
    stepsProgressBar: {
      progress: 50,
      steps: [
        {
          imgPath: 'assets/token/svg/color/usdt.svg',
          label: 'Lorem Yspsum',
        },
        {
          imgPath: 'assets/token/svg/color/usdt.svg',
          label: 'Lorem Yspsum',
        },
        {
          imgPath: 'assets/token/svg/color/usdt.svg',
          label: 'Lorem Yspsum',
        }
      ]
    }
  },
  {
    symbolName: '1Inche Token',
    symbolShort: 'INCH',
    balanceSymbol: 16.5,
    balanceUSD: 234234,
    priceUSD: 0.25,
    priceUSDChanged: 0.25,
    totalVolume: 1223892.23,
    stepsProgressBar: {
      progress: 50,
      steps: [
        {
          imgPath: 'assets/token/svg/color/usdt.svg',
          label: 'Lorem Yspsum',
        },
        {
          imgPath: 'assets/token/svg/color/usdt.svg',
          label: 'Lorem Yspsum',
        },
        {
          imgPath: 'assets/token/svg/color/usdt.svg',
          label: 'Lorem Yspsum',
        }
      ]
    }
  },
]

export default function Portfolio() {
  const totalBalanceUSD = portfolioFixtures.reduce(
      (value, { balanceUSD }) => balanceUSD + value,
      0
  );

  function CustomToggle({eventKey, children}) {
    return (
        <tr onClick={() => {}}>
          {children}
        </tr>
        /*
        <tr onClick={useAccordionButton(eventKey)} className="cursor-pointer">
          {children}
        </tr>
         */
    )
  }

  return (
      <div className="card">
        <div className="card-header">
          <div className="row align-items-center">
            <div className="col">
              <h4 className="card-header-title">
                <Trans>Portfolio</Trans>
              </h4>
            </div>
          </div>
        </div>

        <div className="table-responsive mb-0">
          <Accordion defaultActiveKey="0">
            <table className="table table-sm table-nowrap card-table">
              <thead>
              <tr>
                <th>
                  <a href="#" className="text-muted list-sort">
                    <Trans>Asset</Trans>
                  </a>
                </th>
                <th>
                  <a href="#" className="text-muted">
                    <Trans>Balance</Trans>
                  </a>
                </th>
                <th>
                  <a href="#" className="text-muted">
                    <Trans>Investment ratio </Trans>
                  </a>
                </th>
                <th className="text-end">
                  <a href="#" className="text-muted">
                    <Trans>Liquidity</Trans>
                  </a>
                </th>
              </tr>
              </thead>
              <tbody className="list">
                {portfolioFixtures.map((data, key) => (
                    <React.Fragment key={key}>
                      <CustomToggle eventKey={String(key+1)}>
                        <td className="goal-project">
                          <img width="28" className="me-2" src={`assets/icons/${normalizeFilename(data.symbolName)}.svg`} alt={data.symbolName} />
                          <span style={{position: 'relative', top: '2px'}}>{data.symbolName}</span>
                        </td>
                        <td>
                          {data.balanceSymbol}&nbsp;{data.symbolShort}
                        </td>
                        <td className="text-end">
                          <div className="row align-items-center g-0">
                            <div className="col-auto me-3">
                              <small className="">
                                <Percentage
                                  value={(data.balanceUSD * 100 / totalBalanceUSD) / 100}
                                  className="mb-2"
                                />
                              </small>
                            </div>
                            <div className="col">
                              <ProgressBar
                                className="progress-sm"
                                now={data.balanceUSD * 100 / totalBalanceUSD}
                                min={0}
                                max={100}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="text-end">
                          <Money value={data.totalVolume} />
                        </td>
                      </CustomToggle>
                      <tr>
                        <td colSpan={5} className="pt-0 pb-0 bg-secondary-dark">
                          <Accordion.Collapse eventKey={String(key+1)}>
                            <div className="mt-5 mb-6">
                              <StepProgressBar
                                  steps={data?.stepsProgressBar?.steps}
                                  progress={data?.stepsProgressBar?.progress}
                                  symbolName={data.symbolName}
                                  symbolShort={data.symbolShort}
                              />
                            </div>
                          </Accordion.Collapse>
                        </td>
                      </tr>
                    </React.Fragment>
                ))}
              </tbody>
            </table>
          </Accordion>
        </div>
      </div>
  )
}
