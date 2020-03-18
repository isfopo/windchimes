import React, { useState } from 'react'

import { SaveButton } from "./SaveButton"

import { presetScales } from '../Scales/presetScales'


export const ScalesMenu = props => {

    const [scales, setScales] = useState(presetScales)

    const handleChange = event => {
        props.setScale(event.target.value.split(","))
    }

    const saveScale = () => {
        const newScaleName = prompt("What should we call your new set of chimes?");
        if ( newScaleName ) {
            scales[newScaleName] = [...props.chimeNotes];
            setScales(scales)
        }
    }

    return (
        <div>
            <label htmlFor="scales">Choose a scale:</label>
            
            <select id="scales" onChange={ handleChange }>

                <option value="" selected disabled hidden>Choose here</option>
                
                { Object.keys( scales ).map( ( scale, key ) => (
                    <option 
                        value={scales[scale]} 
                        key={key} 
                    >
                        {scale}
                    </option>
                ))}
            </select>

            <SaveButton 
                saveScale={ saveScale }
            />
        </div>
    )
}
