import React from 'react'
import { Meta } from '@storybook/react'
import PageHeader , { PageHeaderProps } from './page-header'
import Button from '@components/atoms/button'

export default {
    title: 'Molecule/PageHeader',
    component: PageHeader,
    argTypes: {},
} as Meta


export const Default =  (args: PageHeaderProps) => (
    <PageHeader {...args}>
        <PageHeader.Title>
            Members
        </PageHeader.Title>
        <PageHeader.Subtitle>
            Casey Fyfe
        </PageHeader.Subtitle>
    </PageHeader>
)

export const WidthButton =  (args: PageHeaderProps) => (
    <PageHeader {...args}>
        <div className="row align-items-center">
            <div className="col">
                <PageHeader.Title>
                    Members
                </PageHeader.Title>
                <PageHeader.Subtitle>
                    Casey Fyfe
                </PageHeader.Subtitle>
            </div>
            <div className="col-auto">
                <Button variant="primary">
                    Subscribe
                </Button>
            </div>
        </div>
    </PageHeader>
)
