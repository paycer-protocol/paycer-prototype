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
    const bonusPercentage = tokenSale?.tokenSaleData?.bonusPercentage
    const immediateAvailabilityPercentage = tokenSale?.tokenSaleData?.immediateAvailabilityPercentage

    const initialValues = {
        walletAddress: tokenSale.walletAddress
    }

    const validationSchema = Yup.object().shape({
        walletAddress: Yup.string().required(),
    })

    const handleSubmit = (values) => {
        tokenSale.setWalletAddress(values.walletAddress)
        tokenSale.checkWalletStatus(values.walletAddress)
    }

    return (
      <>
        <h2 className="mb-4">
            <Trans>Check your investment status</Trans>
        </h2>

        <Card.Text>
            <Form
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              enableReinitialize
              className="mb-md-5"
            >
                <div className="mb-4">
                    <Input
                      name="walletAddress"
                      className="w-100"
                      label="Submit your ERC20 Wallet Address"
                    />
                </div>
                <div className="d-flex align-items-center justify-content-center">
                    <GradientButton type="submit" className="w-50">
                        {t`Check Status`}
                    </GradientButton>
                </div>
            </Form>
            {( (bonusPercentage || immediateAvailabilityPercentage) &&
              <>
                <div className="horizontal-line mt-5" />
                <h2 className="mb-4">
                    {t`Bonus & Availability`}
                </h2>
              </>
             )}
            {(bonusPercentage &&
              <>
                <div className="text-muted transform-uppercase">
                    {t`Bonus Percentage`}
                </div>
                {bonusPercentage}%
              </>
            )}
            {(immediateAvailabilityPercentage &&
              <>
                <div className="text-muted transform-uppercase mt-3">
                    {t`Immediate Availability Percentage`}
                </div>
                  {immediateAvailabilityPercentage}%
              </>
            )}
        </Card.Text>
      </>
    )
}

export default KycProcessInfo
