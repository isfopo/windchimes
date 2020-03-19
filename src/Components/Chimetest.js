import React, { useState, useEffect } from 'react';
import Sound from 'react-sound';

import { ChimeGraphic } from './ChimeGraphic';

import '../css/Chime.css';

export const Chime = props => {

    const [playFromPosition, setPlayFromPosition] = useState(0)
    const [playStatus, setPlayStatus] = useState(Sound.status.PLAYING)

    const playChime = () => {
        setPlayFromPosition(0)

        setTimeout( playChime, Math.floor(Math.random() * 10000 - (props.windspeed * 400)) + 100  )
    }

    const stopChime = () => {

    }
        
    useEffect(() => {
        return () => {
            stopChime();
        };
        // eslint-disable-next-line
    }, [])

    return (
        <div className = "chimes" onMouseOver={ () => { playChime() }}>
            <ChimeGraphic />
            <Sound 
                url={`Sounds/${props.material}/chime${props.note}.mp3`}
                playStatus={playStatus}
            />
        </div>
    );
}

export default Chime;
