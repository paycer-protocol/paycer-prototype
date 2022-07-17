import PageHeader from '@components/molecules/page-header'
import NftDetailContextProvider from 'context/nft-detail-context'
import Layout from '@components/organisms/layout'
import NftDetail from '@components/organisms/nft/detail'
import Link from "next/link"
import { t } from '@lingui/macro'
import React from "react"

export default function NftOverviewPage() {
  return (
   <Layout>
     <div className="container mt-3">
       <PageHeader>
         <div className="row align-items-center position-relative" style={{ zIndex: 1 }}>
             <Link href="/my-nfts">
                 <a href="#!" title={t`Back to NFT Overview`}>
                     {t`Back`}
                 </a>
             </Link>
         </div>
       </PageHeader>
       <div className="position-relative blur-background">
         <NftDetailContextProvider>
           <NftDetail />
         </NftDetailContextProvider>
       </div>
     </div>
   </Layout>
  )
}
