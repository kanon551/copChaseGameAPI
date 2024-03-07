# Outline: 
A notorious criminal escape artist has vanished again. However, the criminal may be hiding in only one of the possible 5 neighbouring cities. 3 fearless cops have volunteered in capturing the fugitive hiding and they need your help!

## Technologies:
Frontend: Vue, React, or Angular (Choose one)
Backend: NodeJS

## Gameplay:
City Selection: Each cop independently chooses one city from below to investigate:
City Distance from current city
Yapkashnagar 60 KM
Lihaspur 50 KM
Narmis City 40 KM
Shekharvati 30 KM
Nuravgram 20 KM



## Vehicle Selection: Based on the chosen city's distance, each cop selects an electric vehicle considering its range and availability:
Kind       Range    Count 
EV Bike    60 KM    2
EV Car     100 KM   1
EV SUV     120 KM   1


## Result: The system determines if any cop successfully found the fugitive (simulated). If found, it displays the name of the cop who made the successful capture.






## Technical Requirements:

Frontend:

Develop screens for below:
Start/Landing page
Selection of city for each cop
Selection of vehicle options for each cop.
Result page indicating the capture status and, if successful, the capturing cop's name.

Backend (NodeJS):

Use correct data structures to store city names, distances, and vehicle properties (range, count) and CRUD operations for the same.
Simulate the fugitive's location in one of the cities (randomly).
Based on cop choices and simulated location, determine if any cop successfully captured the fugitive.

ReadMe:
Solution must contain a ReadMe file
Any assumptions made with the requirements must be clearly stated.
Build steps must be provided.


Note:
Vehicle must have enough range for a round trip.
City selections must be unique for each cop.
Do not use actual database connections. Use in-memory data structures for simplicity.
Focus on clean code, modularity, and maintainability.
Authentication & Authorization not required.
The app must be deployed online. You may use a free service such as netlify for the same.
UI must be responsive
Bonus points for unit testing.
Bonus points for Clean UI/UX.
No mock UI. Candidates are free to use their imagination.
Next page contains assets that may be used (Not mandatory, feel free to be creative).

