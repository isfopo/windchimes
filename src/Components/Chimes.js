// Libraries
import React, { useState, useEffect, useRef } from 'react';
import { CookiesProvider } from 'react-cookie';
import { Sampler } from "tone";
//import { generatePath, Link } from "react-router-dom";

// Components
import { Chime } from "../Components/Chime";
import { NoteMenu } from "./NoteMenu";
import { ScalesMenu } from './ScalesMenu';
import { MaterialMenu } from './MaterialMenu';

// Hooks
import { usePosition } from '../hooks/usePosition';
import { useInterval } from '../hooks/useInterval';

// Resources
import { openWeatherMapAPI } from "../resources/apiKey";
import { samples } from "../resources/samples";

// Styles
//import '../css/App.css';

export const Chimes = props => {

    const {latitude, longitude} = usePosition();

    const [chimeNotes, setChimeNotes] = useState( props.match.params.notes ? props.match.params.notes.split(",") : []);
    const [material, setMaterial] = useState( 'Metal' )
    const [windspeed, setWindspeed] = useState(0);
    const [isLoaded, setLoaded] = useState(false);
    const [octave, setOctave] = useState(4);
    
    const sampler = useRef(null);
    
    useEffect(() => {
        makeSampler('Metal')
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if ( latitude && longitude ) {
            getWindspeed(latitude, longitude);
        }
    }, [latitude, longitude])

    useInterval(() => {
        getWindspeed(latitude, longitude)
    }, 60000)

    const makeSampler = newMaterial => {
        sampler.current = new Sampler(
            samples,
            {
                baseUrl : `./Sounds/${newMaterial}/`,
                onload: () => { setLoaded(true); }
            }
        ).toMaster();
        setMaterial(newMaterial);
    }

    const getWindspeed = (lat = -38.2527, lon = 85.7585) => { // default location is Louisville, Ky
  
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${ lat }&lon=${ lon }&appid=${ openWeatherMapAPI }`)  

        .then( resp => { return resp.json() })
        .then( data => { setWindspeed(data.wind.speed) }) // in meters per second
        .catch( err => { console.error(err) });
    }

    const setScale = ( scale ) => {
        setChimeNotes( scale )
    }

    const changeOctave = shift => {
        const newOctave = octave + shift

        if ( newOctave >= 2 && newOctave <= 6 ) {
                setOctave( newOctave )
            }
    }

    const playChime = note => {
        if (isLoaded) {
            sampler.current.triggerAttackRelease( note, 10 );
        }
    }

    const addChime = note => {
        setChimeNotes([...chimeNotes, `${note}${octave}`])
    }

    useEffect(() => {
        props.history.push(`${chimeNotes.toString(',')}`)
    }, [material, chimeNotes, props.history])

    const clear = () => {
        setChimeNotes([])
        props.history.push("")
    }

    return (
        <div>
            <NoteMenu 
                addChime = { addChime }
                changeOctave = { changeOctave }
                octave = { octave }
            />

            <CookiesProvider>
                <ScalesMenu 
                    setScale={ setScale }
                    chimeNotes={ chimeNotes }
                    clear={ clear }
                />
            </CookiesProvider>

            <MaterialMenu 
                changeMaterial={ makeSampler }
                chimeNotes={ chimeNotes }
            />

            <button className="clearButton" onClick={ () => { clear() }}>Clear</button>

            <div className="chimes">
                { chimeNotes.map(( note, key ) => (
                    <Chime 
                        key = { key } 
                        note = { note }
                        windspeed = { windspeed }
                        playChime = { playChime }
                    />
                ))}
            </div>

        </div>
    )
}

export default Chimes;
