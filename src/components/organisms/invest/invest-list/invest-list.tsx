import React, {useContext, useState} from 'react'
import {t} from '@lingui/macro'
import InvestListItem from '@components/organisms/invest/invest-list-item'
import InvestListItemHeader from '@components/organisms/invest/invest-list-item-header'
import InvestCard from '@components/organisms/invest/invest-card'
import InvestListSearch from './invest-list-search'
import { InvestListContext } from '../../../../context/invest-list-context'

const InvestList = () => {

    const {
        items
    } = useContext(InvestListContext);

    const [withInvestCard, setWithInvestCard] = useState<boolean>(false)
    const InvestItemComponent = withInvestCard ? InvestCard : InvestListItem

    return (
        <>

        <div className="d-flex mb-4 justify-content-end">
            <div className="form-check form-switch">
                <input className="form-check-input"
                       type="checkbox"
                       name="with-invest-card"
                       checked={withInvestCard}
                       onChange={(e) => {
                           setWithInvestCard(e.currentTarget.checked)
                       }}
                />
                <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
                    {withInvestCard ? t`Card Layout` : t`List Layout`}
                </label>
            </div>
        </div>

        <InvestListSearch />

        {(!withInvestCard &&
            <InvestListItemHeader />
        )}

        <div className="row">
            {items.map((data, key) => (
                <div key={key} className={withInvestCard ? 'col-md-4' : 'col-12'}>
                    <InvestItemComponent
                        { ...data }
                    />
                </div>
            ))}
        </div>
        </>
    )
}

export default InvestList
