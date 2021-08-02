import React from 'react'
import './page-header.styles.scss'

export interface PageHeaderProps {
    children?: any
}

const Subtitle = ({ children }) => (
    <h5 className="header-pretitle">
        {children}
    </h5>
)

const Title = ({ children }) => (
    <h1 className="header-title">
        {children}
    </h1>
)

const PageHeader = ({ children }: PageHeaderProps) => {
    return (
        <div className="header">
            <div className="header-body">
                {children}
            </div>
        </div>
    )
}

PageHeader.Title = Title
PageHeader.Subtitle = Subtitle

export default PageHeader
