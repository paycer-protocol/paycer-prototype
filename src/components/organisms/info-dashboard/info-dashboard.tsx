import React from 'react'
import Staking from './staking'
import FilterBar from './filter-bar'
import {t} from '@lingui/macro'

const InfoDashboard = () => {



    return (

        <>
            <FilterBar />
            <div className="row">
                <div className="col-9">
                    <Staking />
                </div>
            </div>
        </>

    )
}

export default InfoDashboard
