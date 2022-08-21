import useOwnedNfts from '@hooks/nft/use-owned-nfts'
import React from 'react'
import NftCardList from './list'
import Spinner from "@components/atoms/spinner"

export default function NftOverview() {
  const result = useOwnedNfts()

  if (result.status === 'loading') {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center mt-8">
        <Spinner animation="border" show/>
      </div>
    )
  }

  return (
    <div>
      {result.status === 'success' && <NftCardList nfts={result.nfts}/>}
    </div>
  )
}
