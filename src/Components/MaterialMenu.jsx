import React, { useState, useEffect } from 'react'

import Select from 'react-select'

export const MaterialMenu = props => {

    const [isDisabled, setIsDisabled ] = useState(true) 
    const [ options ] = useState([
        { value: "metal", label: "Metal" },
        { value: "kalimba", label: "Kalimba" },
        { value: "fade", label: "Fade" },
        { value: "wood", label: "Wood" },
        { value: "synth", label: "Synth" }
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
        <div className="materialMenu menu">
            <Select 
                options = { options }
                placeholder = { isDisabled ? "Choose material here..." : "Metal" }
                onChange = { handleChange }
                isDisabled = { isDisabled }
                theme={theme => ({
                    ...theme,
                    colors: {
                        ...theme.colors,
                        neutral0: props.theme.highlight1, // 
                        neutral5: props.theme.highlight1,
                        primary25: props.theme.highlight2,
                        primary: props.theme.foreground
                    },
                })}
            />
        </div>
    )
}
