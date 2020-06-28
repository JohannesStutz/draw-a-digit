# Draw a digit
Live Version: https://draw-a-digit.onrender.com

This web app recognizes written digits. It's my first try to deploy a deep learning model :)  
 
The frontend is a Vue.js app, it runs on desktop as well as mobile browsers. The algorithm for digit recognition is a ResNet18 (probably overpowered for the job and therefore quite slow), trained on the MNIST dataset with fast.ai.  
 
![alt text](https://github.com/JohannesStutz/draw-a-digit/blob/master/animation.gif?raw=true)
 
Thanks to render.com for their starter app for fast.ai: https://github.com/render-examples/fastai-v3  
Thanks to Wisdom Ekpot, I used his code as a basis for the canvas: https://github.com/Wisdom132/Simple-paint-app-with-vuejs-and-canvas-api
