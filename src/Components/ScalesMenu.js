import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie';

import CreatableSelect from 'react-select/creatable';

import { presetScales } from '../resources/presetScales'


export const ScalesMenu = props => {

    const [ cookies, setCookie] = useCookies(['userScales'])
    const [ scales, setScales] = useState({...presetScales, ...cookies.userScales})
    const [ options, setOptions ] = useState([])

    const handleChange = event => {
        if ( event.value ) {
            props.setScale(scales[event.value])
        }
    }

    const saveScale = newScaleName => {
        if ( newScaleName ) {
            scales[newScaleName] = [...props.chimeNotes];
            setScales(scales)
            setCookie( 'userScales', scales )
        }
    }

    useEffect(() => {
        setOptions (
            Object.keys(scales).map( scale => {
                return { value: scale, label: scale }
            })
        )
    }, [scales])

    return (
        <div className = "scalesMenu menu" >
            <CreatableSelect 
                options = { options }
                onChange = { handleChange }
                onCreateOption = { saveScale }
                placeholder = "Choose scale here..."
                theme={theme => ({
                    ...theme,
                    colors: {
                        ...theme.colors,
                        neutral0: props.theme.highlight1,
                        primary25: props.theme.highlight2,
                        primary: props.theme.foreground,
                    },
                })}
            />
        </div>
    )
}
