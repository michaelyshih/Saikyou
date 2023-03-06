# Saikyou

[Live Site] (https://michaelyshih.github.io/Saikyou/)

## Objective: ##


* creative/ achievable project plan
    * Adjust it as opportunity and roadblocks arise
* Evaluate / compare diff tech/services for use in a project
* Interpret doc / experiment/ utilize new tech and services
* Analyze error/ debug/ test
* Organize code into modular/ classes / files

## Overview: ##


&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; MyAnimeList is a very extensive encyclopedia and forum that allows users to look up anime with many sorting options, but they do not have a section to show the most popular shows (based on members watching) of each year. This project is an attempt to display the top 3 popular anime, manga, anime music of each year for the last 5 years.
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; The project allows you to scroll through a timeline in 3d space exploring the last 5 years and look at the most popular anime / manga/ music of that year. You could select year by scrolling slider or by selecting them. When clicked, the item you picked will display the information of the anime with links and details to external sites where you could explore more.
<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Bonus: perspective on the background to increase immersion when traversing 3d space and view the animation as if they are tv panels in landscape

## Feature: ##


In Saikyou, users will be able to:
- Browse top 3 anime of the past 5 years in timeline
- navigate between top 3 manga/ top 3 anime/ top from nav bar
- navigate to a specific year by scrolling or from selecting
- switch back and forth webpage of details and 3D background with timeline

In addition, this project will include:
- ability to switch details of display body depending on the content selected
- ability to see trailer playing when hovering over video

## Wireframes: ##


- https://wireframe.cc/qo22RQ
	- lines will eventually be a curved path in 3D space

## Technologies, Libraries, APIs: ##


- three js for importing the scene
- papaparse to parse csv data

## Potential APIs: ##


- blender to create simple models if need to
- jikan api to grab anime info
- youtube API to gran music info

## Implementation Timeline: ##


- Friday Afternoon
	- have the library of things that o need
		- save the in array corresponding to their fetched back data
	- reading through all the docs
		- finding all the poly that i might use as the scene images
		- importing gtlf files from
		- for setting up meshes, 3D space.
		- dispalying videos on mesh
	- finish researching the datas in the top list needed for the display

- Saturday
	- morning
	 	- have replicable mesh plates setup and in their proper places
		- have the default webpage view of zoomed video and details setup
	- afternoon
		- work on getting the videos to be textured onto the mesh
- Sunday
	- morning
		- have a textured mesh working and be able to replicate it to all mesh plates holding videos
	- afternoon
		- work on raycasting to have the mesh responds to handle click and unhide/ hide the zoomed display
- Monday
	- morning
		- have the zoomed display change depending on where the click happened
	- afternoon
		- have the nav bar working to change camera from one time line to another
- Tuesday
	- mornign
		- have the timeline working to change the camera from one year plane to another year plane.
	- afternoon
		- finishing up, any attempt at bonus should be done here.
- Wednesday
	- morning
		- final attempts at the bouns, or adding bloom/ effects to mesh
	- afternoon
		- make sure everything is hosted and working, confirm with TA and
- Thursday
	
## Bonus Features (Optional): ##


- having flip animation for the book meshes
- having meshs for the music that can play on discs
