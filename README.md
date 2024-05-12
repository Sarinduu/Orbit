[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/V1F4A3D5)

# IT21479632 - Wijekoon W.M.K.G.S.S.B

## Application Setup
## Pre-requisites
recommended: make sure you have react install facility installed : 
open terminal and run command:

```javascript
npm install -g create-react-app
```

## Installation Setup:
1. Open the project in VS Code
2. change the directory to client
```javascript
cd client
```
3. Run npm installation command
```javascript
npm install
```
## Build and Run Setup
1. Run npm build command (recommended)
```javascript
npm run build
```
2. Run npm start command to start
```javascript
npm run start
```
## test setup
1. Check out to test branch.
2. Open a terminal.
3. Run npm run test command
```javascript
npm run test
```
## used Nasa Api
View Api documentaion:[NASA API](https://api.nasa.gov/).

### Apod
how to use Api: This api retreive a daily photo from nasa web site.(Astronomical picture of the day). Only one image will show at one time and user can pick a date from the given datepicker component and view the image along with a title and a discription.

challenges : cannot retrive images to a given date that is before 4 decades ago, and from future dates
Solution : date picker start date set to 2000-01-01, end date set to today

### Asteroids - NeoWs API

How to use API: The NeoWs (Near Earth Object Web Service) API retrieves satellite images for a given longitude, latitude, and date. Only one image will be shown.

Challenges: For most data inputs, there will be no output images since the satellite images are based on United States longitudes and latitudes.

Solution: Show an error message if the data are not retrieved.

### Solar System Bodies API

How to use API: This API retrieves information about various celestial bodies in the solar system.

Challenges:** Hard to render all the images since lots of images are retrieved at once.

Solution: Use Material UI Image list and pagination to limit the images in one page.

### other functionalities
1. User can register to the web application.
2. User can login to the web application.

## used technologies
1. React
2. Google Firebase
3. Ant design
4. NASA Public APIs


If you have any concerns: mail: IT21479632@my.sliit.lk
