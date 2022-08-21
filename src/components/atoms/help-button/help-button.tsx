import React from 'react'
import { ChatFill } from '@styled-icons/bootstrap'
import Icon from '@components/atoms/icon'
import Button from './Styles'

const HelpButton = () => (
  <Button href="https://discord.com/invite/4hG5mG6pRW" target="_blank" className="bg-primary">
    <Icon component={ChatFill} size={26} />
  </Button>
)

export default HelpButton
