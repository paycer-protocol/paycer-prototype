import React from 'react'
import * as Yup from 'yup'
import {t, Trans} from '@lingui/macro'
import Card from '@components/molecules/card'
import GradientButton from '@components/atoms/button/gradient-button'
import Form from '@components/atoms/form/form'
import Input from '@components/atoms/form/input'
import { useTokenSale } from '@context/token-sale-context'

const KycProcessInfo = () => {
    const tokenSale = useTokenSale()

    const initialValues = {
        walletAddress: tokenSale.walletAddress
    }

    const validationSchema = Yup.object().shape({
        walletAddress: Yup.string().required(),
    })

    const handleSubmit = (values) => {
        tokenSale.checkWalletStatus(values.walletAddress)
    }

    return (
      <>
        <h2><Trans>Paycer Private is Live</Trans></h2>
        <a
          target="_blank"
          href="https://www.paycer.io/token-sale"
          className="d-flex justify-content-center mb-5"
        >
          <img
            className="rounded"
            alt="token sale"
            style={{ width: '100%'}}
            src="https://pbs.twimg.com/media/FBSCTq0WUAcEFWx?format=jpg&name=medium"
          />
        </a>
        <Card.Text>
            <Form
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              enableReinitialize
              className="mb-5"
            >
                <Input
                  name="walletAddress"
                  className="w-100 mb-3"
                  label="ERC20 Wallet Address"
                />
                <GradientButton type="submit" className="w-100">
                    {t`Check Status`}
                </GradientButton>
            </Form>
            <p className="text-muted">
                <Trans>Check your wallet address to check your status.</Trans>
            </p>
        </Card.Text>
      </>
    )
}

export default KycProcessInfo
