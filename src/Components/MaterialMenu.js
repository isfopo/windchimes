import React, { useState, useEffect } from 'react'

import Select from 'react-select'

export const MaterialMenu = props => {

    // I'm sure there's a better way to do this other than writing all materials by hand. 
    // Maybe there's a way to get the contents of the "Sounds" folder as an array?

    const [isDisabled, setIsDisabled ] = useState(true) 
    const [ options ] = useState([
        { value: "Metal", label: "Metal" },
        { value: "Kalimba", label: "Kalimba" },
        { value: "Fade", label: "Fade" },
        { value: "Wood", label: "Wood" },
        { value: "Synth", label: "Synth" }
    ])

    const handleChange = event => {
        props.changeMaterial(event.value)
    }
    
    useEffect(() => {
        if ( props.chimeNotes.length > 0 ) {
            setIsDisabled(false)
        } else {
            setIsDisabled(true)
        }
    }, [ props.chimeNotes])

    return (
        <div>
            <Select 
                options = { options }
                placeholder = { isDisabled ? "Choose material here..." : "Metal" }
                onChange = { handleChange }
                isDisabled = { isDisabled }
            />
        </div>
    )
}
