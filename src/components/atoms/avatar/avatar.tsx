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
}


const Avatar: React.FC<AvatarProps> = ({ size = 'md', src, alt, isOnline, isOffline }: AvatarProps) => {
    const classes = classnames(`avatar avatar-${size}`, {
        'avatar-online': isOnline,
        'avatar-offline': isOffline,
    })

    return (
        <div className={classes}>
            <Image src={src} alt={alt} className="avatar-img" roundedCircle />
        </div>
    )
}

export default Avatar
