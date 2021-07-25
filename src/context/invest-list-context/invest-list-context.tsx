import React, {createContext, useState } from "react";
import { InvestListContextTypes } from "./types";
import { investmentStrategies } from '@config/investment/strategies'

const contextDefaultValues: InvestListContextTypes = {
    items: [],
    handleAutoSuggest: () => {},
    filterStrategy: () => {},
    filterInvested: () => {},
    resetFilters: () => {},
    keyword: '',
    activeFilter: ''
}

export const InvestListContext = createContext<InvestListContextTypes>(
    contextDefaultValues
)

const InvestListContextProvider = ({ children }) => {
    const [filteredItems, setFilteredItems] = useState<any[]>([]);
    const [keyword, setKeyword] = useState<string>(contextDefaultValues.keyword);
    const [activeFilter, setActiveFilter] = useState<string>('all');

    const handleAutoSuggest = (keyword) => {
        setActiveFilter(null)
        setKeyword(keyword)

        if (keyword === '') {
            setActiveFilter('all')
            return false
        }

        let keywords = keyword.toLowerCase().split(' ')

        // ignore white spaces
        if (keyword !== '') {
            keywords = keywords.filter(f => f !== '')
        }

        const filterResult = investmentStrategies.filter(f => keywords.some(k => f.strategyName.toLowerCase().includes(k.toLowerCase()))
            || keywords.some(k => f.strategyType.toLowerCase().includes(k.toLowerCase()))
            || keywords.some(k => f.interestRate + f.rewardRate >= parseInt(k.toLowerCase()))
            || keywords.some(k => f.assets.some(a => a.name.toLowerCase().includes(k.toLowerCase())))
        )

        setFilteredItems(filterResult)
    }

    const filterStrategy = () => {
        setKeyword('')
        setActiveFilter('strategy')
        setFilteredItems(investmentStrategies.filter(f => f.strategyType !== 'paycer'))
    }

    const filterInvested = () => {
        setKeyword('')
        setActiveFilter('invested')
        setFilteredItems(investmentStrategies.filter(f => f.invested > 0))
    }

    const resetFilters = () => {
        setKeyword('')
        setActiveFilter('all')
        setFilteredItems([])
    }

    const items = activeFilter ? (filteredItems.length ? filteredItems : investmentStrategies) : keyword !== '' ? filteredItems : investmentStrategies

    return (
        <InvestListContext.Provider
            value={{
                handleAutoSuggest,
                filterStrategy,
                filterInvested,
                resetFilters,
                keyword,
                items,
                activeFilter
            }}
        >
            {children}
        </InvestListContext.Provider>
    )
}

export default InvestListContextProvider