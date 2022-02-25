import React from 'react'
import * as Yup from 'yup'
import Form from '@components/atoms/form/form'
import FilterBar from "@components/organisms/info-dashboard/filter-bar";
import Staking from "@components/organisms/info-dashboard/staking";
import {ChainId} from "@usedapp/core";

export type InfoDashboardFormType = {
    activeFilters: Array<number>
}

export default function SwapForm() {

    const initialValues: InfoDashboardFormType = {
        activeFilters: [0]
    }

    const validationSchema = Yup.object().shape({

    })

    const handleSubmit = (values: InfoDashboardFormType) => {
        console.log(values)
    }

    return (
        <Form
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
        >
            {({values}) => {

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


