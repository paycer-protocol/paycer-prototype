import React, {useState} from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { locales } from '../../../../lingui.config'
import Modal from "@components/molecules/modal";
import {Trans} from "@lingui/macro";
import Button from "@components/atoms/button";

const LanguageSwitch = () => {
    const { locale, asPath } = useRouter();
    const [show, setShow] = useState(false)

    return (
        <>
            <Button
                variant="light"
                className="d-flex align-items-center justify-content-center p-2 p-xl-3 bg-dark"
                onClick={() => setShow(true)}
            >
                <img src={`assets/flags/${locale}.svg`} alt={locale} width={22} height={22} />
            </Button>
            <Modal show={show} onHide={setShow}>
                <Modal.Header closeButton onHide={() => setShow(false)}>
                    <Modal.Title><Trans>Switch Language</Trans></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {locales.map((lang) => (
                        <Dropdown.Item key={`lang${lang}`}>
                            <Link href={asPath} locale={lang}>
                                <div className="d-flex align-items-center">
                                    <img className="me-3" src={`assets/flags/${lang}.svg`} alt={locale} width={22} height={22} />
                                    <span>Englisch</span>
                                </div>
                            </Link>
                        </Dropdown.Item>
                    ))}
                </Modal.Body>
            </Modal>
        </>
    )
}

export default LanguageSwitch
