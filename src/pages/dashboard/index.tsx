import PageHeader from '@components/molecules/page-header'
import DashCards from './components/dash-cards'
import Portfolio from './components/portfolio'

export default function Home() {
  return (
    <div className="container">
      <PageHeader>
        <PageHeader.Subtitle>Overview</PageHeader.Subtitle>
        <PageHeader.Title>Dashboard</PageHeader.Title>
      </PageHeader>
      <div className="container">
        <DashCards />
        <div className="row">
          <div className="col-12">
            <Portfolio />
          </div>
        </div>
      </div>
    </div>
  )
}

