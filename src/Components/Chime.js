import React, { useState, useEffect } from 'react';

import { ChimeGraphic } from './ChimeGraphic';

import '../css/Chime.css';

export const Chime = props => {

    let timer = undefined;

    const [chime] = useState(new Audio(require(`../../public/Sounds/${props.material}/chime${props.note}.mp3`)))

    const playChime = () => {
        chime.pause();
        chime.currentTime = 0;
        chime.play();

        clearTimeout(timer);
        timer = setTimeout( playChime, Math.floor(Math.random() * 10000 - (props.windspeed * 400)) + 100  )
    }

    const stopChime = () => {
        if (timer) {
            chime.pause();
            clearTimeout(timer);
            timer = 0;
        }
    }
        
    useEffect(() => {
        playChime();
        return () => {
            stopChime();
        };
        // eslint-disable-next-line
    }, [])

    return (
        <div className = "chimes" onMouseOver={ () => { playChime() }}>
            <ChimeGraphic />
        </div>
    );
}

export default Chime;
