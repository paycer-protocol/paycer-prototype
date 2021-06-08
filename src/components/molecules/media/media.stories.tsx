import React from 'react'
import { Meta } from '@storybook/react'
import Media from './media'
import Image from '../../atoms/image'

export default {
    title: 'Molecule/Media',
    component: Media,
    argTypes: {},
} as Meta

const WithTextTemplate: (args) => JSX.Element = (args) => (
    <Media {...args}>
        <Media.Body>
            <h5>Media Heading</h5>
            <p>
                Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque
                ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at,
                tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla.
                Donec lacinia congue felis in faucibus.
            </p>
        </Media.Body>
    </Media>
)

const WithImageTemplate: (args) => JSX.Element = (args) => (
    <Media {...args}>
        <Image
            width={300}
            className="mr-3"
            src="https://images.unsplash.com/photo-1546640646-89b557854b23?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"/>
    </Media>
)

const WithImageTextTemplate: (args) => JSX.Element = (args) => (
    <Media {...args}>
        <Image
            width={100}
            className="mr-3"
            src="https://images.unsplash.com/photo-1546640646-89b557854b23?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"/>
        <Media.Body>
            <h5>Media Heading</h5>
            <p>
                Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque
                ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at,
                tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla.
                Donec lacinia congue felis in faucibus.
            </p>
        </Media.Body>
    </Media>
)


export const WithText = WithTextTemplate.bind({})
WithText.args = {}

export const WithImage = WithImageTemplate.bind({})
WithImage.args = {}

export const WithImageText = WithImageTextTemplate.bind({})
WithImageText.args = {}

