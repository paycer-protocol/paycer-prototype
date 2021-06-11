import React from 'react'
import { Meta } from '@storybook/react'
import IconComponent , { IconProps } from './icon'
import * as BootstrapIconsSet from '@styled-icons/bootstrap'
import * as CryptoIconsSet from '@styled-icons/crypto'

export default {
    title: 'Atom/Icon',
    component: IconComponent,
    argTypes: {
        size: {
            control: 'number',
        },
        color: {
            control: 'color',
        },
        title: {
            control: 'text',
        },
    },
} as Meta

const buildIcons = (iconSet, props) => (
    <div className="row">
        {Object.keys(iconSet).map((key) => (
            <div className="col-2">
                <div className="m-4 d-flex align-items-center flex-column">
                    <IconComponent
                        key={key}
                        component={iconSet[key]}
                        className="mb-3"
                        {...props}
                    />
                    <small className="text-muted">
                        {iconSet[key].displayName}
                    </small>
                </div>
            </div>
        ))}
    </div>
)

const BootstrapTemplate: (args: IconProps) => JSX.Element = (args: IconProps) => (
    <div>
        <h3>Bootstrap Icons</h3>
        {buildIcons(BootstrapIconsSet, args)}
    </div>
)

const CryptoTemplate: (args: IconProps) => JSX.Element = (args: IconProps) => (
    <div>
        <h3>Crypto Icons</h3>
        {buildIcons(CryptoIconsSet, args)}
    </div>
)


export const Bootstrap = BootstrapTemplate.bind({})
Bootstrap.args = { size: 25, color: 'black' }

export const Crypto = CryptoTemplate.bind({})
Crypto.args = { size: 45, color: 'black' }



