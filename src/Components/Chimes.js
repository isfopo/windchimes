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
import { samplePaths } from "../resources/samplePaths";

// Styles
//import '../css/App.css';

export const Chimes = props => {

    const {latitude, longitude} = usePosition();

    const [chimeNotes, setChimeNotes] = useState( props.match.params.notes ? props.match.params.notes.split(",") : []);
    const [windspeed, setWindspeed] = useState(0);
    const [isLoaded, setLoaded] = useState(false);
    const [octave, setOctave] = useState(4);
    const sampler = useRef(null);
    
    useEffect(() => {
        getWindspeed(latitude, longitude);
        makeSampler('Metal')
        // eslint-disable-next-line
    }, [])

    useInterval(() => {
        getWindspeed(latitude, longitude)
    }, 60000)

    const makeSampler = material => {
        sampler.current = new Sampler(
            samplePaths,
            {
                baseUrl : `./Sounds/${material}/`,
                onload: () => { setLoaded(true); }
            }
        ).toMaster();
    }

    const getWindspeed = (lat = -38.2527, lon = 85.7585) => { // default location is Louisville, Ky
        
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${ lat }&lon=${ lon }&appid=${ openWeatherMapAPI }`)  

        .then( resp => { return resp.json() })
        .then( data => { setWindspeed(data.wind.speed) }) // in meters per second
        .catch( err => { console.error(err) });
    }

    const setScale = ( scale ) => {
        setChimeNotes([])
        setChimeNotes( scale )
    }

    const changeOctave = shift => {
        setOctave(octave + shift)
    }

    const playChime = note => {
        if (isLoaded) {
            sampler.current.triggerAttackRelease( note, 2.5 );
        }
    }

    const addChime = note => {
        setChimeNotes([...chimeNotes, note])
        // props.history.push("newChime")
    }

    const clear = () => {
        setChimeNotes([])
    }

    return (
        <div>
            <NoteMenu 
                addChime= { addChime }
                changeOctave= { changeOctave }
                octave={octave}
            />

            <CookiesProvider>
                <ScalesMenu 
                    setScale={ setScale }
                    chimeNotes={ chimeNotes }
                />
            </CookiesProvider>

            <MaterialMenu 
                changeMaterial={ makeSampler }
            />

            <button className="clearButton" onClick={ () => { clear() }}>Clear</button>

            <div className="chimes">
                { chimeNotes.map(( note, key ) => (
                    <Chime 
                        key = { key } 
                        note = { note }
                        octave = { octave }
                        windspeed = { windspeed }
                        playChime = { playChime }
                    />
                ))}
            </div>

        </div>
    )
}

export default Chimes;
