import React from 'react'

export const NoteMenu = props => {
    return (
        <div className="noteMenu">
            <div className="notes">
                <button onClick={ () => { props.addChime("C") }}>C</button>
                <button onClick={ () => { props.addChime("Db") }}>Db</button>
                <button onClick={ () => { props.addChime("D") }}>D</button>
                <button onClick={ () => { props.addChime("Eb") }}>Eb</button>
                <button onClick={ () => { props.addChime("E") }}>E</button>
                <button onClick={ () => { props.addChime("F") }}>F</button>
                <button onClick={ () => { props.addChime("Gb") }}>Gb</button>
                <button onClick={ () => { props.addChime("G") }}>G</button>
                <button onClick={ () => { props.addChime("Ab") }}>Ab</button>
                <button onClick={ () => { props.addChime("A") }}>A</button>
                <button onClick={ () => { props.addChime("Bb") }}>Bb</button>
                <button onClick={ () => { props.addChime("B") }}>B</button>
            </div>

            <div className="octave">
                <button onClick={ () => { props.changeOctave(-1)}}>-</button>
                <button onClick={ () => { props.changeOctave(1)}}>+</button>
                <p>C{props.octave} thru B{props.octave}</p>
            </div>
        </div>
    )
}
