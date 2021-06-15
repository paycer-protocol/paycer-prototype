import { FC, useEffect, useState } from 'react'
import { I18nProvider } from '@lingui/react'
import getConfig from 'next/config'
import { i18n } from '@lingui/core'
import { useRouter } from 'next/router'
const { publicRuntimeConfig } = getConfig()
const { locales } = publicRuntimeConfig

console.log(publicRuntimeConfig)
// locales.map((locale) => i18n.loadLocaleData(locale, { plurals: () => null }))

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
        <I18nProvider i18n={i18n} forceRenderOnLocaleChange={false}>
            {children}
        </I18nProvider>
    )
}

export default I18n
