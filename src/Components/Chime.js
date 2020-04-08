import React, { useState, useEffect, useRef } from 'react';
import {Animate} from 'react-rebound';

import { ChimeGraphic } from './ChimeGraphic';

import '../css/Chime.css';


export const Chime = props => {

    let isPlaying = useRef(true)
    let timer = useRef(false)

    const [animate, setAnimate] = useState(false);

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
            setAnimate(true)
            setTimeout(() => {
                setAnimate(false)
            }, 100)

            props.playChime(`${note}${octave}`)
            timer.current = setTimeout( () => {
                callPlayChime();
            }, getWindInterval(props.windspeed))
        }
    }
        
    useEffect(() => {
        callPlayChime();

        return () => {
            clearTimeout(timer.current)
            console.log(timer.current)
            isPlaying.current = false;
        };
        // eslint-disable-next-line
    }, [])

    return (
        <div  className="chime" 
            onMouseEnter={ () => { callPlayChime() } }
            onClick={ () => {props.removeChime(`${note}${octave}`) } } 
            >
                <Animate 
                    scaleX={animate ? 1.1 : 1} 
                    scaleY={animate ? 1.1 : 1}
                    tension={300} friction={50}
                >
                    <div>
                        <ChimeGraphic 
                            note = { `${note}${octave}` }
                            numChimes = { props.numChimes }
                        />
                    </div>
                </Animate>
        </div>
    );
}
