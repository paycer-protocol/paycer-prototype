import React from 'react'
import ReactContentLoader from 'react-content-loader'

export interface ContentLoader{
    rowCount?: number,
    rowWidth?: number,
    height?: number
}

const ContentLoader: React.FC<ContentLoader> = ({ rowCount, rowWidth, height }: ContentLoader) => {

    const initialY = 56

    return (
        <ReactContentLoader
            speed={2}
            width={rowWidth}
            height={height}
            viewBox={`0 0 ${rowWidth} ${height}`}
            backgroundColor="#C7C7C7"
            foregroundColor="#ecebeb"
        >
            {Array(rowCount).fill(0).map((route, key) => (
                <>
                    <rect x="0" y={initialY + (key * 18)} rx="3" ry="3" width={rowWidth} height="6" />
                </>
            ))}
        </ReactContentLoader>
    )
}

ContentLoader.defaultProps = {
    rowCount: 4,
    rowWidth: 400,
    height: 160
}

export default ContentLoader
