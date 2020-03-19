import React from 'react'
import {createUseStyles} from 'react-jss'

import { ReactSVG } from 'react-svg'

import '../css/Chime.css'

const useStyles = createUseStyles({ // stuggling with creating dynamic chime sizes, make need unique SVG for each
    chime: {
        height: 100,
        width: 100,
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

    return (
        <>
        <ReactSVG 
                className={classes.chime}
                src="graphics/chime.svg"
            />
        </>
    )
}
