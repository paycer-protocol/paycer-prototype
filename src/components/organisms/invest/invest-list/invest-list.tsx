import React, {useContext, useState} from 'react'
import {t} from '@lingui/macro'
import { useMediaQuery } from 'react-responsive'
import InvestListItem from '@components/organisms/invest/invest-list-item'
import InvestListItemHeader from '@components/organisms/invest/invest-list-item-header'
import InvestCard from '@components/organisms/invest/invest-card'
import InvestListSearch from './invest-list-search'
import { InvestListContext } from '../../../../context/invest-list-context'

const InvestList = () => {

    const {
        items
    } = useContext(InvestListContext)
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })

    const [listView, setListView] = useState<boolean>(true)
    const InvestItemComponent = (listView && !isTabletOrMobile) ? InvestListItem : InvestCard

    return (
        <>
            <div className="mb-5">
                <InvestListSearch />
            </div>

            {(!isTabletOrMobile &&
              <div className="d-flex mb-4 justify-content-end">
                <div className="form-check form-switch">
                  <input className="form-check-input me-3"
                         type="checkbox"
                         name="with-invest-card"
                         checked={listView}
                         onChange={(e) => {
                             setListView(e.currentTarget.checked)
                         }}
                  />
                  <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
                      {t`Toggle Layout`}
                  </label>
                </div>
              </div>
            )}

            {(!isTabletOrMobile &&
                <InvestListItemHeader />
            )}

            <div className="row">
                {items.map((data, key) => (
                    <div key={key} className={listView ? 'col-12' : 'col-md-4'}>
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
