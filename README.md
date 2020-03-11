# Windchimes

### Overview

A peaceful windchime that will run in the browser or standalone app. Using your device's current location this program will use OpenWeatherMap to look up the surrounding windspeed to increase the ringing rate of the chimes. The user can then choose from predetermined notes or choose their own, them save or share their set of chimes.

### Technical Summary

- React/Javascript
- JSS
- React Cookie ( to save user scales )
- React Router ( share user scales )
- React Animation ( to make the chimes vibrate )
- Electron ( to make standalone app )
- PWA ( built into create-react-app )

### APIs Used

- OpenWeatherMap
- Geolocation API
- Web Audio API

### Feature List

- Customizible, save-able and share-able sets of chimes
    - User can choose from predetermined scales
    - User can choose notes to create their own scale by adding note indiviually
    - User can save their scales with name and share them using URL
    - User can choose between multiple timbres ( metal, wood, synth, etc. )

- Chimes ring more or less rapidly based off the current windspeed in the location of device
    - Under the hood, it gets the user location
    - Uses OpenWeatherMap to get curent windspeed
    - A higher windspeed will cause the chines to ring more rapidly
    - Mouse over will also ring chimes

- Chimes are visualized with SVG that scales with note and will wobble when ringing

### Milestones

- Week 1
    - [x] Get current location and fetch wind speed
    - [x] Create note menu to add notes
    - [x] create note array in top-level component that interates to add indiviual chime component
    - [x] use Web Audio API to play and stop chimes
    - [x] add samples for metal chime sound
    - [x] create placeholder SVG for each chime
    - [x] Ring on mouse over
    - [ ] map to call stopChime on each Chime component on clear button

- Week 2
    - [ ] setup scale presets ( Major, Minor, Javanese Pelog, etc. )
    - [ ] add more timbres / materials ( Bamboo, Synth, etc. )
    - [ ] make dropdown menu to select material
    - [ ] automatically update mateials of chime

- Week 3
    - [ ] Set up saving system that adds user defined scales
    - [ ] Set up cookies to save user defined scales afetr close

- Week 4
    - [ ] Add React Router to add scale and material choices to URL

- Week 5
    - [ ] Polish UI to make a simple and elegant interface
    - [ ] Each chime should have an SVG that is larger for lower notes and different look based on selected material
    - [ ] Create an SVG of a "braket" that "holds" the chimes. This should expand to fit more chimes.

- Week 6
    - [ ] Deploy Web app
    - [ ] Create Electron app
    - [ ] Create PWA