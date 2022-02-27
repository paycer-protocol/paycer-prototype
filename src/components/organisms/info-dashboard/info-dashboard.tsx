import React from 'react'
import Form from '@components/atoms/form/form'
import FilterBar from "@components/organisms/info-dashboard/filter-bar";
import Staking from "@components/organisms/info-dashboard/staking";

export type InfoDashboardFormType = {
    activeFilters: Array<number>
}

export default function SwapForm() {

    const initialValues: InfoDashboardFormType = {
        activeFilters: [0]
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
                               <Staking />
                           </div>
                       </div>
                   </>
                )
            }}
        </Form>
    )
}


