import {useEffect, useState} from 'react'
import {createClient} from 'urql'

interface UseNftOwnerHistoryProps {
  ownerHistory: Array<{
    id: number
  }>
}

export default function useNftOwnerHistory(id): UseNftOwnerHistoryProps {
  const [ownerHistory, setOwnerHistory] = useState<Array<{
    id: number
  }> | null>(null)

  const fetchTokens = async () => {

    try {
      const tokensQuery = `
              query {
                  tokens(first: 5) {
                    id
                    owners {
                      id
                      nfts
                    }
                  }
              }
            `
      const client = createClient({
        url: process.env.NEXT_PUBLIC_SUBGRAPH_NFT_API_URL,
      })
      const data = await client.query(tokensQuery).toPromise()
      if (data) {
        const token = data.data.tokens.find(t => t.id = id)
        if (token) {
          setOwnerHistory(token.owners)
        }
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetchTokens()
  }, [])

  return {
    ownerHistory
  }
}
