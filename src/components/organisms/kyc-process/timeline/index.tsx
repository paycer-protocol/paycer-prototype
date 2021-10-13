import React from 'react'
import { Person } from '@styled-icons/bootstrap'
import Icon from '@components/atoms/icon'
import Card from '@components/molecules/card'
import TimelineActivity from '@components/molecules/timeline-activity'

const KycProcessTimeline = () => {
    return (
      <>
        <Card className="rounded-0 border-0">
          <Card.Body>
            <div className="list-group list-group-flush list-group-activity">
              <TimelineActivity iconComponent={Person}>
                <TimelineActivity.Content>
                  Text, Icon
                </TimelineActivity.Content>
              </TimelineActivity>


              <div className="list-group-item">
                <div className="row align-items-center">
                  <div className="col-auto">
                    <div className="avatar avatar-sm">
                      <div className="avatar-title fs-lg bg-primary-soft rounded-circle text-primary">
                        <i className="fe fe-mail"></i>
                      </div>
                    </div>
                  </div>
                  <div className="col ms-n2">
                    <div className="d-flex justify-content-between">
                      <h3 className="m-0 w-50">
                        Title
                      </h3>
                      <div className="card-text small">
                        <span className="text-success">●</span>
                        <span className="">Online</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


              <div className="list-group-item">
                <div className="row align-items-center">
                  <div className="col-auto">
                    <div className="avatar avatar-sm">
                      <div className="avatar-title fs-lg bg-primary-soft rounded-circle text-primary">
                        <i className="fe fe-mail"></i>
                        <Icon component={Person} size={18} />
                      </div>
                    </div>
                  </div>
                  <div className="col ms-n2">
                    <div className="d-flex justify-content-between">
                      <h3 className="m-0 w-50">
                        Title
                      </h3>
                      <div className="card-text small">
                        <span className="text-success">●</span>
                        <span className="">Online</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </>
    )
}

export default KycProcessTimeline
