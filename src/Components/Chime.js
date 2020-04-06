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

    const getWindInterval = windspeed => {
        return Math.floor( Math.random() * 10000 - ( windspeed * 400 )) + 100  
    }
    
    const callPlayChime = () => {
        if (isPlaying.current) {
            props.playChime(`${note}${octave}`)
            setTimeout( callPlayChime, getWindInterval(props.windspeed))
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
        <div onClick={ () => {props.removeChime(`${note}${octave}`) } } onMouseEnter={ () => { callPlayChime() } }> 
            <ChimeGraphic 
                note = { `${note}${octave}` }
                numChimes = { props.numChimes }
            />
        </div>
    );
}
