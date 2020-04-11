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

export const NoteMenu = props => {

    const [theme, setTheme] = useState(props.theme)

    const classes = useStyles ({ theme })
  
    useEffect (() => {
      setTheme(props.theme)
    }, [props.theme])

    return (
        <div className="noteMenu">
            <div className="noteButtons">
                <button className={classes.button} onClick={ () => { props.addChime("C") }}>C</button>
                <button className={classes.button} onClick={ () => { props.addChime("Db") }}>Db</button>
                <button className={classes.button} onClick={ () => { props.addChime("D") }}>D</button>
                <button className={classes.button} onClick={ () => { props.addChime("Eb") }}>Eb</button>
                <button className={classes.button} onClick={ () => { props.addChime("E") }}>E</button>
                <button className={classes.button} onClick={ () => { props.addChime("F") }}>F</button>
                <button className={classes.button} onClick={ () => { props.addChime("Gb") }}>Gb</button>
                <button className={classes.button} onClick={ () => { props.addChime("G") }}>G</button>
                <button className={classes.button} onClick={ () => { props.addChime("Ab") }}>Ab</button>
                <button className={classes.button} onClick={ () => { props.addChime("A") }}>A</button>
                <button className={classes.button} onClick={ () => { props.addChime("Bb") }}>Bb</button>
                <button className={classes.button} onClick={ () => { props.addChime("B") }}>B</button>
            </div>

            <div className="octaveButtons">
                <button className={classes.button} onClick={ () => { props.changeOctave(1)}}>+</button>
                <button className={classes.button} onClick={ () => { props.changeOctave(-1)}}>-</button>
            </div>
                <p className={`${classes.display} octaveDisplay`} >
                    <strong>C{props.octave} thru B{props.octave}</strong>
                </p>
        </div>
    )
}
