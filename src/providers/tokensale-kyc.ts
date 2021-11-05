// P368 | Todo - Decide if to use Provider -or- data type

export interface ITokensaleKycProvider {
  [name: string]: {
    state: number,
    info?: string
  }
}

export const tokensaleKycProvider: ITokensaleKycProvider = {
  status_kyc: {
    state: 0,
  },
  status_saft: {
    state: 0,
  },
  investment_received: {
    state: 0,
  },
  pcr_token_amount: {
    state: 0,
    info: ''
  },
  vesting_phase: {
    state: 0,
    info: ''
  },
}
