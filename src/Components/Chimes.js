import React, { useState, useEffect } from 'react';
import { CookiesProvider } from 'react-cookie';

import Chime from "../Components/Chime";
import { NoteMenu } from "./NoteMenu";
import { ScalesMenu } from './ScalesMenu';

import { usePosition } from '../hooks/usePosition';
import { useInterval } from '../hooks/useInterval';

import { openWeatherMapAPI } from "../apiKey";

import '../css/App.css';

export const Chimes = () => {

    const {latitude, longitude} = usePosition();

    const [chimeNotes, setChimeNotes] = useState([]);
    const [windspeed, setWindspeed] = useState(0);
    
    const getWindspeed = (lat = -38.2527, lon = 85.7585) => { // default location is Louisvlle, Ky
        
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${openWeatherMapAPI}`)  
        .then( resp => {
            return resp.json() 
        }) // Convert data to json
        .then( data => {
            setWindspeed(data.wind.speed); // in meters per second
        })
        .catch( err => {
            console.error(err)
        });
    }

    const setScale = ( scale ) => {
        setChimeNotes([])
        setChimeNotes( scale )
    }

    useEffect(() => {
        getWindspeed(latitude, longitude);

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
        // TODO - to map to call stopChime on each Chime component
        setChimeNotes([])
    }

    return (
        <div className="App">
            <NoteMenu 
                addChime={ addChime }
            />
            
            <CookiesProvider>
                <ScalesMenu 
                    setScale={ setScale }
                    chimeNotes={ chimeNotes }
                />
            </CookiesProvider>
            
            <ul className="noteList">
                { chimeNotes.map( (note, key) => <li key={ key }>{ note }</li>)}
            </ul>

            <button className="clearButton" onClick={ () => { clear() }}>Clear</button>

            <div  className="chimes">
                { chimeNotes.map(( note, key ) => (
                    <Chime 
                        note = { note } 
                        key = { key } 
                        windspeed = { windspeed }
                    />
                ))}
            </div>
        </div>
    )
}

export default Chimes;