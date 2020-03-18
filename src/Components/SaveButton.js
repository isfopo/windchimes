import React from 'react'

export const SaveButton = props => {
    return (
        <div>
            <button onClick={ () => { props.saveScale() } }>
                Save
            </button>
        </div>
    )
}
