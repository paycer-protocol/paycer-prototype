import { NextApiRequest, NextApiResponse } from 'next'
import whitelist from './whitelist.json'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const walletAddress = req.query.walletAddress as string
  const entry = whitelist[walletAddress]
  if (entry === undefined) {
    res.status(400).json({ status: 'notWhitelisted' })
  } else {
    res.status(200).json({ status: 'whitelisted', data: entry })
  }
}
