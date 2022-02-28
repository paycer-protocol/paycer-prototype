import React from 'react'
import Form from '@components/atoms/form/form'
import FilterBar from '@components/organisms/info-dashboard/filter-bar'
import ChartList from '@components/organisms/info-dashboard/chart-list'

export type InfoDashboardFormType = {
    activeFilters: Array<number>
}

const InfoDashboard = () => {

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
                       <ChartList />
                   </>
                )
            }}
        </Form>
    )
}


export default InfoDashboard