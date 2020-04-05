import React, { useState } from 'react'
import { useCookies } from 'react-cookie';

import CreatableSelect from 'react-select/creatable';

import { SaveButton } from "./SaveButton"

import { presetScales } from '../resources/presetScales'

const customStyles = {
    option: (provided, state) => ({
        ...provided,
        borderBottom: '1px black',
        color: 'black',
        padding: 10,
      })
}



export const ScalesMenu = props => {

    const [cookies, setCookie] = useCookies(['userScales'])
    
    const [scales, setScales] = useState({...presetScales, ...cookies.userScales})

    const [value, setValue] = useState(undefined)

    const [ options ] = useState([
        Object.keys(scales).map( scale => {
            return { value: scale, label: scale }
        })
    ])


    const handleChange = event => {
        setValue(event)
        props.setScale(scales[event])
        console.log(event)
    }

    const saveScale = newScaleName => {
        if ( newScaleName ) {
            scales[newScaleName] = [...props.chimeNotes];
            setScales(scales)
            setCookie( 'userScales', scales )
        }
    }

    return (
        <div className = "scalesMenu" >
            <CreatableSelect 
                
                options = { options }
                onChange = { handleChange }
                onCreateOption = { saveScale }
                placeholder = "Choose scale here..."
                value = { value }
                styles={customStyles}
            />

            <SaveButton 
                saveScale={ saveScale }
            />
        </div>
    )
}
