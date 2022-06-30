import React from 'react';
import Footer from '@components/organisms/footer';
import Header from '@components/organisms/header';

export interface NftRevealLayoutProps {
  children: any
}

const NftRevealLayout = (props: NftRevealLayoutProps) => {
  const { children } = props;

  return (
    <>
      <Header />
      <main role="main">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default NftRevealLayout;
