import React, { useState, useEffect} from 'react';
import { createUseStyles } from "react-jss";

const useStyles =  createUseStyles({
    button: {
        color: ({ theme }) => theme.background2,
        backgroundColor: ({ theme }) => theme.foreground,
        borderColor: ({ theme }) => theme.background2
    },
    display: {
        color: ({ theme }) => theme.background2
    }
})

const notes = [ "C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B" ]

export const NoteMenu = props => {

    const [theme, setTheme] = useState(props.theme)

    const classes = useStyles ({ theme })
  
    useEffect (() => {
      setTheme(props.theme)
    }, [props.theme])

    return (
        <div className="noteMenu">
            <div className="noteButtons">
                { notes.map( ( note, key ) => {
                    return (
                        <button 
                            className={classes.button} 
                            key={key}
                            onClick={ () => { props.addChime(`${note}`) }}
                            >{note}
                        </button>
                    )
                })}
            </div>

            <div className="octaveMenu" >
                <div className="octaveButtons">
                    <button className={classes.button} onClick={ () => { props.changeOctave(1)}}>+</button>
                    <button className={classes.button} onClick={ () => { props.changeOctave(-1)}}>-</button>
                </div>
                    <p className={`${classes.display} octaveDisplay`} >
                        <strong>C{props.octave} - B{props.octave}</strong>
                    </p>
            </div>
        </div>
    )
}
