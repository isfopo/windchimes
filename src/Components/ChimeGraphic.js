import React, { useState, useEffect } from 'react'
import {createUseStyles} from 'react-jss'
import Tone from "tone";

import '../css/Chime.css'

const useStyles = createUseStyles({ // struggling with creating dynamic chime sizes, make need unique SVG for each
    chime: {
        display: "block",
        maxWidth: 150,
        margin: {
            top: 10,
            right: 10,
            bottom: 10,
            left: 10
        }
    }
})

export const ChimeGraphic = props => {

    const classes = useStyles()

    const [height] = useState(Tone.Frequency(props.note).toMidi()) // midi note number determines the size of chime

    const [fill] = useState('aqua')
    const [stroke] = useState('black')
    const [strokeWidth, setStrokeWidth] = useState(12 - props.numChimes)
    const [stringLength] = useState(150)

    useEffect(() => {
        setStrokeWidth(12 - props.numChimes)
    }, [props.numChimes])

    return (
        <svg className={classes.chime}
            width="100%" height={ height * 10 + strokeWidth +  stringLength}  >

            {/* Chime */}
                <rect width="90%" height={ height } 
                    x={ strokeWidth / 2 } y={ stringLength - 50 }
                    rx="15" ry="15"
                    fill={fill}
                    stroke={stroke}
                    stroke-width={strokeWidth}
                />

            {/* String */}
                <line 
                    x1="45%" x2="45%" 
                    y1="0" y2={ stringLength } 
                    stroke={stroke} 
                    stroke-width= { strokeWidth * 1.5 }
                />

            {/* Hole */}
                <circle 
                    cx="45%" cy={stringLength} r={ strokeWidth * 1.5 }
                    stroke="transparent" 
                    fill= { stroke }    
                />


            {/* Note Name */}
                <text x="10%" y="10%" >{props.note}</text>
                
        </svg>
    )
}
