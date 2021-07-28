export type InvestListContextTypes = {
    items: any;
    handleAutoSuggest: (keyword: string) => void;
    filterStrategy: () => void;
    filterInvested: () => void;
    resetFilters: () => void;
    keyword: string,
    activeFilter:  string
}