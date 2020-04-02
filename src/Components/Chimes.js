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
import '../css/App.css';

export const Chimes = props => {

    const {latitude, longitude} = usePosition();

    const [chimeNotes, setChimeNotes] = useState( props.match.params.notes ? props.match.params.notes.split(",") : []);
    const [windspeed, setWindspeed] = useState(0);
    const [isLoaded, setLoaded] = useState(false);
    const sampler = useRef(null);
    
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

    const changeMaterial = e => {
        sampler.current = new Sampler(
            samplePaths,
            {
                baseUrl : `./Sounds/${e}/`,
                onload: () => {
                    console.log('loaded')
                    setLoaded(true);
                }
            }
        ).toMaster();
    }

    const playChime = note => {
        if (isLoaded) {
            sampler.current.triggerAttackRelease( note, 2.5 );
        }
    }

    useEffect(() => {  // DRY
        getWindspeed(latitude, longitude);

        sampler.current = new Sampler(
            samplePaths,
            {
                baseUrl : `./Sounds/Metal/`,
                onload: () => {
                    console.log('loaded')
                    setLoaded(true);
                }
            }
        ).toMaster();

        return () => {
        };
        // eslint-disable-next-line
    }, [])

    useInterval(() => {
        getWindspeed(latitude, longitude)
    }, 60000)

    const addChime = note => {
        setChimeNotes([...chimeNotes, note])
    }

    const clear = () => {
        setChimeNotes([])
    }

    return (
        <div>
            <NoteMenu 
                addChime={ addChime }
            />

            <CookiesProvider>
                <ScalesMenu 
                    setScale={ setScale }
                    chimeNotes={ chimeNotes }
                />
            </CookiesProvider>

            <MaterialMenu 
                changeMaterial={ changeMaterial }
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
