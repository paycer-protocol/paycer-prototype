import React from 'react'
import Link from "next/link"
import { t } from '@lingui/macro'
import { ChevronLeft } from '@styled-icons/bootstrap'
import PageHeader from '@components/molecules/page-header'
import NftDetailContextProvider from 'context/nft-detail-context'
import Layout from '@components/organisms/layout'
import NftDetail from '@components/organisms/nft/detail'
import Icon from '@components/atoms/icon'


export default function NftOverviewPage() {
  return (
   <Layout>
     <div className="container mt-3">
       <PageHeader>
         <div className="row align-items-center position-relative" style={{ zIndex: 1 }}>
             <Link href="/nft/my-nfts">
                 <a href="#!" title={t`Back to NFT Overview`} className="d-flex align-items-center">
                     <Icon
                         component={ChevronLeft}
                         size={18}
                         color="white"
                     />
                     <span className="text-uppercase ps-3 fw-bold">{t`Back`}</span>
                 </a>
             </Link>
         </div>
       </PageHeader>
       <div>
         <NftDetailContextProvider>
           <NftDetail />
         </NftDetailContextProvider>
       </div>
     </div>
   </Layout>
  )
}
