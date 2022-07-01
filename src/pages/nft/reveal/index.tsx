import Layout from '@components/organisms/layout';
import { useRouter } from 'next/router';
import NftRevealLayout from '@components/organisms/nft/reveal/layout';
import RevealPanel from '@components/organisms/nft/reveal/reveal-panel';
import styled from 'styled-components';

const RevealBg = styled.div`
  height: 100vh;
  width: 100%;
  background-image: url('/img/nft/reveal-bg.svg');
  background-size: cover;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export default function NftWhitelistConfirmationPage() {
  const { status } = useRouter().query;

  return (
    <NftRevealLayout>
      <RevealBg className="px-md-7">
        <div className="col-md-5 offset-md-7">
          <RevealPanel />
        </div>
      </RevealBg>
    </NftRevealLayout>
  );
}
