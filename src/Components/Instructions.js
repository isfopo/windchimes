import React, { useState, useEffect } from 'react'
import { createUseStyles } from "react-jss";

const useStyles =  createUseStyles({
    wrapper: {
        text: ({ theme }) => theme.background2,
        background: ({ theme }) => theme.foreground,
        borderColor: ({ theme }) => theme.background2
    }
})

export const Instructions = props => {

    const [theme, setTheme] = useState(props.theme)

    const classes = useStyles ({ theme })

    useEffect( () => {
        setTheme(props.theme)
    }, [props.theme])

    return (
        <div className={`${classes.wrapper} instructions`} >

                <p>Select a note to add a chime</p>
                <p>Change octave by pressing "+" and "-"</p>
                <p>Click on a chime to remove it</p>
                <p>Select a scale or save your own</p>
                <p>Change the material to change the sound</p>
            
        </div>
    )
}
