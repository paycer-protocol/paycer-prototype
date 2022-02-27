import axios from 'axios'
import moment from 'moment'
import fetchStakingSeries from './info-dashboard-staking-mock'
import fetchVestingSeries from './info-dashboard-vesting-mock'

interface PricePair {
  time: string;
  quote: number;
}

export default {
  fetchTokenSaleInfo: (walletAddress: string): Promise<any> => (
    axios.get(`https://api.paycer.io/v1/token_sales/${walletAddress}`)
  ),
  fetchAllTokenSaleInfo: (walletAddress: string): Promise<any> => (
      axios.get(`https://api.paycer.io/v1/token_sales?walletAddress=${walletAddress}`)
  ),
  fetchReferralCode: (walletAddress: string): Promise<any> => (
    axios.get(`https://api.paycer.io/v1/referrals/${walletAddress}`)
  ),
  createReferralCode: (walletAddress: string): Promise<any> => (
    axios.post(`https://api.paycer.io/v1/referrals`, { walletAddress })
  ),
  fetchReferralRewards: (walletAddress: string): Promise<any> => (
    axios.get(`https://api.paycer.io/v1/referrals/${walletAddress}/rewards`)
  ),
  fetchPriceChart: async(token0Symbol: string, token1Symbol: string, interval: string): Promise<[number, number][]> => (
    axios.get(`https://api.paycer.io/v1/prices/pair_prices?symbol=${token0Symbol}&base=${token1Symbol}&order=asc&interval=${interval}`).
      then(res => (res.data as PricePair[]).map(pp => [moment(pp.time).valueOf(), Number(pp.quote)]))
  ),
  fetchStakingSeries,
  fetchVestingSeries
}
