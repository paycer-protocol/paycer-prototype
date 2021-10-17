import React from 'react'
import Icon from '@components/atoms/icon'
import * as Styles from './styles'

export interface TimelineActivityProps {
  children?: any
  iconComponent?: any
  title?: string,
  isIndendet?: boolean
  isIndendetOpener?: boolean
  isActive?: boolean
}

const Content = ({ children }) => (
    <div className="card-text small">
      {children}
    </div>
)

const TimelineActivity = ({ children, ...props }: TimelineActivityProps) => {
  const { iconComponent, title } = props

  return (
    <Styles.StyledListGroupItem className="list-group-item" isIndendet={props.isIndendet} isIndendetOpener={props.isIndendetOpener} isActive={props.isActive}>
      <div className="row align-items-center">
        <div className="col-auto">
          <div className="avatar avatar-sm">
            <Styles.StyledTimeline isActive={props.isActive} className="avatar-title fs-lg rounded-circle text-primary">
              <Icon component={iconComponent} size={18} />
            </Styles.StyledTimeline>
          </div>
        </div>
        <div className="col ms-n2">
          <div className="d-flex flex-column flex-md-row justify-content-left">
            <h3 className="text-light text-nowrap mb-1 w-50">
              {title}
            </h3>
            {children}
          </div>
        </div>
      </div>
    </Styles.StyledListGroupItem>
  )
}

TimelineActivity.Content = Content

export default TimelineActivity
