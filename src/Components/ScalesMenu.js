import React from 'react'

import { presetScales } from '../Scales/presetScales'

export const ScalesMenu = props => {

    const handleChange = event => {
        props.setScale(event.target.value.split(","))
    }

    return (
        <div>
            <label htmlFor="scales">Choose a scale:</label>
            
            <select id="scales" onChange={ handleChange }>
                { Object.keys(presetScales).map( ( scale, key ) => (
                    <option 
                        value={presetScales[scale]} 
                        key={key} 
                    >
                        {scale}
                    </option>
                ))}
            </select>
        </div>
    )
}
