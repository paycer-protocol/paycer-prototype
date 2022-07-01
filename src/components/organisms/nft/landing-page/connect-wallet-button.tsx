import Button from '@components/atoms/button';
import Icon from '@components/atoms/icon';
import WalletProvider from '@components/organisms/web3/wallet-provider';
import { t } from '@lingui/macro';
import { connectors } from '@providers/connectors';
import { ArrowForward } from '@styled-icons/material';
import { useState } from 'react';

export default function ConnectWalletButton() {
  const [showWalletProviderModal, setShowWalletProviderModal] = useState(false);

  return (
    <>
      <Button onClick={() => setShowWalletProviderModal(true)} className="w-100 bg-white text-primary border-0 d-flex justify-content-center align-items-center px-5 py-3 mt-4">
        {t`CONNECT TO WALLET`}
        <div className="ms-3"><Icon size={16} component={ArrowForward} /></div>
      </Button>
      { showWalletProviderModal && <WalletProvider providers={connectors} onHide={() => setShowWalletProviderModal(false)} /> }
    </>
  );
}
