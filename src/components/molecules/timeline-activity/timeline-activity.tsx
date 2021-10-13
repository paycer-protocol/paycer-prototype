import React from 'react'
import Icon from '@components/atoms/icon'

export interface TimelineActivityProps {
  children?: any
  iconComponent?: any
  title?: string
}

const Content = ({ children }) => (
    <div className="card-text small">
      {children}
    </div>
)

const TimelineActivity = ({ children, ...props }: TimelineActivityProps) => {
  const { iconComponent, title } = props

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
        <div className="col ms-n2">
          <div className="d-flex justify-content-left">
            <h3 className="m-0 w-50">
              {title}
            </h3>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

TimelineActivity.Content = Content

export default TimelineActivity
