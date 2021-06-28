import ProgressBar from '@components/atoms/progress-bars'
import { Money, Percentage } from '@components/atoms/number'

const portfolioFixtures = [
  {
    symbolName: 'ChainLink',
    symbolShort: 'LINK',
    balanceSymbol: 16.5,
    balanceUSD: 1200,
    priceUSD: 0.25,
    priceUSDChanged: 0.25,
    totalVolume: 1223892.23,
  },
  {
    symbolName: 'Aave',
    symbolShort: 'AAVE',
    balanceSymbol: 16.5,
    balanceUSD: 234324,
    priceUSD: 0.25,
    priceUSDChanged: 0.25,
    totalVolume: 1223892.23,
  },
  {
    symbolName: 'Tehter',
    symbolShort: 'USDT',
    balanceSymbol: 16.5,
    balanceUSD: 2342,
    priceUSD: 0.25,
    priceUSDChanged: 0.25,
    totalVolume: 1223892.23,
  },
  {
    symbolName: 'USD Coin',
    symbolShort: 'USDC',
    balanceSymbol: 16.5,
    balanceUSD: 234323,
    priceUSD: 0.25,
    priceUSDChanged: 0.25,
    totalVolume: 1223892.23,
  },
  {
    symbolName: '1Inche Token',
    symbolShort: 'INCH',
    balanceSymbol: 16.5,
    balanceUSD: 234234,
    priceUSD: 0.25,
    priceUSDChanged: 0.25,
    totalVolume: 1223892.23,
  },
]

export default function Portfolio() {
  const totalBalanceUSD = portfolioFixtures.reduce(
    (value, { balanceUSD }) => balanceUSD + value,
    0
  );

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
        <table className="table table-sm table-nowrap card-table">
          <thead>
          <tr>
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
          {portfolioFixtures.map((data) => (
            <tr>
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
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
