import PageHeader from '@components/molecules/page-header'
import DashCards from './components/dash-cards'
import Portfolio from './components/portfolio'
import Rewards from './components/rewards'

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
        <div className="row">
          <div className="col-12 col-md-12  col-xl">
            <Rewards />
          </div>
        </div>
      </div>
    </div>
  )
}

