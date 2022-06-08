import React from 'react'
import { t } from '@lingui/macro'
import InvestItem from './invest-item'
import { useInvestList } from "@context/invest-list-context";

export default function InvestList() {
    const { strategies } = useInvestList()
    const thClass = 'bg-card-blue border border-secondary-dark'

    return (
        <div className="table-responsive mb-0 border-0">
            <table className="table table-sm table-nowrap card-table" style={{ background: 'rgb(14 22 40 / 50%)' }}>
                <thead className="position-relative" style={{ top: '-10px' }}>
                    <tr>
                        <th className={`${thClass} card-border-top-left-radius card-border-bottom-left-radius border-right-0`}>
                            <span className="text-muted">
                                {t`POOL`}
                            </span>
                        </th>
                        <th className={`${thClass} border-left-0 border-right-0`}>
                            <span className="text-muted">
                                {t`Risk Level`}
                            </span>
                        </th>
                        <th className={`${thClass} border-left-0 border-right-0`}>
                            <span className="text-muted">
                                {t`Rewards`}
                            </span>
                        </th>
                        <th className={`${thClass} border-left-0 border-right-0`}>
                            <span className="text-muted">
                                {t`APR`}
                            </span>
                        </th>
                        <th className={`${thClass} border-left-0 border-right-0`}>
                            <span className="text-muted">
                                {t`Total Volume`}
                            </span>
                        </th>
                        <th className={`${thClass} card-border-top-right-radius card-border-bottom-right-radius ps-0 pe-0 border-left-0`} />
                    </tr>
                </thead>

                <tbody className="list position-relative" style={{ top: '-10px' }}>
                    {strategies?.map((strategy, key) => (
                        <InvestItem
                            key={`invest${key}`}
                            {...strategy}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    )
}
