export const useScale = ( input, inRange, outRange ) => {
    const [inMin, inMax] = inRange;
    const [outMin, outMax] = outRange;
  
    const percent = (input - inMin) / (inMax - inMin);
    return percent * (outMax - outMin) + outMin;
}