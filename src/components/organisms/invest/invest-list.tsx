import React from 'react'
import Card from '@components/molecules/card'
import { investmentStrategies } from '@config/investment/strategies'
import Form from '@components/atoms/form/form'
import SearchForm from './search-form'
import Icon from "@components/atoms/icon";
import { Grid, List } from '@styled-icons/bootstrap'
import ListTable from './invest-table'
import InvestCards from './invest-cards'
import { useInvestList } from '@context/invest-list-context'

export default function InvestList() {

  const {
      isListView,
      setListView,
      unSetListView
  } = useInvestList()

  const initialValues = {
    strategies: investmentStrategies,
    search: ''
  }

  const handleSubmit = () => {}

  // @ts-ignore
  return (
      <>
      <Form
        initialValues={initialValues}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {() => (
          <>
            <div className="d-flex justify-content-end mb-5">
              <div className="me-4">
                <SearchForm />
              </div>
              <div className="d-flex align-items-center">
                <a className={isListView ? 'text-primary me-3' : 'text-light me-3'}
                    onClick={unSetListView}>
                  <Icon component={Grid} size={20} />
                </a>
                <a className={!isListView ? 'text-primary' : 'text-light'}
                    onClick={setListView}>
                  <Icon component={List} size={22} />
                </a>
              </div>
            </div>
            {isListView ? <Card><ListTable /></Card> : null}
            {!isListView ? <InvestCards /> : null}
          </>
        )}
      </Form>
      </>
  )
}
