import React from 'react'
import Button from './Styles'
import { ChatFill } from '@styled-icons/bootstrap'
import Icon from '@components/atoms/icon'

const HelpButton = () => {
  return (
    <Button href="https://discord.com/invite/4hG5mG6pRW" target="_blank" className="bg-primary">
      <Icon component={ChatFill} size={26}/>
    </Button>
  )
}

export default HelpButton
