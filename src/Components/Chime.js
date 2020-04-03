import React, { useEffect, useRef } from 'react';

import { ChimeGraphic } from './ChimeGraphic';

import '../css/Chime.css';

export const Chime = props => {

    let isPlaying = useRef(true);

    const splitNote = noteIn => {
        var regex = new RegExp('([0-9]+)|([a-zA-Z]+)','g');
        return noteIn.match(regex);
    }

    const [note, octave] = splitNote(props.note)
    
    const callPlayChime = () => {
        if (isPlaying.current) {
            props.playChime(`${note}${octave}`)
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
            <p> {note}{octave} </p>
            <ChimeGraphic />
        </div>
    );
}
