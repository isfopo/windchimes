# Windchimes

### Overview

A peaceful windchime that will run in the browser or standalone app. Using your device's current location this program will use OpenWeatherMap to look up the surrounding windspeed to increase the ringing rate of the chimes. The user can then choose from predetermined notes or choose their own, save them or share their set of chimes.

### Technical Summary

- React/Javascript
- Tone.js
- JSS
- React Cookie ( to save user scales )
- React Router ( share user scales )
- React Rebound ( to make the chimes vibrate )
- Electron ( to make standalone app )
- PWA ( built into create-react-app )

### APIs Used

- OpenWeatherMap
- Geolocation API
- Web Audio API ( via Tone.js )

### Feature List

- Customizable, save-able and share-able sets of chimes
    - User can choose from predetermined scales
    - User can choose notes to create their own scale by adding note individually
    - User can save their scales with name and share them using URL
    - User can choose between multiple timbres ( metal, wood, synth, etc. )

- Chimes ring more or less rapidly based off the current windspeed in the location of device
    - Under the hood, it gets the user location
    - Uses OpenWeatherMap to get current windspeed
    - A higher windspeed will cause the chines to ring more rapidly
    - Mouse over will also ring chimes

- Chimes are visualized with SVG that scales with note and will wobble when ringing

### Milestones

- Week 2
    - [x] Get current location and fetch wind speed
    - [x] Create note menu to add notes
    - [x] create note array in top-level component that iterates to add individual chime component
    - [x] use Web Audio API to play and stop chimes
    - [x] add samples for metal chime sound
    - [x] create placeholder SVG for each chime
    - [x] Ring on mouse enter

- Week 3
    - [x] setup scale presets ( Major, Minor, Javanese Pelog, etc. )
    - [x] make dropdown menu to select preset scales
    - [x] Set up saving system that adds user defined scales
    - [x] Set up cookies to save user defined scales after close

- Week 4
    - [x] add more timbres / materials ( Bamboo, Synth, etc. )
    - [x] make dropdown menu to select material
    - [x] automatically update materials of chime

- Week 5
    - [x] Add React Router to add scale choices to URL
    - [ ] Fix bugs

- Week 6
    - [x] Polish UI to make a simple and elegant interface
    - [x] Dynamic color palette that changes based off of type of material selected
    - [x] Each chime should have an SVG that is larger for lower notes and different look based on selected material 
    - [x] Create an SVG of a "bracket" that "holds" the chimes.
    - [x] Chime graphics vibrate while ringing

- Week 7
    - [ ] Deploy Web app
    - [ ] Create Electron app
    - [ ] Create PWA

- Known Bugs
    - [x] Scales menu only updates on second time a scale is chosen
    - [x] Existing chimes shift octave when octave is changed - should ony effect new chimes
    - [x] Lat and lon are undefined when getWindspeed is called
    - [x] Url does not specify octave of each chime. Defaults to 4, but if an octave number is put in it still has a 4 at the end
    - [x] Saving and recalling a scale puts all chimes in octave 4
    - [x] Limit octaves between 2 - 6
    - [x] user can make unlimited chimes
    - [x] Changing the scale sometimes does not stop chimes from previous scale for playing - cleanup in chime components not always happening
    - [x] buffer will fail if too many chimes are create and destroyed at once
    - [x] Animation will engage before user interaction, sound will not. As a result, there are animations without sound
    - [x] saved scales will only appear in menu after page is refreshed
    - [x] size not updating when chime is changed

- Ideas
    - [x] Set that chimes do not play until user interacts
    - [x] When there are no chimes, do not show bracket and display a quick tutorial

- To-Dos
    - [x] create "themes" object that will define color themes for each material
      - [x] in separate file called 'themes.js' in resources folder
      - [x] create function in Chimes.js that changes current theme object when material is changed
      - [x] this object will be passed to:
        - [x] body
        - [x] app
        - [x] menus
        - [x] buttons
        - [x] chimes
        - [x] chime bracket
    - [x] choose color themes
    - [x] refactor note buttons using .map()
    - [x] make logo and title