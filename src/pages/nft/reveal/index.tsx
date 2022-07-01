import { useRouter } from 'next/router'
import NftRevealLayout from '@components/organisms/nft/reveal/layout'
import RevealPanel from '@components/organisms/nft/reveal/reveal-panel'
import styled from 'styled-components'

const RevealBg = styled.div`
  height: 100vh;
  width: 100%;
  background-image: url('/img/nft/reveal-bg.png');
  background-size: cover;
  background-position: 70% 40%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

export default function NftWhitelistConfirmationPage() {
  const { status } = useRouter().query

  return (
    <NftRevealLayout>
      <RevealBg className="px-4 px-md-7">
        <RevealPanel />
      </RevealBg>
    </NftRevealLayout>
  )
}
