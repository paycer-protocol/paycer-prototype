import axios from 'axios'
import moment from 'moment'

interface PricePair {
  time: string;
  quote: number;
};

export default {
  fetchTokenSaleInfo: (walletAddress: string): Promise<any> => (
    axios.get(`https://api.paycer.io/private_sales/${walletAddress}`)
  ),
  fetchAllTokenSaleInfo: (walletAddress: string): Promise<any> => (
      axios.get(`https://api.paycer.io/private_sales?walletAddress=${walletAddress}`)
  ),
  fetchReferralCode: (walletAddress: string): Promise<any> => (
    axios.get(`https://api.paycer.io/referrals/${walletAddress}`)
  ),
  createReferralCode: (walletAddress: string): Promise<any> => (
    axios.post(`https://api.paycer.io/referrals`, { walletAddress })
  ),
  fetchReferralRewards: (walletAddress: string): Promise<any> => (
    axios.get(`https://api.paycer.io/referrals/${walletAddress}/rewards`)
  ),
  fetchPriceChart: async(token0Symbol: string, token1Symbol: string): Promise<[number, number][]> => (
      axios.get(`https://api.paycer.io/pair_prices/historical/${token0Symbol}/${token1Symbol}`).
      then(res => (res.data as PricePair[]).map(pp => [moment(pp.time).unix(), pp.quote]))
  )
}
