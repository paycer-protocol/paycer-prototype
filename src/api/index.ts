import { apiEndpoints } from '../config/routes'
import axios from 'axios'

export default {
  fetchTokenSaleKycStatus: (walletAddress: string): Promise<any> => {
    return axios
      .get(apiEndpoints.fetchPrivateSaleKycStatus.replace(':walletAddress', walletAddress))
      .catch(error => {
        // P368 | Todo: Discuss proper error handling
        // Not adding it will break page on 404's
        // console.log(error)
      })
  },
}
