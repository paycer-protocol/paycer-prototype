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

    const fetchTokenSaleData = async () => {
        try {
            setLoading(true)
            const response = await api.fetchAllTokenSaleInfo('0xb5dD544411A57675B707175bC951B7305E5a6088')
            const payload = response?.data || null
            setTokenSaleData(payload['hydra:member'])
            setLoading(false)
        } catch (err) {
            setLoading(false)
            setTokenSaleData(null)
        }
    }

    useEffect(() => {
        if (wallet.isConnected && wallet.address) {
            // @ts-ignore
            async function fetch() {
                await fetchTokenSaleData()
            }
            fetch()
        }
    }, [wallet.isConnected, wallet.address])

    return {
        tokenSaleData,
        loading
    }
}
