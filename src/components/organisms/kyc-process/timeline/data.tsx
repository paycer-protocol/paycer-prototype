import * as Yup from 'yup'
import { t } from '@lingui/macro'
import { FormattedNumber } from 'react-intl'
import { TokenSaleKycType } from '../../../../types/token-sale-kyc'
import { tokenProvider } from '@providers/tokens'
import { CalendarCheck, CashCoin, FileText, GraphUp, Person } from '@styled-icons/bootstrap'

const TokenSaleKycSchema = Yup.object().shape({
  kycApproved: Yup.boolean().required(),
  saftApproved: Yup.boolean().required(),
  investmentReceived: Yup.number().optional(), // Todo: Needed?
  tokenAmount: Yup.number().required(),
  investSymbol: Yup.string().required(),
})

// P368 | Todo: Implement real text + states
const mapData = (data: TokenSaleKycType): object => {
  return {
    kycStatus: {
      title: t`KYC Status`,
      symbol: Person,
      state: data.kycApproved ? 'success' : 'warning',
      content: data.kycApproved ? t`Confirmed` : t`Pending`,
    },
    saftStatus: {
      title: t`SAFT Status`,
      symbol: FileText,
      state: data.saftApproved ? 'success' : 'warning',
      content: data.saftApproved ? t`Confirmed` : t`Sent and in Progress`,
    },
    /* */
    investmentReceived: {
      title: t`Investment received`,
      symbol: CashCoin, // CashStack | Wallet2
      state: data.investmentReceived ? 'success' : 'warning',
      content: data.investmentReceived ? t`Confirmed` : t`Pending`,
    },
    /* */
    pcrTokenAmount: {
      title: t`PCR Token amount`,
      symbol: GraphUp, // BarChart | BarChartFill | GraphUpArrow
      state: data.tokenAmount > 0 ? 'success' : 'warning',
      content: TokenValue(data.tokenAmount, tokenProvider[data.investSymbol].symbol),
    },
    /* */
    vestingPhase: {
      title: t`Vesting Phase`,
      symbol: CalendarCheck, // CalendarEvent | Calendar2 | Calendar2Check | Calendar2Event
      state: t`Confirmed`,
      content: t`12 months after TGE`,
    },
    /* */
  }
}

const TokenValue = (value: number = 0, symbol: string) => (
  <>
    <FormattedNumber value={value || 0} />
    &nbsp;{symbol}
  </>
)

export const getKycData = (data: TokenSaleKycType): object => {
  const isValid = TokenSaleKycSchema.validateSync(data)

  if (!isValid) {
    return {}
  }

  return mapData(data)
}
