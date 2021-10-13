import React from 'react'
import Icon from '@components/atoms/icon'

export interface TimelineActivityProps {
  children?: any
  iconComponent?: any
}

const TimelineActivityContent = ({ children, ...props }:any) => {
  return (
    <>
      { children }
    </>
  )
}

const TimelineActivity = ({ children, ...props }: TimelineActivityProps) => {
  const { iconComponent } = props

  return (
    <div className="list-group-item">
      <div className="row align-items-center">
        <div className="col-auto">
          <div className="avatar avatar-sm">
            <div className="avatar-title fs-lg bg-primary-soft rounded-circle text-primary">
              <Icon component={iconComponent} size={18} />
            </div>
          </div>
        </div>
        {children}
        <div className="col ms-n2">
          <div className="d-flex justify-content-between">
            <h3 className="m-0 w-50">
            </h3>
            <div className="card-text small">
              <span className="text-success">●</span>
              <span className="">Online</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

TimelineActivity.Content = TimelineActivityContent

export default TimelineActivity
