import React, { useState, useEffect, useRef } from 'react';
import { Animate } from 'react-rebound';

import { ChimeGraphic } from './ChimeGraphic';

import '../css/Chime.css';

const splitNote = noteIn => {
    var regex = new RegExp('([0-9]+)|([a-zA-Z]+)','g');
    return noteIn.match(regex);
}

export const Chime = props => {

    let isPlaying = useRef(true)
    let timer = useRef(false)
    let firstRing = useRef(true)

    const [animate, setAnimate] = useState(false);

    const [note, setNote] = useState( splitNote(props.note)[0] )
    const [octave, setOctave] = useState( splitNote(props.note)[1] )

    const getWindInterval = windspeed => {
        return Math.floor( Math.random() * 10000 - ( windspeed * 400 )) + 100  
    }
    
    const callPlayChime = () => {
        if ( props.isLoaded.current ) {
            setAnimate(true)
            setTimeout(() => {
                setAnimate(false)
            }, 100 )
            
            props.playChime(`${note}${octave}`)

            if ( firstRing.current ) {
                windChime()
                firstRing.current = false
            }
        }
    }
    
    const windChime = () => {
        timer.current = setTimeout( () => {
            callPlayChime()
            windChime();
        }, getWindInterval(props.windspeed))
    }

    useEffect(() => {
        setNote(splitNote(props.note)[0])
        setOctave(splitNote(props.note)[1])
        clearTimeout(timer.current)
        firstRing.current = true;
    }, [props.note, note, octave])
    
    useEffect(() => {
        return () => {
            clearTimeout(timer.current)
            isPlaying.current = false;
        };
        // eslint-disable-next-line
    }, [])

    return (
        <div  className="chime" 
            onPointerEnter={ () => { callPlayChime() } }
            onDoubleClick={ () => { props.removeChime(`${note}${octave}`) } }
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
                            theme = { props.theme }
                        />
                    </div>
                </Animate>
        </div>      
    );
}
