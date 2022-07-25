import React, { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useOwnedNft from '@hooks/nft/use-owned-nft'
import useNftOwnerHistory from '@hooks/nft/use-nft-owner-history'
import { PcrNftMetadata } from '../types/nft'

export interface NftDetailContextTypes extends PcrNftMetadata {
  status: string
  id: string
  rarity: number
  mintedCount: number
  ownerHistory: Array<{
    id: number
  }>
}

const contextDefaultValues: NftDetailContextTypes = {
  status: '',
  image: '',
  animation_url: '',
  description: '',
  level: 0,
  name: '',
  id: '',
  attributes: null,
  rarity: 0,
  mintedCount: 0,
  ownerHistory: null
}

const NftDetailContext = createContext<NftDetailContextTypes>(
  contextDefaultValues,
)

export const useNftDetail = () => useContext(NftDetailContext)

const NftDetailContextProvider = ({ children }) => {

  const router = useRouter()
  const { pid } = router.query
  const result = useOwnedNft(pid)
  const { ownerHistory } = useNftOwnerHistory(pid)
  const status = result.status

  let values:NftDetailContextTypes = { ...contextDefaultValues, ...{ status }}

  if (result.status === 'success' && result.nfts.length) {

    const {
      id,
      metadata
    } = result.nfts[0]

    const {
      animation_url,
      attributes,
      description,
      level,
      name,
      image
    } = metadata

    values = {
      id,
      animation_url,
      description,
      level,
      name,
      status: result.status,
      attributes,
      image,
      rarity: 4,
      mintedCount: 150,
      ownerHistory
    }
  }

  console.log(values)

  return (
    <NftDetailContext.Provider
      value={values}
    >
      {children}
    </NftDetailContext.Provider>
  )
}

export default NftDetailContextProvider
