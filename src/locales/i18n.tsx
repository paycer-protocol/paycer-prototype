import { FC, useEffect, useState } from 'react'
import { I18nProvider } from '@lingui/react'
import { IntlProvider } from 'react-intl'
import { i18n } from '@lingui/core'
import { useRouter } from 'next/router'

export async function activate(locale: string) {
    const { messages } = await import(`@lingui/loader!./messages/${locale}.po`)
    i18n.load(locale, messages)
    i18n.activate(locale)
}

const I18n: FC = ({ children }) => {
    const { locale } = useRouter()
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        async function load() {
            await activate(locale)
            setLoaded(true)
        }

        load()
    }, [])

    useEffect(() => {
        activate(locale)
    }, [locale])

    if (!loaded) {
        return null
    }

    return (
        <IntlProvider locale={'en-US'}>
            <I18nProvider i18n={i18n}>
                {children}
            </I18nProvider>
        </IntlProvider>
    )
}

export default I18n
