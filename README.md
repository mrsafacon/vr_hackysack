### About: ###
A Virtual Reality Hackysack game prototype playable over the web. Use your virtual legs to keep the sack up. Best experienced with a VR Heaset.

Uses the [A-Frame](https://aframe.io/) web framework for VR.

![Demo Gif](/src/vr-hackysack-large.gif)

__[Play Now](https://play.safacon.com/vr_hackysack/)__

### Scripts: ###
__hack-preload.js__ -  AFrame custom components  
__hack-main.js__ -  The main game loop, button input and other main functionality  
__hack-kicks.js__ - The raycasting and physics involved with each kick  
__hack-domeManager.js__ - Manages the rotations of each of the wireframe domes  
__hack-creditsManager.js__ - Manages the credits and controls objects, rotating them out of the scene when the player is playing and back in after the player is idle  
__hack-songManager.js__ -  Manages the song, adding layers to the music as the player's streak goes on


### 3D: ###

The Blender 3D .blend files are found in the src folder. The models folder contains the exported glTF (.glb) files for use with AFrame.
