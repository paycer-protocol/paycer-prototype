import React from 'react';
import { t } from '@lingui/macro';
import PageHeader from '@components/molecules/page-header';
import PortalBlockNumber from '@components/organisms/portal-block-number';
import VestingWrapper from '@components/organisms/vesting';
import Layout from '@components/organisms/layout';

export default function Vesting() {
  return (
    <Layout>
      <div className="container mt-3 mb-8">
        <PageHeader>
          <div className="row align-items-center">
            <div className="col">
              <PageHeader.Subtitle>
                {t`Vesting`}
              </PageHeader.Subtitle>
              <PageHeader.Title>
                {t`Claim distribution`}
              </PageHeader.Title>
            </div>
          </div>
        </PageHeader>
        <VestingWrapper />
      </div>
      <PortalBlockNumber />
    </Layout>
  );
}
