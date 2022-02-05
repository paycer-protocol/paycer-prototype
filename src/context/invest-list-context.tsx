import React, {createContext, useContext, useEffect, useState} from 'react'
import { StrategyType } from '..././../types/investment'
import {useMediaQuery} from "react-responsive";

export type InvestListContextTypes = {
    setShowInvestForm: React.Dispatch<React.SetStateAction<StrategyType>>,
    showInvestForm: StrategyType,
    setListView: () => void,
    unSetListView: () => void,
    isListView: boolean,
}

const contextDefaultValues: InvestListContextTypes = {
    setShowInvestForm: null,
    showInvestForm: null,
    setListView: null,
    unSetListView: null,
    isListView: false
}

const InvestListContext = createContext<InvestListContextTypes>(
    contextDefaultValues
)

export const useInvestList = () => useContext(InvestListContext)

const InvestListContextProvider = ({ children }) => {
    const [showInvestForm, setShowInvestForm] = useState<StrategyType | null>(null)
    const [isListView, setIsListView] = useState<boolean>(false)
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 991.98px)' })


    const setListView = () => {
        setIsListView(true)
        sessionStorage.setItem('investListView', 'true');
    }

    const unSetListView = () => {
        setIsListView(false)
        sessionStorage.setItem('investListView', 'false');
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
                showInvestForm,
                setShowInvestForm,
                isListView,
                setListView,
                unSetListView
            }}
        >
            {children}
        </InvestListContext.Provider>
    )
}

export default InvestListContextProvider
