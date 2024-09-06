import React from 'react';

import classes from './component.module.css';
import { Overlay } from '@mantine/core';

interface VideoBackgroundProps extends React.PropsWithChildren {
    src: string;
    autoPlay?: boolean;
    loop?: boolean;
    muted?: boolean;
}

const VideoBackground = (props: VideoBackgroundProps) => {
    return (
        <div className={ classes.main }>
            <video className={ classes.video } { ...props }>
                <source src='/background.mp4' type='video/mp4' />
            </video>
            { props.children }
        </div>
    )
}

export { VideoBackground }