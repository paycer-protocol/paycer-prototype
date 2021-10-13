import React from 'react'
import Icon from '@components/atoms/icon'

export interface TimelineActivityProps {
  children?: any
  iconComponent?: any
}

// Todo: Simplify child components?
// - Would make more sense for complex markup handling

const TimelineActivityContent = ({ children, ...props }: any) => {
  return (
    <>
      {children}
    </>
  )
}

const TimelineActivityTitle = ({ children, ...props }: any) => {
  return (
    <>
      {children}
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
      </div>
    </div>
  )
}

TimelineActivity.Content = TimelineActivityContent
TimelineActivity.Title = TimelineActivityTitle

export default TimelineActivity
