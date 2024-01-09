import React, { useState } from "react";

export const BracketGraphic = (props) => {
  const [height] = useState(100);
  const [width] = useState(100);
  const [strokeWidth] = useState(6);
  const [bracketHeight] = useState(strokeWidth * 4);

  return (
    <div className="bracket">
      <svg width={`${width}%`} height={height}>
        <line
          x1={`${width / 2 - strokeWidth / 5}%`}
          x2={`${width / 2 - strokeWidth / 5}%`}
          y1="0"
          y2="100"
          stroke={props.theme.background2}
          strokeWidth={`${strokeWidth}%`}
        />
        <rect
          width={`${width}%`}
          height={`${bracketHeight}%`}
          x="0"
          y={`${height - bracketHeight}%`}
          rx="10"
          ry="10"
          stroke="transparent"
          fill={props.theme.background2}
        />
      </svg>
    </div>
  );
};
