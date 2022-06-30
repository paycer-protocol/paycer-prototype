import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import classnames from 'classnames';
import { TextLeft } from '@styled-icons/bootstrap';
import { routes } from '@config/routes';
import { ArrowDropDown } from '@styled-icons/material-outlined';
import Image from '@components/atoms/image';
import Icon from '@components/atoms/icon';
import OffCanvas from '@components/organisms/off-canvas';
import { useDapp } from '@context/dapp-context';
import WalletMenu from './wallet-menu';
import NetworkMenu from './network-menu';
import * as Styles from './styles';

const Header = () => {
  const { pathname } = useRouter();
  const [showModalNav, setShowModalNav] = useState(false);
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
    <>
      <header className="mx-md-4 mx-lg-5 pt-0 pt-md-2 pb-md-3" style={{ position: 'relative', zIndex: 10 }}>
        <div className="navbar navbar-expand-lg border-bottom-0 pb-4">
          <div className="container-fluid flex-row-reverse">
            <Link href="/">
              <Styles.StyledLogo>
                <Styles.StyledBrand className="me-4 py-0 ms-2">
                  <Image src="/assets/logo.svg" alt="Paycer" />
                </Styles.StyledBrand>
              </Styles.StyledLogo>
            </Link>
            <ul className="navbar-nav flex-row d-none d-lg-flex pt-md-2">
              <li className="nav-item me-4 d-flex align-items-center position-relative">
                <NetworkMenu />
              </li>
              <li className="nav-item d-flex align-items-center position-relative">
                <WalletMenu />
              </li>
            </ul>
            <ul className="d-none d-lg-flex navbar-nav ms-3 me-auto mt-2 ms-5 ps-3">
              {qualifiedRoutes.map((route, key) => (
                <li className="nav-item me-4" key={`nav${key}`}>

                  {(route?.isDropdown && !route.path && route.subroutes && route.subroutes.length)
                    ? (
                        <div className="dropdown p-0">
                          <a
                              href="#"
                              className="nav-link text-nowrap"
                              role="button"
                              data-bs-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              {route.label}
                              <Icon
                                  component={ArrowDropDown}
                                  size={20}
                                />
                            </a>
                          {(route.subroutes && route.subroutes.length)
                                          && (
                                          <div className="dropdown-menu dropdown-menu-end">
                                            {route.subroutes.map((subroute, innerKey) => (
                                              <div key={innerKey}>
                                                {(subroute?.auth)
                                                  ? (
                                                    <>
                                                      {isAuthenticated && subroute?.supportedChains.includes(currentNetworkId)
                                                                && (
                                                                <Link href={subroute.path}>
                                                                  <a href="#!" className="dropdown-item">
                                                                    {subroute?.label}
                                                                  </a>
                                                                </Link>
                                                                )}
                                                    </>
                                                  )
                                                  : (
                                                    <Link href={subroute.path}>
                                                      <a href="#!" className="dropdown-item">
              {subroute?.label}
            </a>
                                                    </Link>
                                                  )}
                                              </div>
                                            ))}
                                          </div>
                                          )}

                        </div>
                    )
                    : (
                        <Link href={route.path}>
                          <a className={classnames({ active: pathname == route.path || (route.subroutes ? route?.subroutes.find((r) => r.path === pathname) : false) }, 'nav-link', 'text-nowrap')} title={route.label}>
                              {route.label}
                            </a>
                        </Link>
                    )}

                </li>
              ))}
            </ul>
            <ul className="navbar-nav flex-row d-flex d-lg-none">
              <li className="me-3 position-relative" style={{ top: '6px' }}>
                <Icon
                  onClick={() => setShowModalNav(true)}
                  component={TextLeft}
                  size={30}
                  color="white"
                  className="cursor-pointer"
                />
              </li>
            </ul>
          </div>
        </div>
      </header>
      <OffCanvas
        show={showModalNav}
        onHide={() => setShowModalNav(false)}
      />
    </>

  );
};

export default Header;
