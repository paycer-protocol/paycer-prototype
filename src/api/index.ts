import axios from 'axios'

export default {
  fetchTokenSaleInfo: (walletAddress: string): Promise<any> => (
    axios.get(`https://api.paycer.io/private_sales/${walletAddress}`)
  ),
  fetchReferralCode: (walletAddress: string): Promise<any> => (
    axios.get(`https://api.paycer.io/referrals/${walletAddress}`)
  ),
  createReferralCode: (walletAddress: string): Promise<any> => (
    axios.post(`https://api.paycer.io/referrals`, { walletAddress })
  ),
  fetchReferralRewards: (walletAddress: string): Promise<any> => (
    axios.get(`https://api.paycer.io/referrals/${walletAddress}/rewards`)
  )


}
