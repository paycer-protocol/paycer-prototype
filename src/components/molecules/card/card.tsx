import React from 'react'
import classnames from 'classnames'
import BaseCard, { CardProps as BaseCardProps } from 'react-bootstrap/Card'
import BaseCardImg, { CardImgProps as BaseCardImgProps } from 'react-bootstrap/CardImg'
import BaseCardColumns from 'react-bootstrap/CardColumns'
import BaseCardGroup from 'react-bootstrap/CardGroup'

export interface CardProps extends BaseCardProps {
  style?: object
  fill?: boolean
}
export interface CardImgProps extends BaseCardImgProps {
  src: string
  alt?: string
}

export interface CardColumnsProps {}
export interface CardDeckProps {}
export interface CardGroupProps {}

const Card = ({ fill = false, children, className, ...props }: CardProps) => (
  <BaseCard
    className={classnames({ 'card-fill': fill }, className)}
    {...props}
  >
    {children}
  </BaseCard>
)
export const CardImg = (props: CardImgProps) => <BaseCardImg {...props} />
export const CardColumns = (props: CardColumnsProps) => <BaseCardColumns {...props} />
export const CardGroup = (props: CardGroupProps) => <BaseCardGroup {...props} />

Card.Body = BaseCard.Body
Card.Title = BaseCard.Title
Card.Subtitle = BaseCard.Subtitle
Card.Link = BaseCard.Link
Card.Text = BaseCard.Text
Card.Header = BaseCard.Header
Card.Footer = BaseCard.Footer
Card.ImgOverlay = BaseCard.ImgOverlay
Card.Img = CardImg
Card.Columns = CardColumns
Card.Group = CardGroup

export default Card
