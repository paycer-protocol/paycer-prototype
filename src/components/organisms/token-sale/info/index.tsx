import React from 'react'
import * as Yup from 'yup'
import styled from 'styled-components'
import {t, Trans} from '@lingui/macro'
import Card from '@components/molecules/card'
import GradientButton from '@components/atoms/button/gradient-button'
import Form from '@components/atoms/form/form'
import Input from '@components/atoms/form/input'
import { useTokenSale } from '@context/token-sale-context'

const HorizontalLine = styled.div`
    border-top: 1px solid #244166;
    margin: 40px 0 40px;
    position: relative;
`


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
        <h2><Trans>Check your Private Sale Status</Trans></h2>

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
                  className="w-100 mb-4"
                  label="Submit your ERC20 Wallet Address"
                />
                <GradientButton type="submit" className="w-100">
                    {t`Check Status`}
                </GradientButton>
            </Form>
        </Card.Text>

          <HorizontalLine />
          <h2><Trans>Join the Paycer Private Sale</Trans></h2>
          <a
              target="_blank"
              href="https://www.paycer.io/token-sale"
              className="d-flex justify-content-center"
          >
              <img
                  className="rounded"
                  alt="token sale"
                  style={{ width: '100%'}}
                  src="https://pbs.twimg.com/media/FBSCTq0WUAcEFWx?format=jpg&name=medium"
              />
          </a>
      </>
    )
}

export default KycProcessInfo
