import React from 'react'
import { defineMessage, Trans } from '@lingui/macro'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Button from '@components/atoms/button'
import { locales } from '../../../../lingui.config'

const languageLabels = {
    'en': defineMessage({ message: 'English' }),
    'de': defineMessage({ message: 'German' }),
}

export const LanguageChoice = () => {
    const { locale, asPath } = useRouter()

    return (
        <div className="d-flex">
          {locales.map((lang) => (
            <Button key={`lang${lang}`} variant="light" className="me-2" active={lang === locale}>
              <Link href={asPath} locale={lang}>
                <div className="d-flex align-items-center">
                  <img className="me-3" src={`/assets/flags/${lang}.svg`} alt={lang} width={22} height={22} />
                    {/*@ts-ignore*/}
                  <span><Trans id={languageLabels[lang].id}/></span>
                </div>
              </Link>
            </Button>
          ))}
        </div>
    )
}

export default LanguageChoice
