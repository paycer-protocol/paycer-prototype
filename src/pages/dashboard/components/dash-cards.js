import DashCard from '@components/organisms/dashboard/dash-card'

export default function DashCards () {
  return (
    <div className="row">
      <div className="col-12 col-md-4 col-xl">
        <DashCard
          title="Total Balance"
          value="$24,500"
        />
      </div>
      <div className="col-12 col-md-4 col-xl">
        <DashCard
          title="Savings"
          value="$24,500"
        />
      </div>
      <div className="col-12 col-md-4 col-xl">
        <DashCard
          title="Risk"
          value="Moderat"
        />
      </div>
    </div>
  )
}
