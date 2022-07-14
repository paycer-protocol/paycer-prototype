import useOwnedNft from '@hooks/nft/use-owned-nft'
import { useRouter } from 'next/router'

export default function NftDetail() {
  const router = useRouter()
  const { pid } = router.query
  const result = useOwnedNft(pid)


  console.log(result)

  return (
    <div>
      <p>Post: {pid}</p>
    </div>
  )
}
