import useWallet from '@hooks/use-wallet'
import {useEffect, useState} from 'react'
import api from '../api'

interface TokenSaleProps {
    tokenSaleData: any
    loading: boolean
}

export default function UseTokenSale():TokenSaleProps {
    const wallet = useWallet()
    const [loading, setLoading] = useState<boolean>(false)
    const [tokenSaleData, setTokenSaleData] = useState<TokenSaleProps>(null)

    const fetchTokensaleData = async () => {

        try {
            setLoading(true)
            const response = await api.fetchAllTokenSaleInfo(wallet.address)
            const payload = response?.data || null
            setTokenSaleData(payload['hydra:member'])
            setLoading(false)
        } catch (err) {
            setLoading(false)
            setTokenSaleData(null)
        }
    }

    useEffect(() => {
        if (wallet.isConnected) {
            // @ts-ignore
            async function fetch() {
                await fetchTokensaleData()
            }
            fetch()
        }
    }, [wallet.isConnected])

    return {
        tokenSaleData,
        loading
    }
}
