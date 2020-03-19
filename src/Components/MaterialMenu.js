import React from 'react'

export const MaterialMenu = props => {

    const handleChange = event => {
        props.setMaterial(event.target.value)
    }

    return (
        <div>
            <label htmlFor="materials">Choose a material:</label>
            
            <select id="materials" onChange={ handleChange }>
                <option value="Metal" defaultValue >Metal</option>
                <option value="Kalimba" >Kalimba</option>
                <option value="Fade" >Fade</option>
                <option value="Wood" >Wood</option>
                <option value="Synth" >Synth</option>
            </select>
        </div>
    )
}
