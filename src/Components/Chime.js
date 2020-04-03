import React, { useEffect, useRef } from 'react';

import { ChimeGraphic } from './ChimeGraphic';

import '../css/Chime.css';

export const Chime = props => {

    let isPlaying = useRef(true);

    const callPlayChime = () => {
        if (isPlaying.current) {
            props.playChime(`${props.note}${props.octave}`)
            setTimeout( callPlayChime, Math.floor( Math.random() * 10000 - ( props.windspeed * 400 )) + 100  )
        }
    }
        
    useEffect(() => {
        callPlayChime();

        return () => {
            isPlaying.current = false;
        };
        // eslint-disable-next-line
    }, [])

    return (
        <div className = "chimes" onMouseEnter={ () => { callPlayChime() } }> 
            <p> {props.note}{props.octave} </p>
            <ChimeGraphic />
        </div>
    );
}
