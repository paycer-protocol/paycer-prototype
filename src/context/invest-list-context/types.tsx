export type InvestListContextTypes = {
    items: any;
    handleAutoSuggest: (keyword: string) => void;
    filterStrategy: () => void;
    resetFilters: () => void;
    keyword: string,
    activeFilter:  string
}
