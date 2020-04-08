import React, { useState } from 'react'

export const BracketGraphic = () => {

    const [stroke] = useState('#2B3134')

    const [height] = useState( 100 )
    const [width] = useState( 600 )
    const [strokeWidth] = useState( 16 )
    const [bracketHeight] = useState( strokeWidth * 1.5)

    return (
        <div className="bracket" >
            <svg
                width={width} height={height}>
                <line 
                    x1={ width/2 - strokeWidth/2 } x2={ width/2 - strokeWidth/2 } 
                    y1="0" y2="100"
                    stroke={stroke} 
                    strokeWidth= {strokeWidth}
                />
                <rect 
                    x="0" y={ height - bracketHeight } 
                    rx="10" ry="10" 
                    width={width} height={ bracketHeight } 
                    stroke="transparent" 
                    fill={stroke} 
                />
            </svg>
        </div>
    )
}
