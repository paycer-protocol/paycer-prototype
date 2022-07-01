import { defineMessage } from '@lingui/macro'
import { RiskLevel } from '../types/investment'

export const riskLabels = {
  [RiskLevel.Low]: defineMessage({ message: 'Low' }),
  [RiskLevel.Medium]: defineMessage({ message: 'Medium' }),
  [RiskLevel.High]: defineMessage({ message: 'High' }),
}
