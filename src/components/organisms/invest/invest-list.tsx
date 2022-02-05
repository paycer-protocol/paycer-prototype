import React from 'react'
import SearchForm from './search-form'
import Icon from "@components/atoms/icon";
import { Grid, List } from '@styled-icons/bootstrap'
import ListTable from './invest-table'
import InvestCards from './invest-cards'
import { useInvestList } from '@context/invest-list-context'

export default function InvestList() {

  const {
      isListView,
      toggleListView
  } = useInvestList()

  // @ts-ignore
  return (
      <>
          <div className="d-flex justify-content-end mb-5">
              <div className="me-4">
                  <SearchForm />
              </div>
              <div className="d-flex align-items-center">
                  <a className={isListView ? 'text-primary me-3' : 'text-light me-3'}
                     onClick={() => toggleListView(false)}>
                      <Icon component={Grid} size={20} />
                  </a>
                  <a className={!isListView ? 'text-primary' : 'text-light'}
                     onClick={() => toggleListView(true)}>
                      <Icon component={List} size={22} />
                  </a>
              </div>
          </div>
          {isListView ? <ListTable /> : null}
          {!isListView ? <InvestCards /> : null}
      </>
  )
}
