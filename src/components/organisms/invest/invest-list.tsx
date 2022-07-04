import React from 'react'
import Icon from '@components/atoms/icon'
import { Grid, List } from '@styled-icons/bootstrap'
import { useInvestList } from '@context/invest-list-context'
import SearchForm from './search-form'
import InvestModal from './invest-modal'
import ListTable from './invest-table'
import InvestCards from './invest-cards'

export default function InvestList() {
  const { isListView, toggleListView } = useInvestList()

  return (
    <div>
      <div className="d-flex flex-column flex-md-row flex-column-reverse justify-content-md-end justify-content-between mb-4 mb-md-5">
        <div className="me-md-4">
          <SearchForm />
        </div>
        <div className="d-flex align-items-center mb-3 mb-md-0  justify-content-end justify-content-md-start">
          <a
            className={isListView ? 'text-primary me-3' : 'text-light me-3'}
            onClick={() => toggleListView(false)}
          >
            <Icon component={Grid} size={20} />
          </a>
          <a
            className={!isListView ? 'text-primary' : 'text-light'}
            onClick={() => toggleListView(true)}
          >
            <Icon component={List} size={22} />
          </a>
        </div>
      </div>
      {isListView ? <ListTable /> : null}
      {!isListView ? <InvestCards /> : null}
      <InvestModal />
    </div>
  )
}
