import React, { useState, useEffect } from 'react';

import { ChimeGraphic } from './ChimeGraphic';

import '../css/Chime.css';


export const Chime = props => {

    const [chime] = useState(new Audio(require(`../Sounds/chime${props.note}.wav`)))
    const [isPlaying, setIsPlaying] = useState( true )
    const [windspeed] = useState(props.windspeed)

    const playChime = () => {
        chime.pause();
        chime.currentTime = 0;
        chime.play();
        
        console.log(isPlaying)
        if ( isPlaying ) {
            console.log('is playing')
            setTimeout( playChime, Math.floor(Math.random() * 10000 ) + 10 )
        } else {
            console.log('is not playing')
        } 
        // change rate to random interval that decreases (gets faster) as windspeed increases
    }
        
    useEffect(() => {
        console.log('mounted')
        playChime();
        
        return () => {
            setIsPlaying( false );
            console.log('unmounted')
        };
    }, [])

    return (
        <div className = "chimes">

            {/* UI Idea: use an svg of chime that wil scale and shift postitions based off of the pitch of note */}
            {/* has vibration animation when making sound */}
            <ChimeGraphic />
           
            {/* <p className = "noteName">{props.note}</p>
            <button onClick={() => { setIsPlaying(!isPlaying)}}>stop</button> */}
        </div>
    );
}

export default Chime;