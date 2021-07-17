import React, {useState} from 'react'
import classnames from 'classnames'
import { defineMessage, Trans } from '@lingui/macro'
import Dropdown from 'react-bootstrap/Dropdown'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { locales } from '../../../../lingui.config'
import Modal from '@components/molecules/modal'
import Button from '@components/atoms/button'

const languageLabels = {
    'en': defineMessage({ message: 'English' }),
    'de': defineMessage({ message: 'German' }),
}

const LanguageSwitch = (props) => {
    const { locale, asPath } = useRouter();
    const [show, setShow] = useState(false)

    return (
        <>
            <Button
                variant="light"
                className={classnames('d-flex align-items-center justify-content-center p-2 p-3 bg-dark', props.className)}
                onClick={() => setShow(true)}
            >
                <img src={`/assets/flags/${locale}.svg`} alt={locale} width={22} height={22} />
            </Button>
            <Modal show={show} onHide={() => setShow(false)}>
              <>
                <Modal.Header closeButton onHide={() => setShow(false)}>
                    <Modal.Title><Trans>Switch Language</Trans></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {locales.map((lang) => (
                        <Dropdown.Item key={`lang${lang}`} className="mb-3" active={lang === locale}>
                            <Link href={asPath} locale={lang}>
                                <div className="d-flex align-items-center">
                                    <img className="me-3" src={`/assets/flags/${lang}.svg`} alt={lang} width={22} height={22} />
                                    <span><Trans id={languageLabels[lang].id}/></span>
                                </div>
                            </Link>
                        </Dropdown.Item>
                    ))}
                </Modal.Body>
              </>
            </Modal>
        </>
    )
}

export default LanguageSwitch
