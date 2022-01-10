import PageHeader from '@components/molecules/page-header'
import { Trans } from '@lingui/macro'
import { useRouter } from 'next/router'
import React, {useEffect} from 'react'

export default function Custom404() {

    const router = useRouter()

    useEffect(() => {
        if (router.asPath === '/token-sale') {
            router.push('/vesting')
        }
    }, []);

    return (
        <>
            <div className="container mt-6">
                    <div className="row align-items-center card">
                        <div className="card-body">
                            <PageHeader.Subtitle>
                                <Trans>404</Trans>
                            </PageHeader.Subtitle>
                            <PageHeader.Title>
                                <Trans>Page not found</Trans>
                            </PageHeader.Title>
                        </div>
                    </div>
            </div>
        </>
    )
}