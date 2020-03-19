import React, { useState, useEffect } from 'react';
import Sound from 'react-sound';

import { ChimeGraphic } from './ChimeGraphic';

import '../css/Chime.css';

export const Chime = props => {

    let timer = undefined;

    const [playStatus, setPlayStatus] = useState(Sound.status.STOPPED)
    const [position, setPosition] = useState(0)

    const playChime = () => {
        console.log('should play')
        setPlayStatus(Sound.status.STOPPED)
        setPosition(0)
        setPlayStatus(Sound.status.PLAYING)

        timer = setTimeout( playChime, Math.floor(Math.random() * 10000 - (props.windspeed * 400)) + 100  )
    }

    useEffect(() => {
        playChime();
        return () => {
            clearTimeout(timer);
        };
        // eslint-disable-next-line
    }, [])

    return (
        <div 
            className = "chimes" 
            onMouseEnter={ () => { playChime() }}
            >
            <ChimeGraphic />
            <Sound 
                url={`Sounds/${props.material}/chime${props.note}.mp3`}
                playStatus={ playStatus }
                position={position}
            />
        </div>
    );
}

export default Chime;
