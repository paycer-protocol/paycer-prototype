import React, { createContext, useContext, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { investmentStrategies } from '@config/investment/strategies';
import { StrategyType } from '../types/investment';
import { riskLabels } from '../locales';

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
};

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
  investType: 'deposit',
};

const InvestListContext = createContext<InvestListContextTypes>(
  contextDefaultValues,
);

export const useInvestList = () => useContext(InvestListContext);

const InvestListContextProvider = ({ children }) => {
  const [strategy, setStrategy] = useState<StrategyType | null>(null);
  const [investType, setInvestType] = useState<'deposit' | 'withdraw'>('deposit');
  const [showFormModal, setShowFormModal] = useState(true);
  const [isListView, setIsListView] = useState<boolean>(false);
  const [strategies, setStrategies] = useState<StrategyType[] | null>(investmentStrategies);
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 991.98px)' });

  const toggleListView = (isListView) => {
    setIsListView(isListView);
    sessionStorage.setItem('investListView', isListView.toString());
  };

  const handleSearch = (e) => {
    let keywords = e.target.value;

    if (keywords) {
      keywords = keywords.toLowerCase().split(' ');
      keywords = keywords.filter((f) => f !== '');

      const nextStrategys = investmentStrategies.filter((f) => keywords.some((k) => f.name.toLowerCase().includes(k.toLowerCase()))
<<<<<<< HEAD
        || keywords.some((k) => f.type.toLowerCase().includes(k.toLowerCase()))
        || keywords.some((k) => riskLabels[f.riskLevel].id.toLowerCase().includes(k.toLowerCase()))
        || keywords.some((k) => f.interest.interestRate + f.rewards.rewardRate >= parseInt(k.toLowerCase())));
=======
                || keywords.some((k) => f.type.toLowerCase().includes(k.toLowerCase()))
                || keywords.some((k) => riskLabels[f.riskLevel].id.toLowerCase().includes(k.toLowerCase()))
                || keywords.some((k) => f.interest.interestRate + f.rewards.rewardRate >= parseInt(k.toLowerCase())));
>>>>>>> 7453f9d (PNS-273 Add eslint and eslint config, apply)

      setStrategies(nextStrategys);
    } else {
      setStrategies(investmentStrategies);
    }
  };

  useEffect(() => {
    const listViewStorage = sessionStorage.getItem('investListView');
    if (listViewStorage) {
      setIsListView(listViewStorage !== 'false');
    } else {
      setIsListView(!isTabletOrMobile);
    }
  }, []);

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
        investType,
      }}
    >
      {children}
    </InvestListContext.Provider>
  );
};

export default InvestListContextProvider;
