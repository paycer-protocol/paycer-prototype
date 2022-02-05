import React from 'react'
import Icon from '@components/atoms/icon'
import { Search } from '@styled-icons/bootstrap'
import {useInvestList} from "@context/invest-list-context";

export default function SearchForm() {

    const {
        handleSearch
    } = useInvestList()

  return (
    <div className="input-group input-group-flush input-group-merge">
        <span className="bg-transparent border form-control-rounded border-right-0 ps-4 pe-3 py-3 cursor-pointer">
            <Icon component={Search} size={18} />
        </span>
        <input
            className=" bg-transparent border form-control-rounded border-left-0 ps-3 pe-4 py-3 text-muted"
            type="search"
            placeholder="Search"
            onChange={handleSearch}
        />
    </div>
  )
}
