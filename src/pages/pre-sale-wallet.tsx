import PageHeader from "@components/molecules/page-header";
import {Trans} from "@lingui/macro";
import Transactions from "@components/organisms/token-sale/transactions";
import KycProcessInfo from "@components/organisms/token-sale/info";
import KycProcessTimeline from "@components/organisms/token-sale/timeline";
import React from "react";
import {LeftCol, RightCol} from "./token-sale";


export default function PreSaleWallet() {

  return (
    <div className="container mt-3 mb-8">
      <PageHeader>
        <div className="row align-items-center">
          <div className="col">
            <PageHeader.Subtitle>
              <Trans>PreSale</Trans>
            </PageHeader.Subtitle>
            <PageHeader.Title>
              <Trans>Deposit Wallet Address</Trans>
            </PageHeader.Title>
          </div>
        </div>
      </PageHeader>
      <div className="card blur-background">
        <div className="card-body">
          <div className="m-5 text-center">
            <h1>0xE6Bf42e604bC45b1495E8fB8fB5d2B5B19e3614B</h1>
          </div>
        </div>
      </div>
    </div>
  )
}
