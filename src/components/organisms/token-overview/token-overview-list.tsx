import React, { useState } from 'react'
import { t, Trans } from '@lingui/macro'
import styled from 'styled-components'
import Icon from '@components/atoms/icon'
import { Search } from '@styled-icons/bootstrap'
import GradientButton from '@components/atoms/button/gradient-button'

const StyledInput = styled.input`
    @media screen and (max-width: 350px) {
      width: 140px;
    }    @media screen and (max-width: 295px) {
      width: 120px;
    }
`

export interface TokenOverviewListProps {
  items: Array<{
    platform: string
    platform_img: string
    desc: string
    type: string
    chain_img: string
    chain: string
    infoLink: string
    link: string
  }>
}

export default function TokenOverviewList(props: TokenOverviewListProps) {
  const { items } = props
  const thClass = 'bg-card-blue border border-secondary-dark'
  const tdClass = 'bg-dark border border-purple-dark'
  const [tokenOverviewListItems, setTokenOverviewListItems] = useState<any>(items)

  return (
    <div className="table-responsive mb-0 border-0">
      <table className="table table-sm table-nowrap card-table" style={{ background: 'rgb(14 22 40 / 50%)' }}>
        <tbody className="list position-relative" style={{ top: '-10px' }}>
          {tokenOverviewListItems.length && tokenOverviewListItems.map((item, key) => (
            <tr key={key}>
              <td className={`${tdClass} card-border-top-left-radius card-border-bottom-left-radius border-right-0`}>
                <img height="22" src={`/assets/token-overview/${item.platform_img}`} />
              </td>
              <td className={`${tdClass} border-left-0 border-right-0`}>
                {item.desc}
              </td>
              <td className={`${tdClass} border-left-0 border-right-0`}>
                {item.type}
              </td>
              <td className={`${tdClass} border-left-0 border-right-0 ps-5`}>
                {item.chain_img !== '' ? <img width="20" src={`/assets/token-overview/${item.chain_img}`} /> : <span className="ps-2">-</span>}
              </td>
              <td className={`${tdClass} card-border-top-right-radius card-border-bottom-right-radius ps-0 pe-0 border-left-0 pt-0 pb-0`}>
                <div className="d-flex justify-content-end">
                  <a className="btn btn-light px-5 me-4" target="_blank" href={item.infoLink} rel="noreferrer">
                    {t`Info`}
                  </a>
                  <GradientButton target="_blank" href={item.link} className="me-4">
                    {t`Visit`}
                  </GradientButton>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
