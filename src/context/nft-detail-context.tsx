import React, { createContext, useContext } from 'react'
import { useRouter } from 'next/router'
import useNftOwnerHistory from '@hooks/nft/use-nft-owner-history'
import { PcrNftMetadata } from '../types/nft'
import useNfts from '@hooks/nft/use-nfts'
import { NftRarities } from '@config/nft'

export interface NftDetailContextTypes extends PcrNftMetadata {
  status: string
  id: string
  mintedCount: number
  rarity: {
    label: string,
    color: string,
  } | null
  ownerHistory: Array<{
    id: number
    nfts: Array<{
      timestamps: number[]
    }>
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
  mintedCount: 0,
  ownerHistory: null,
  rarity: null,
}

const NftDetailContext = createContext<NftDetailContextTypes>(
  contextDefaultValues,
)

export const useNftDetail = () => useContext(NftDetailContext)

const NftDetailContextProvider = ({ children }) => {

  const router = useRouter()
  const { pid } = router.query
  const result = useNfts([pid])
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
      image,
    } = metadata

    const rarityAttr = attributes.find(a => a.trait_type === 'Rarity')

    values = {
      id,
      animation_url,
      description,
      level,
      name,
      status: result.status,
      attributes,
      image,
      rarity: NftRarities[rarityAttr.value.toString().toLowerCase()],
      mintedCount: 150,
      ownerHistory
    }
  }

  return (
    <NftDetailContext.Provider
      value={values}
    >
      {children}
    </NftDetailContext.Provider>
  )
}

export default NftDetailContextProvider
