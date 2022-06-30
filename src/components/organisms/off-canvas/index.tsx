import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import classnames from 'classnames';
import { routes } from '@config/routes';
import Modal from '@components/molecules/modal';
import { useDapp } from '@context/dapp-context';
import WalletMenu from '@components/organisms/header/wallet-menu';
import NetworkMenu from '@components/organisms/header/network-menu';

interface OffCanvasProps {
  show: boolean
  onHide: () => void
}

export default function OffCanvas({ show, onHide }: OffCanvasProps) {
  const { pathname } = useRouter();
  const { currentNetworkId, isAuthenticated, isWeb3Enabled } = useDapp();

  const isAuthenticatedRoute = (route) => (route.auth ? (isWeb3Enabled && isAuthenticated) : true);

  const qualifiedRoutes = routes.filter((route) => {
    if (!currentNetworkId) {
      return true;
    }

    return route.supportedChains.includes(currentNetworkId)
      && isAuthenticatedRoute(route);
  });

  return (
    <Modal show={show} onHide={onHide} vertical>
      <>
        <Modal.Header closeButton onHide={onHide}>
          <Modal.Title>
            <Link href="/">
              <a>
                <img width="150" src="/assets/logo.svg" alt="Paycer" />
              </a>
            </Link>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-5 border-bottom light-border pb-4">
            <ul className="navbar-nav">
              {qualifiedRoutes.map((route, key) => (
                <li className="nav-item h3" key={`nav${key}`}>
                  <Link href={route.path}>
                    <a
                      className={classnames({ active: pathname == route.path || (route.subroutes ? route?.subroutes.find((r) => r.path === pathname) : false) }, 'nav-link')}
                      title={route.label}
                      onClick={onHide}
                    >
                      {route.label}
                    </a>
                  </Link>
                </li>
              ))}
              <li className="nav-item" key="navpcr">
                <a
                  href="https://app.dodoex.io/exchange/USDC-PCR?network=polygon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-link"
                  title="Buy PCR"
                >
                  Buy PCR
                </a>
              </li>
            </ul>
          </div>
          {isAuthenticated
            && (
            <div className="mb-5 border-bottom light-border pb-5">
              <NetworkMenu />
            </div>
            )}
          <div className="mb-5">
            <WalletMenu />
          </div>

        </Modal.Body>
      </>
    </Modal>
  );
}
