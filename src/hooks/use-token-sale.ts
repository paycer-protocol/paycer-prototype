import { useWallet } from '@context/wallet-context'
import {useEffect, useState} from 'react'
import api from '../api'

interface TokenSaleProps {
    tokenSaleData: any
    loading: boolean
}

export default function UseTokenSale():TokenSaleProps {
    const { walletAddress, walletIsAuthenticated } = useWallet()
    const [loading, setLoading] = useState<boolean>(false)
    const [tokenSaleData, setTokenSaleData] = useState<TokenSaleProps>(null)

    const fetchTokenSaleData = async () => {
        try {
            setLoading(true)
            const response = await api.fetchAllTokenSaleInfo(walletAddress)
            const payload = response?.data || null
            setTokenSaleData(payload['hydra:member'])
            setLoading(false)
        } catch (err) {
            setLoading(false)
            setTokenSaleData(null)
        }
    }

    useEffect(() => {
        if (walletIsAuthenticated && walletAddress) {
            // @ts-ignore
            async function fetch() {
                await fetchTokenSaleData()
            }
            fetch()
        }
    }, [walletIsAuthenticated, walletAddress])

    return {
        tokenSaleData,
        loading
    }
}
