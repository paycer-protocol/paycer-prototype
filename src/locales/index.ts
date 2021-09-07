import { RiskLevel } from '../types/investment'
import { defineMessage } from '@lingui/macro'

export const riskLabels = {
  [RiskLevel.Low]: defineMessage({ message: 'Low' }),
  [RiskLevel.Medium]: defineMessage({ message: 'Medium' }),
  [RiskLevel.High]: defineMessage({ message: 'High' }),
}
