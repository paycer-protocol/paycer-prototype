import React from 'react'
import classnames from 'classnames'
import Image from '../image/image'
import './avatar.styles.scss'


export interface AvatarProps {
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
    isOnline?: boolean;
    isOffline?: boolean;
    src: string;
    alt?: string;
    className?: string;
}


const Avatar: React.FC<AvatarProps> = ({ size = 'md', src, alt, isOnline, isOffline, className }: AvatarProps) => {
    const classes = classnames(`avatar avatar-${size}`, {
        'avatar-online': isOnline,
        'avatar-offline': isOffline,
    }, className)

    return (
        <div className={classes}>
            <Image src={src} alt={alt} className="avatar-img" roundedCircle />
        </div>
    )
}

export const generateAvatarSource = (hash = 'noop', size = 80) => {
    return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=identicon&r=g`
}

export default Avatar
