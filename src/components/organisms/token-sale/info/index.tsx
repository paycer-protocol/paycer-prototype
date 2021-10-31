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

const StyledImg = styled.img`
    border: 1px solid #244166;
    width: 100%;
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
        <h2 className="mb-4"><Trans>Check your Private Sale Status</Trans></h2>

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
      </>
    )
}

export default KycProcessInfo
