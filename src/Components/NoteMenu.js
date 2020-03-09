import React from 'react'

export const NoteMenu = props => {
    return (
        <div className="noteMenu">

            <button onClick={ () => { props.addChime("C4") }}>C</button>
            <button onClick={ () => { props.addChime("DB4") }}>Db</button>
            <button onClick={ () => { props.addChime("D4") }}>D</button>
            <button onClick={ () => { props.addChime("EB4") }}>Eb</button>
            <button onClick={ () => { props.addChime("E4") }}>E</button>
            <button onClick={ () => { props.addChime("F4") }}>F</button>
            <button onClick={ () => { props.addChime("GB4") }}>Gb</button>
            <button onClick={ () => { props.addChime("G4") }}>G</button>
            <button onClick={ () => { props.addChime("AB4") }}>Ab</button>
            <button onClick={ () => { props.addChime("A4") }}>A</button>
            <button onClick={ () => { props.addChime("BB4") }}>Bb</button>
            <button onClick={ () => { props.addChime("B4") }}>B</button>

        </div>
    )
}
