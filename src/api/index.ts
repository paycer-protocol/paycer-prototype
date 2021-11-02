import axios from 'axios'

export default {
  fetchTokenSaleInfo: (walletAddress: string): Promise<any> => (
    axios.get(`https://api.paycer.io/private_sales/${walletAddress}`)
  ),
}
