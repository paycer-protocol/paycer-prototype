import React, {useState} from 'react'
import {t, Trans} from '@lingui/macro'
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

export type TokenOverviewListType = Array<{
    platform: string
    platform_img: string
    desc: string
    type: string
    chain: string
    infoLink: string
    link: string
}>

export interface TokenOverviewListProps {
    items?: TokenOverviewListType
}

export default function TokenOverviewList(props: TokenOverviewListProps) {
    const { items } = props
    const thClass = 'bg-card-blue border border-secondary-dark'
    const tdClass = 'bg-dark border border-purple-dark'
    const [tokenOverviewListItems, setTokenOverviewListItems] = useState<TokenOverviewListType | null>(items)

    const handleSearch = (e) => {
        let keywords = e.target.value

        if (keywords) {
            keywords = keywords.toLowerCase().split(' ')
            keywords = keywords.filter(f => f !== '')

            const nextStrategys = items.filter(f =>
                keywords.some(k => f.platform.toLowerCase().includes(k.toLowerCase()))
                || keywords.some(k => f.desc.toLowerCase().includes(k.toLowerCase()))
                || keywords.some(k => f.type.toLowerCase().includes(k.toLowerCase()))
                || keywords.some(k => f.chain.toLowerCase().includes(k.toLowerCase()))
            )

            setTokenOverviewListItems(nextStrategys)
        } else {
            setTokenOverviewListItems(items)
        }
    }

    return (
        <>
            <div className="d-flex justify-content-end">
                <div className="input-group input-group-flush input-group-merge mb-5" style={{width: 'auto'}}>
                    <span className="bg-transparent border form-control-rounded border-right-0 ps-3 ps-md-4 pe-md-3 py-3 cursor-pointer">
                        <Icon component={Search} size={18} />
                    </span>
                    <StyledInput
                        className=" bg-transparent border form-control-rounded border-left-0 ps-3 pe-4 py-3 text-muted"
                        type="search"
                        placeholder="Search"
                        onChange={handleSearch}
                    />
                </div>
            </div>

            <div className="table-responsive mb-0 border-0">
                <table className="table table-sm table-nowrap card-table" style={{background: 'rgb(14 22 40 / 50%)'}}>
                    <thead className="position-relative" style={{top: '-10px'}}>
                        <tr>
                            <th className={`${thClass} card-border-top-left-radius card-border-bottom-left-radius border-right-0`}>
                                <span className="text-muted">
                                    <Trans>Platform</Trans>
                                </span>
                            </th>
                            <th className={`${thClass} border-left-0 border-right-0`}>
                                <span className="text-muted">
                                    <Trans>Description</Trans>
                                </span>
                            </th>
                            <th className={`${thClass} border-left-0 border-right-0`}>
                                <span className="text-muted">
                                    <Trans>Type</Trans>
                                </span>
                            </th>
                            <th className={`${thClass} border-left-0 border-right-0`}>
                                <span className="text-muted">
                                    <Trans>Chain</Trans>
                                </span>
                            </th>
                            <th className={`${thClass} card-border-top-right-radius card-border-bottom-right-radius ps-0 pe-0 border-left-0`} />
                        </tr>
                    </thead>
                    <tbody className="list position-relative" style={{top: '-10px'}}>
                        {tokenOverviewListItems.length && tokenOverviewListItems.map((item, key) => {
                            return (
                                <tr key={key}>
                                    <td className={`${tdClass} card-border-top-left-radius card-border-bottom-left-radius border-right-0`}>
                                        <img width="140" src={`/assets/token-overview/${item.platform_img}`} />
                                    </td>
                                    <td className={`${tdClass} border-left-0 border-right-0`}>
                                        {item.desc}
                                    </td>
                                    <td className={`${tdClass} border-left-0 border-right-0`}>
                                        {item.type}
                                    </td>
                                    <td className={`${tdClass} border-left-0 border-right-0`}>
                                        <img width="80" src={`/assets/token-overview/${item.platform_img}`} />
                                    </td>
                                    <td className={`${tdClass} card-border-top-right-radius card-border-bottom-right-radius ps-0 pe-0 border-left-0 pt-0 pb-0`}>
                                        <div className="d-flex justify-content-end">
                                            <a className="btn btn-light px-5 me-4" href={item.infoLink}>
                                                {t`Info`}
                                            </a>
                                            <GradientButton href={item.link} className="me-4">
                                                {t`Visit`}
                                            </GradientButton>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>

    )
}
