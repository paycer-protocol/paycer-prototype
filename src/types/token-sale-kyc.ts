import * as Yup from 'yup'

// P368 | Todo: Complete - Match with real API

export interface TokenSaleKycType {
  kycApproved: boolean,
  saftApproved: boolean,
  investmentReceived: number,
  tokenAmount: number,
  investSymbol: string, // enum?
}

export const TokenSaleKycSchema = Yup.object().shape({
  kycApproved: Yup.boolean().required(),
  saftApproved: Yup.boolean().required(),
  investmentReceived: Yup.number().optional(), // Todo: Needed?
  tokenAmount: Yup.number().required(),
  investSymbol: Yup.string().required(),
})

export default {}
