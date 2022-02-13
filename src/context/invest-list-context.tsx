import React, { createContext, useContext, useEffect, useState } from 'react'
import { StrategyType } from '..././../types/investment'
import { useMediaQuery } from "react-responsive";
import { investmentStrategies } from "@config/investment/strategies";
import {riskLabels} from "../locales";

export type InvestListContextTypes = {
    setStrategy: React.Dispatch<React.SetStateAction<StrategyType>>,
    setShowFormModal: React.Dispatch<React.SetStateAction<boolean>>,
    showFormModal: boolean,
    strategy: StrategyType,
    toggleListView: (isListView: boolean) => void,
    isListView: boolean,
    strategies: StrategyType[],
    handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const contextDefaultValues: InvestListContextTypes = {
    setShowFormModal: null,
    setStrategy: null,
    strategy: null,
    toggleListView: null,
    isListView: false,
    strategies: null,
    handleSearch: null,
    showFormModal: true
}

const InvestListContext = createContext<InvestListContextTypes>(
    contextDefaultValues
)

export const useInvestList = () => useContext(InvestListContext)

const InvestListContextProvider = ({ children }) => {
    const [strategy, setStrategy] = useState<StrategyType | null>(null)
    const [showFormModal, setShowFormModal] = useState(true)
    const [isListView, setIsListView] = useState<boolean>(false)
    const [strategies, setStrategies] = useState<StrategyType[] | null>(investmentStrategies)
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 991.98px)' })

    const toggleListView = (isListView) => {
        setIsListView(isListView)
        sessionStorage.setItem('investListView', isListView.toString());
    }

    const handleSearch = (e) => {
        let keywords = e.target.value

        if (keywords) {
            keywords = keywords.toLowerCase().split(' ')
            keywords = keywords.filter(f => f !== '')

            const nextStrategys = investmentStrategies.filter(f =>
                keywords.some(k => f.name.toLowerCase().includes(k.toLowerCase()))
                || keywords.some(k => f.type.toLowerCase().includes(k.toLowerCase()))
                || keywords.some(k => riskLabels[f.riskLevel].id.toLowerCase().includes(k.toLowerCase()))
                || keywords.some(k => f.interest.interestRate + f.rewards.rewardRate >= parseInt(k.toLowerCase()))
            )

            setStrategies(nextStrategys)
        } else {
            setStrategies(investmentStrategies)
        }
    }

    useEffect(() => {
        const listViewStorage = sessionStorage.getItem('investListView')
        if (listViewStorage) {
            setIsListView(listViewStorage !== 'false')
        } else {
            setIsListView(!isTabletOrMobile)
        }
    }, [])

    return (
        <InvestListContext.Provider
            value={{
                strategy,
                setStrategy,
                isListView,
                toggleListView,
                strategies,
                handleSearch,
                showFormModal,
                setShowFormModal
            }}
        >
            {children}
        </InvestListContext.Provider>
    )
}

export default InvestListContextProvider
