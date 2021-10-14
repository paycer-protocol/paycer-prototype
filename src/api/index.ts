import { apiEndpoints } from '../config/routes'
import axios from 'axios'

export default {
  fetchTokenSaleKycStatus: (walletAddress: string): Promise<any> => {
    return axios
      .get(apiEndpoints.fetchPrivateSaleKycStatus.replace(':walletAddress', walletAddress))
      .catch(_error => {
        // P368 | Todo: Discuss proper error handling - Not adding this breaks on 404's
        // console.log(error)
      })
  },
}
