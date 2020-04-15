// Libraries
import React, { useState, useEffect, useRef, useContext } from 'react';
import { CookiesProvider } from 'react-cookie';
import { Sampler } from "tone";

// Components
import { NoteMenu } from "./NoteMenu";
import { ScalesMenu } from './ScalesMenu';
import { MaterialMenu } from './MaterialMenu';
import { Instructions } from './Instructions';
import { BracketGraphic } from './BracketGraphic';
import { Chime }  from "../Components/Chime";

// Hooks
import { usePosition } from '../hooks/usePosition';
import { useInterval } from '../hooks/useInterval';

// Resources
import { openWeatherMapAPI } from "../resources/apiKey";
import { samples } from "../resources/samples";

// Context
import { ChangeThemeContext } from './Body'

export const Chimes = props => {

    const {latitude, longitude} = usePosition();

    let isLoaded = useRef(false);

    const [chimeNotes, setChimeNotes] = useState( 
        props.match.params.notes ? 
        props.match.params.notes.split(",") : []);
    const [material, setMaterial] = useState( 'metal' )
    const [windspeed, setWindspeed] = useState(0);
    const [octave, setOctave] = useState(4);
    
    const sampler = useRef(null);

    const changeTheme = useContext(ChangeThemeContext)
    
    useEffect(() => {
        makeSampler('metal')
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
        isLoaded.current = false
        
        sampler.current = new Sampler(
            samples,
            {
                baseUrl : `./sounds/${newMaterial}/`,
                onload: () => { isLoaded.current = true }
            }
            ).toMaster();
        setMaterial(newMaterial);
        changeTheme(newMaterial)
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
         sampler.current.triggerAttackRelease( note, 10 );
    }

    const addChime = note => {
        if ( chimeNotes.length <= 8 ) {
            setChimeNotes([...chimeNotes, `${note}${octave}`])
        }
    }

    useEffect(() => { // adds chime notes to url
        props.history.push(`${chimeNotes.toString(',')}`)
    }, [material, chimeNotes, props.history])

    const removeChime = noteToBeRemoved => {
        setChimeNotes(chimeNotes.filter( note => note !== noteToBeRemoved ))
    }

    return (
        <div className = "app" >
            <div className="controls">
                <div className="dropdowns" >
                    <CookiesProvider>
                        <ScalesMenu 
                            setScale={ setScale }
                            chimeNotes={ chimeNotes }
                            theme = { props.theme }
                        />
                    </CookiesProvider>

                    <MaterialMenu 
                        changeMaterial={ makeSampler }
                        chimeNotes={ chimeNotes }
                        theme = { props.theme }
                    />
                </div>
                <br />
                <NoteMenu 
                    className = "noteMenu"
                    addChime = { addChime }
                    changeOctave = { changeOctave }
                    octave = { octave }
                    theme = { props.theme }
                />
            </div>
        
            { chimeNotes.length === 0 ?
                <Instructions 
                    material = {material}
                /> :

                <div className="instrument" >
                    <BracketGraphic 
                        theme = { props.theme }
                    />

                    <div className="chimes">
                        { chimeNotes.map(( note, key ) => (
                            <Chime 
                                key = { key } 
                                note = { note }
                                windspeed = { windspeed }
                                numChimes = { chimeNotes.length }
                                playChime = { playChime }
                                removeChime = { removeChime }
                                isLoaded={isLoaded}
                                theme = { props.theme }
                            />
                        ))}
                    </div>
                </div>  
            }
            
        </div>
    )
}

export default Chimes;
