# Windchimes

### Overview

- A peaceful windchime that allows the user to create and share custom scales with a 

### Technical Summary

- React/Javascript
- JSS
- React Router ( to save and share user scales )
- 

### APIs Used

- OpenWeatherMap
- Geolocation API
- Web Audio API

### Feature List (milestones)

- Customizible, save-able and share-able sets of chimes
    - User can choose from predetermined scales
    - User can choose notes to create their own scale by adding note indiviually
    - User can save their scales with name and share them using URL
    - User can choose between multiple 

- Chimes react ring more or less rapidly based off the current windspeed in the location of device
    - Under the hood, it gets the user location
    - Uses OpenWeatherMap to get curent windspeed
    - A higher wind speed will cause the chines to ring more rapidly
    - Mouse over will also ring chimes

- Chimes are visualized with SVG that scales with note and will wobble when ringing
