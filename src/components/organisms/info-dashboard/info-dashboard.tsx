import React from 'react'
import Form from '@components/atoms/form/form'
import api from '../../../api'
import FilterBar from '@components/organisms/info-dashboard/filter-bar'
import Staking from '@components/organisms/info-dashboard/staking'
import options from '@components/organisms/chart/bar-chart/options'

import { t } from '@lingui/macro'

export type InfoDashboardFormType = {
    activeFilters: Array<number>
    colors: Array<string>
}

export default function SwapForm() {

    const initialValues: InfoDashboardFormType = {
        activeFilters: [0],
        colors: ['#FFFFFF']
    }

    return (
        <Form
            initialValues={initialValues}
            onSubmit={() => {}}
            enableReinitialize
        >
            {() => {
                return (
                   <>
                       <div className="mb-5">
                           <FilterBar />
                       </div>
                       <div className="row">
                           <div className="col-9">
                               <Staking
                                    fetchSeries={api.fetchStakingSeries}
                                    headline={t`Staking TVL`}
                               />
                           </div>
                           <div className="col-3">
                               <Staking
                                   fetchSeries={api.fetchVestingSeries}
                                   headline={t`Vesting`}
                                   isSmall
                               />
                           </div>
                       </div>
                       <div className="row">
                           <div className="col-9">

                           </div>
                           <div className="col-3">

                           </div>
                       </div>
                   </>
                )
            }}
        </Form>
    )
}


