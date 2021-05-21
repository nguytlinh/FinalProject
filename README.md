# FinalProject
Goal: <br/>
Extend assignment 4 to include reflection and translucency (complete by May 17th) <br/>
Might try to incorporate Fresnel equations for more realistic looking images.<br/>
Stretch: <br/>
Experimenting with noise and foam to create water effect (complete by May 19th)<br/>
Keywords: Environment mapping, cube map.<br/>
For the water effect, I was hoping to do something similar to this, but I'm still looking into how exactly:
![water4_0 (1)](https://user-images.githubusercontent.com/75322388/117756939-13a6dc00-b1ed-11eb-8767-9440f5f9eba1.gif)
I'm thinking of applying all techniques above on a human model (transparent water man), and have the water move as shown above.

----------------------------------------------------------------------------------

## Updated Goal and Modifications: 

Since I had problems generating the reflection shaders for assignment 4 as there were many technical file linking issues, on May 17th, I decided to switch to extending assignment 5 instead. <br/>
<br/>
TODO: simulate a sparking bonfire as the unique demo, with expanded camera controls options.
<br/>
(*Referenced*: 洋葱’s paper on OpenGL Transform Feedback, Learn OpenGL website tutorials, YouTube particle system tutorials) <br/>
<br/>
Goal image (for display only): a similar version of the image below, made more realistic such that it grows brighter and then go out through time. <br/>

<img src="https://user-images.githubusercontent.com/75322388/119155442-3329da00-ba21-11eb-98ea-846c2ee720e4.png" width="300" height="300">

## Run: 
Open gitbash containing the directory.

```
FinalProject $ mkdir build
FinalProject $ cd build
FinalProject/build $ cmake -G "Visual Studio 16 2019" ..
FinalProject/build $ start CS312-Particles.sln
```
Even though billboard and confetti are implemented as part of Assignment 5, final project extension is only in the demo. 

```
particles/build $ ../bin/Debug/billboard
particles/build $ ../bin/Debug/confetti
particles/build $ ../bin/Debug/demo
```
## Write-up: 

Assume that the particles all have y value = 0, meaning they are produced at random positions on the OXZ plane and transition in up direction to resemble the flame. First, to create the difference in density of particles: the middle being brighter with more concentrated particles and fewer as we move out. I found an equation to assign the initial position of the particles: 

```
Pos(x)=1/ sqrt(2∗PI∗r) ∗ exp (−(Xi−X0)^2 / (2∗r^2) 
Pos(y)=0 
Pos(z)=1/ sqrt(2∗PI∗r) ∗ exp(−(Zi−Z0)^2 / 2∗r^2) 
```
Above, (X0, Y0, Z0)  is the center of the burning flame, r is radius of the burning zone, and (Pos(x), Pos(y), Pos(z)) is the start position of the flame particles. To simplify this, however, we can associate the size of the flame to value n, and position range of the new particles to n (=10) and Adj_value: 

```
Pos(x)= (∑i=0 -> n) Rand1() ∗ Adj_value 
Pos(y)=0 
Pos(x)= (∑i=0 -> n) Rand2() ∗ Adj_value 
```
Above, Rand1() and Rand2() give different random numbers in the range -1 to 1 inclusive. Adj_value is set manually to adjust the effect. (this could be quite similar to Gaussian normal distribution) <br/><br/>
Second, the speed of the particles needs to be random, but at the same time remains fitted in the shape of the bonfire (using the average method): 
```
InitVelocity = (MaxVelocity − MinVelocity) ∗ rand + MinVelocity 
```
Above, InitVelocity is the initial speed, MaxVelocity and MinVelocity are the fastest and slowest speeds at which a particle moves, rand is random in the range 0 to 1 inclusive. <br/><br/>
Third, when the flame receives a positive force on the y axis, we set the acceleration vector to (0,1,0) to simulate something similar to wind effect. <br/><br/>
I also added code snippets via online tutorials of particle lifetime to simulate the lifetime of the bonfire, modifying the transparency and size of each particle to go brighter and then gradually fade out through time. This could not be checked effective or not as result was not delivered fully. Texture samples were downloaded from online tutorials to create a flare and spark visual effect as the particles move up, implemented to simulate prettier bonfire,spark particles could be seen in the result. <br/><br/>
Finally, I added a few camera control options, including WSAD keys and left click with mouse pointer, following guidance on Learn OpenGL website tutorials.<br/>


## Results:
The program builds and runs without errors, however desired result is not reached.<br/>
There are sparks that flash in the resulting screen that can be seen, but very few and random. (Screen recording will be updated asap, I have not found a way to record my laptop.) It seems there exists a placement error of the camera and the image, or something is wrong with the algorithm that I have yet to find out. <br/>
Although the goal of creating a bonfire with particle system is not yet reached, I tried to incorporate as many things I could absorb as possible that I came across during my research dig for the project to make the image look more realistic, so I’m already satisfied that it ran without errors. 



