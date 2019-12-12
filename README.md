# __Safacon's VR Hackysack__ #
![Demo Gif](/src/vr-hackysack-large.gif)

__[Play Now](https://play.safacon.com/vr_hackysack/)__

___

## About ##
A Virtual Reality Hackysack game prototype playable over the web. Use your virtual legs to keep the sack up. Best experienced with a VR Headset.

Uses the [A-Frame](https://aframe.io/) web framework for VR.

__Controls:__  
Kicks - S D F J K L  
Launch - Space  
Reset - R

## Scripts ##
__hack-preload.js__ -  Components that need do be loaded before the game scene is loaded. Custom [A-Frame components](https://aframe.io/docs/master/introduction/writing-a-component.html) that generate and modify Three.js materials to apply to the glTF models.  
__hack-main.js__ -  The main game loop, button input, animation and other main functionality.  
__hack-kicks.js__ - The raycasting and physics involved with each kick.  
__hack-domeManager.js__ - Manages the rotation for each of the wireframe domes.  
__hack-creditsManager.js__ - Manages the 'credits' and 'controls' information display, rotating them out of the scene when the player is playing and back in after the player is idle.  
__hack-songManager.js__ -  Manages the song, adding layers to the music as the player's streak gets longer.


## Kicks ##

__Kick Accuracy__

The X force applied by each kick is determined by where the sack hits the kick ray compared to the kick ray's Hit Point (kick.hitPoint). For example here is a diagram showing the X force that would be applied by a kick on the player's left:

![Left Kick Diagram](/src/leftkick.png)

Knee hits (kick.type === 'KNEE') launch the sack away from the Hit Point based on the sack distance from the Hit Point:

![Knee Diagram](/src/knee.png)

The xVeloFix() function adds a small but cumulative amount of X force if the X force is below a certain value. This fixes the tendency of a hit at or near the hit point to land back at the hit point causing the sack to go straight up and down continuously.

__Kick Timing__

A well timed kick hits the sack between 70 ms and 150 ms after the player presses the button. If the kick is too early or too late it applies a relative multiplier to the X force and KickForce (or Y force). That is, early and late hits go farther out and not as high.

## 3D ##

The Blender 3D .blend files are found in the src folder. The models folder contains the exported glTF (.glb) files for use with A-Frame.
___
_Thanks to Jayson G. for testing VR Headset functionality and providing the demo video shown above._
