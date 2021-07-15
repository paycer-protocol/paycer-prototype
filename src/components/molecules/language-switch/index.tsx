import React from 'react'
import { StyledIconProps } from '@styled-icons/styled-icon'
import styled from 'styled-components'
import Dropdown from 'react-bootstrap/Dropdown'
import Link from 'next/link'
import { useRouter } from 'next/router'

interface LanguageSwitchProps extends StyledIconProps {
}

const StyledDropdownToggle = styled(Dropdown.Toggle)`
    &:after {
      display: none;
    }
`

const LanguageSwitch: React.FC<LanguageSwitchProps> = ({}: LanguageSwitchProps) => {
    const { locale, asPath } = useRouter();

    return (
        <div className="container">
            <Dropdown>
                <StyledDropdownToggle className="pt-3 pb-3" variant="light">
                    {locale.split('_')[0].toUpperCase()}
                </StyledDropdownToggle>

                <Dropdown.Menu className="p-0">
                    <ul className="navbar-nav m-0 m-3">
                        <li className="nav-item me-3">
                            <Link
                                href={asPath}
                                locale="en_US"
                            >
                                <span className={locale === 'en_US' ? 'text-decoration-underline' : ''}>EN</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                href={asPath}
                                locale="de_DE"
                            >
                                <span className={locale === 'de_DE' ? 'text-decoration-underline' : ''}>DE</span>
                            </Link>
                        </li>
                    </ul>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}

export default LanguageSwitch
