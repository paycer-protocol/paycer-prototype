import { useDapp } from '@context/dapp-context'
import {useEffect, useState} from 'react'
import api from '../api'

interface TokenSaleProps {
    tokenSaleData: any
    loading: boolean
}

export default function UseTokenSale():TokenSaleProps {
    const { walletAddress, isAuthenticated } = useDapp()
    const [loading, setLoading] = useState<boolean>(false)
    const [tokenSaleData, setTokenSaleData] = useState<TokenSaleProps>(null)

    const fetchTokenSaleData = async () => {
        try {
            setLoading(true)
            const response = await api.fetchAllTokenSaleInfo(walletAddress)
            const payload = response?.data || null
            setTokenSaleData(payload)
            setLoading(false)
        } catch (err) {
            setLoading(false)
            setTokenSaleData(null)
        }
    }

    useEffect(() => {
        if (isAuthenticated && walletAddress) {
            // @ts-ignore
            async function fetch() {
                await fetchTokenSaleData()
            }
            fetch()
        }
    }, [isAuthenticated, walletAddress])

    return {
        tokenSaleData,
        loading
    }
}
