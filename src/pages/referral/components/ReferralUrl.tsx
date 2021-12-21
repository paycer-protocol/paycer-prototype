import React, { useEffect, useState } from 'react'
import { Trans } from '@lingui/macro'
import { InputGroup, FormControl } from 'react-bootstrap'
import Icon from '@components/atoms/icon'
import { Bookmark, BookmarkCheck } from '@styled-icons/bootstrap'
import useCopyClipboard from '@hooks/use-copy-clipboard'
import useWallet from '@hooks/use-wallet'
import api from '../../../api'


export default function ReferralUrl () {
  const [isCopied, setCopied] = useCopyClipboard()
  const [code, setCode] = useState()
  const wallet = useWallet()

  useEffect(() => {
    async function fetchReferralCode(walletAddress) {
      try {
        const response = await api.fetchReferralCode(walletAddress)
        setCode(response.data.code)
      } catch (e) {
        const response = await api.createReferralCode(walletAddress)
        setCode(response.data.code)
      }
    }

    if (wallet.isConnected && wallet.address) {
      fetchReferralCode(wallet.address)
    }
  }, [wallet.isConnected])

  return (
    <div className="mb-5">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h2 className="m-0"><Trans>Referral Program</Trans></h2>
        <small className="text-muted"><Trans>Earn up to 2.5% rewards for you and your friend on every transaction.</Trans></small>
      </div>
      <div className="mb-5">
        <InputGroup className="mb-3">
          <InputGroup.Text>Your Referral Url</InputGroup.Text>
          <FormControl
            value={code ? `https://paycer.io?r=${code}` : ''}
            aria-describedby="copy-btn"
          />
          <InputGroup.Text id="copy-btn" onClick={() => setCopied(code ? `https://paycer.io?r=${code}`: '')}>
            {isCopied ? (<Icon component={BookmarkCheck} size={22} />) : (<Icon component={Bookmark} size={22} />)}
          </InputGroup.Text>
        </InputGroup>
      </div>
    </div>
  )
}
