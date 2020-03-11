# Windchimes

### Overview

A peaceful windchime that will run in the browser or standalone. Using your device's current location this program will use OpenWeatherMap to look up the surrounding windspeed to increase the ringing rate of the chimes. The user can then choose from predetermined notes or choose their own, them save or share their set of chimes.

### Technical Summary

- React/Javascript
- JSS
- React Cookie ( to save user scales )
- React Router ( share user scales )
- React Animation ( to make the chimes vibrate )
- Electron
- PWA

### APIs Used

- OpenWeatherMap
- Geolocation API
- Web Audio API

### Feature List (milestones)

- Customizible, save-able and share-able sets of chimes
    - User can choose from predetermined scales
    - User can choose notes to create their own scale by adding note indiviually
    - User can save their scales with name and share them using URL
    - User can choose between multiple timbres ( metal, wood, synth, etc. )

- Chimes react ring more or less rapidly based off the current windspeed in the location of device
    - Under the hood, it gets the user location
    - Uses OpenWeatherMap to get curent windspeed
    - A higher windspeed will cause the chines to ring more rapidly
    - Mouse over will also ring chimes

- Chimes are visualized with SVG that scales with note and will wobble when ringing
