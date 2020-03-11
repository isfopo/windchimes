import React, { useState, useEffect } from 'react';

import Chime from "../Components/Chime";
import { NoteMenu } from "./NoteMenu";

import { usePosition } from '../hooks/usePosition';
import { useInterval } from '../hooks/useInterval';

import '../css/App.css';

export const Chimes = () => {

    const {latitude, longitude} = usePosition();

    const [chimeNotes, setChimeNotes] = useState([]);
    const [windspeed, setWindspeed] = useState(0);
    const [apiKey] = useState('e7ec64ad75c8f58f1a1726bf7dc6c716');
    
    const getWindspeed = (lat, lon) => {
        
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)  
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
        setChimeNotes([])
    }

    return (
        <div className="App">
            <NoteMenu 
                addChime={ addChime }
            />
            
            <ul className="clearButton">
                { chimeNotes.map( (note, key) => <li key={key}>{ note }</li>)}
            </ul>

            <button className="menuButton" onClick={ () => { clear() }}>Clear</button>

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