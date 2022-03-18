import React from 'react'
import Form from '@components/atoms/form/form'
import FilterBar from '@components/organisms/analytics-dashboard/filter-bar'
import ChartList from '@components/organisms/analytics-dashboard/chart-list'
import { InfoDashboardFormType } from './types'

const AnalyticsDashboard = () => {

    const initialValues: InfoDashboardFormType = {
        selectedChains: [0]
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
                       {/*<div className="mb-5">*/}
                       {/*    <FilterBar />*/}
                       {/*</div>*/}
                       <ChartList />
                   </>
                )
            }}
        </Form>
    )
}

export default AnalyticsDashboard
