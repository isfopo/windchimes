import React, { useState, useEffect } from 'react';

import { ChimeGraphic } from './ChimeGraphic';

import '../css/Chime.css';


export const Chime = props => {

    let timer = 0;

    const [chime] = useState(new Audio(require(`../Sounds/chime${props.note}.mp3`)))

    const playChime = () => {
        chime.pause();
        chime.currentTime = 0;
        chime.play();
        
        timer = setTimeout( playChime, Math.floor(Math.random() * 10000 - (props.windspeed * 200)) + 10  )
    }

    const stopChime = () => {
        if (timer) {
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
        <div className = "chimes">
            {/* UI Idea: use an svg of chime that wil scale and shift postitions based off of the pitch of note */}
            {/* has vibration animation when making sound */}
            <ChimeGraphic />
    
        </div>
    );
}

export default Chime;
