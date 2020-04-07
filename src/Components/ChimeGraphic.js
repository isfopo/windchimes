import React, { useState, useEffect } from 'react'
import Tone from "tone";

import {createUseStyles} from 'react-jss'

import { useScale } from '../hooks/useScale'

import '../css/Chime.css'

const useStyles = createUseStyles({ 

})

export const ChimeGraphic = props => {

    const classes = useStyles()

    const [midiNum] = useState(Tone.Frequency(props.note).toMidi())

    const [height] = useState( useScale(midiNum, [36, 95], [500, 200]) ) // add midi to height calculations here
    const [fill] = useState('#38BCA8')
    const [gleamColor] = useState('#366376')
    const [stroke] = useState('#2B3134')
    const [strokeWidth, setStrokeWidth] = useState(12 - props.numChimes)
    const [stringLength] = useState(150)

    useEffect(() => {
        setStrokeWidth(12 - props.numChimes)
    }, [props.numChimes])

    return (
        <svg className="chime"
            width="100%" height={ height + strokeWidth +  stringLength}  >

            {/* Chime */}
                <rect width="90%" height={ height } 
                    x={ strokeWidth / 2 } y={ stringLength - 50 }
                    rx="25" ry="25"
                    fill={fill}
                    stroke={stroke}
                    strokeWidth={strokeWidth}
                />

            {/* Gleam */}
                <rect width="30%" height={ height / 1 - stringLength } 
                        x="55%" y={ stringLength }
                        rx="50" ry="50"
                        fill={gleamColor}
                        stroke="transparent"
                    />

            {/* String */}
                <line 
                    x1="45%" x2="45%" 
                    y1="0" y2={ stringLength } 
                    stroke={stroke} 
                    strokeWidth= { strokeWidth * 1.5 }
                />

            {/* Hole */}
                <circle 
                    cx="45%" cy={stringLength} r={ strokeWidth * 1.5 }
                    stroke="transparent" 
                    fill= { stroke }    
                />


            {/* Note Name */}
                <text 
                    x={ props.numChimes <= 4 ? 10 : 14 - props.numChimes } y="30" 
                    fontSize= { props.numChimes <= 6 ? 16 : 22 - props.numChimes }
                >{props.note}</text>
                
        </svg>
    )
}
