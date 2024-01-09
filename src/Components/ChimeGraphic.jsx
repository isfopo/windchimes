import React, { useState, useEffect } from 'react'
import Tone from "tone";
import '../css/Chime.css'

const scale = ( input, inRange, outRange ) => {
    const [inMin, inMax] = inRange;
    const [outMin, outMax] = outRange;
  
    const percent = (input - inMin) / (inMax - inMin);
    return percent * (outMax - outMin) + outMin;
}

export const ChimeGraphic = props => {
    
    const [note, setNote ] = useState(Tone.Frequency(props.note).toMidi())
    
    const [height, setHeight] = useState( scale(note, [36, 95], [400, 180]) ) // note to height calculations
    const [strokeWidth, setStrokeWidth] = useState(12 - props.numChimes)
    const [stringLength] = useState(150)
    
    useEffect(() => {
        setStrokeWidth(12 - props.numChimes)
    }, [props.numChimes])

    useEffect(() => {
        setNote(Tone.Frequency(props.note).toMidi())
        setHeight(scale(note, [36, 95], [400, 180]))
    }, [note, props.note])

    return (
        <div>
            <svg 
                width="100%" height={ height + strokeWidth +  stringLength}  >

                {/* Chime */}
                    <rect width="90%" height={ height } 
                        x={ strokeWidth / 2 } y={ stringLength - 50 }
                        rx="25" ry="25"
                        fill={props.theme.foreground}
                        stroke={props.theme.background2}
                        strokeWidth={strokeWidth}
                    />

                {/* Gleam */}
                    <rect width="30%" height={ height / 1 - stringLength } 
                            x="55%" y={ stringLength }
                            rx="50" ry="50"
                            fill={props.theme.highlight1}
                            stroke="transparent"
                        />

                {/* String */}
                    <line 
                        x1="45%" x2="45%" 
                        y1="0" y2={ stringLength } 
                        stroke={ props.theme.background2 } 
                        strokeWidth= { strokeWidth * 1.5 }
                    />

                {/* Hole */}
                    <circle 
                        cx="45%" cy={stringLength} r={ strokeWidth * 1.5 }
                        stroke="transparent" 
                        fill= { props.theme.background2 }    
                    />
                    
                {/* Note Name */}
                    <rect width="50" height="40"
                        x={ props.numChimes <= 4 ? 6 : 10 - props.numChimes } 
                        y="10"
                        rx="10" ry="10"
                        fill={props.theme.foreground}
                        stroke={props.theme.background2}
                        strokeWidth = { strokeWidth / 1.75 }
                    />
                    <text 
                        x={ props.numChimes <= 4 ? 14 : 18 - props.numChimes } 
                        y="35" 
                        fontWeight= "bold"
                        fontSize= { props.numChimes <= 6 ? 18 : 24 - props.numChimes }
                        fill = { props.theme.background2 }
                    > { props.note } </text>  
            </svg>
        </div>
    )
}
