import React from 'react'
import './page-header.styles.scss'

export interface PageHeaderProps {
    children?: any
}

const Subtitle = ({ children }) => (
    <h6 className="page-header-subtitle">
        {children}
    </h6>
)

const Title = ({ children }) => (
    <h1 className="page-header-title">
        {children}
    </h1>
)

const PageHeader = ({ children }: PageHeaderProps) => {
    return (
        <div className="page-header">
            <div className="page-header-body">
                {children}
            </div>
        </div>
    )
}

PageHeader.Title = Title
PageHeader.Subtitle = Subtitle

export default PageHeader
