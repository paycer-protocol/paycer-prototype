import React from 'react';
import BaseImage, { ImageProps as BaseImageProps } from 'react-bootstrap/Image';

export interface ImageProps extends BaseImageProps {}

const Image: React.FC<ImageProps> = (props) => <BaseImage {...props} />;

export default Image;
