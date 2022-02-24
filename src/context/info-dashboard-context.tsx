import React, { createContext, useContext, useEffect, useState } from 'react'
import { ChainId } from '@usedapp/core'

export type InfoDashboardContextType = {
    activeFilters: Array<number>
    updateFilters: (chainId: ChainId, checked: boolean) => void
}

const contextDefaultValues: InfoDashboardContextType = {
    activeFilters: [],
    updateFilters: null
}

const InfoDashboardContext = createContext<InfoDashboardContextType>(
    contextDefaultValues
)

export const useInfoDashboard = () => useContext(InfoDashboardContext)

const InfoDashboardContextProvider = ({ children }) => {
    const [activeFilters, setActiveFilters] = useState<Array<number>>([0])

    const updateFilters = (chainId: number, checked: boolean) => {
        let filters
        if (checked) {
            if (chainId !== 0) {
                filters = activeFilters.filter(f => f !== 0)
            } else {
                filters = []
            }
            filters.push(chainId)
        } else {
            filters = activeFilters.filter(f => f !== chainId)
        }
        setActiveFilters([...filters])
    }

    return (
        <InfoDashboardContext.Provider
            value={{
                updateFilters,
                activeFilters,
            }}
        >
            {children}
        </InfoDashboardContext.Provider>
    )
}

export default InfoDashboardContextProvider
