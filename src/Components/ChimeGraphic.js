import React from 'react'
import {createUseStyles} from 'react-jss'

import { ReactSVG } from 'react-svg'

import '../css/Chime.css'

const useStyles = createUseStyles({
    chime: {
        height: .5,
        width: .5,
        margin: 3,
    }
})

export const ChimeGraphic = props => {

   const classes = useStyles()

    return (
        <>
        <ReactSVG 
                className={classes.chime}
                src="../graphics/chime.svg"
            />
        </>
    )
}
