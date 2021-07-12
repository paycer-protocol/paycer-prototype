import React, { useContext }  from 'react'
import ProgressBar from '@components/atoms/progress-bars'
import { Money, Percentage } from '@components/atoms/number'
import Accordion from 'react-bootstrap/Accordion'
import AccordionContext from 'react-bootstrap/AccordionContext';
import StepProgressBar from '@components/molecules/step-progress-bar'
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
import { ChevronDown, ChevronUp } from '@styled-icons/bootstrap'
import Icon from '../../../components/atoms/icon'

const portfolioFixtures = [
  {
    symbolName: 'ChainLink',
    symbolImageId: 'chain',
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
    symbolImageId: 'aave',
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
    symbolImageId: 'theta',
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
    symbolName: 'USD Coin',
    symbolImageId: 'usdc',
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
    symbolImageId: 'usdc',
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
    const currentEventKey = useContext(AccordionContext)
    const toggleOnClick = useAccordionToggle(eventKey)
    const isCurrentEventKey = currentEventKey === eventKey
    return (
      <tr
        onClick={toggleOnClick}
        className="cursor-pointer"
      >
        <td>
          <Icon component={isCurrentEventKey ? ChevronUp : ChevronDown} size={15} />
        </td>
        {children}
      </tr>
    )
  }

  return (
    <div className="card">
      <div className="card-header">
        <div className="row align-items-center">
          <div className="col">
            <h4 className="card-header-title">
              Portfolio
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
                &nbsp;
              </th>
              <th>
                <a href="#" className="text-muted list-sort">
                  Asset
                </a>
              </th>
              <th>
                <a href="#" className="text-muted">
                  Balance
                </a>
              </th>
              <th>
                <a href="#" className="text-muted">
                  Price Change %
                </a>
              </th>
              <th className="text-end">
                <a href="#" className="text-muted">
                  Liquidity
                </a>
              </th>
            </tr>
            </thead>
            <tbody className="list">
              {portfolioFixtures.map((data, key) => (
                <>
                  <CustomToggle eventKey={key+1}>
                    <td className="goal-project">
                      {data.symbolName}
                    </td>
                    <td>
                      {data.balanceSymbol}&nbsp;{data.symbolShort}
                    </td>
                    <td className="text-end">
                      <div className="text-start">
                        <Percentage
                          value={(data.balanceUSD * 100 / totalBalanceUSD) / 100}
                          className="mb-2"
                        />
                        <ProgressBar
                          now={data.balanceUSD * 100 / totalBalanceUSD}
                          min={0}
                          max={100}
                        />
                      </div>
                    </td>
                    <td className="text-end">
                      <Money value={data.totalVolume} />
                    </td>
                  </CustomToggle>
                  <tr>
                    <td colSpan="5" className="pt-0 pb-0 bg-secondary-dark">
                      <Accordion.Collapse eventKey={key+1}>
                        <div className="mt-6 mb-6">
                          <StepProgressBar
                            steps={data?.stepsProgressBar?.steps}
                            progress={data?.stepsProgressBar?.progress}
                            symbolName={data.symbolName}
                            symbolImageId={data.symbolImageId}
                          />
                        </div>
                      </Accordion.Collapse>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </Accordion>
      </div>
    </div>
  )
}
