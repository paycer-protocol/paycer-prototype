import React, { createContext, useContext, useEffect, useState } from 'react'
import { StrategyType } from '..././../types/investment'
import { useMediaQuery } from "react-responsive";
import { riskLabels } from "../locales";
import useInvestmentStrategies from '@hooks/use-investment-strategies';

export type InvestListContextTypes = {
    setStrategy: React.Dispatch<React.SetStateAction<StrategyType>>,
    setShowFormModal: React.Dispatch<React.SetStateAction<boolean>>,
    setInvestType: React.Dispatch<React.SetStateAction<'deposit' | 'withdraw'>>,
    showFormModal: boolean,
    strategy: StrategyType,
    toggleListView: (isListView: boolean) => void,
    isListView: boolean,
    strategies: StrategyType[],
    handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
    investType: 'deposit' | 'withdraw'
}

const contextDefaultValues: InvestListContextTypes = {
    setShowFormModal: null,
    setStrategy: null,
    strategy: null,
    toggleListView: null,
    isListView: false,
    strategies: null,
    handleSearch: null,
    showFormModal: true,
    setInvestType: null,
    investType: 'deposit'
}

const InvestListContext = createContext<InvestListContextTypes>(
    contextDefaultValues
)

export const useInvestList = () => useContext(InvestListContext)

const InvestListContextProvider = ({ children }) => {
    const investmentStrategies = useInvestmentStrategies();
    const [strategy, setStrategy] = useState<StrategyType | null>(null)
    const [investType, setInvestType] = useState<'deposit' | 'withdraw'>('deposit')
    const [showFormModal, setShowFormModal] = useState(true)
    const [isListView, setIsListView] = useState<boolean>(false)
    const [strategies, setStrategies] = useState<StrategyType[] | undefined>(investmentStrategies)
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 991.98px)' })

    useEffect(() => {
        // Update local strategy cache when useInvestmentStrategies returns new info.
        setStrategies(investmentStrategies);
    }, [investmentStrategies]);

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
                setShowFormModal,
                setInvestType,
                investType
            }}
        >
            {children}
        </InvestListContext.Provider>
    )
}

export default InvestListContextProvider
