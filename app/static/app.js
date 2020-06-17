var app = new Vue({
  el: '#app',
  data: { 
    painting:false,
    canvas:null,
    ctx:null,
    x:null,
    y:null,
    output: '',
    buttonimg: 'clear.png',
    categories: [0,1,2,3,4,5,6,7,8,9],
    probs: Array(10).fill(0) // Initial probabilities are zero
  },
  methods: {
    startPainting(e) {
      this.painting = true;
      this.draw(e)
    },
    finishedPainting() {
      this.painting = false;
      this.ctx.beginPath()
      // Call analyze function after every "brush stroke"
      this.analyze()
    },
    draw(e, posX, posY) {
      // We only want to draw if mouse is pressed, therefore:
      if(!this.painting) return

      // Set drawing style
      this.ctx.lineWidth = 25;
      this.ctx.lineCap ="round"
      this.ctx.strokeStyle = "white"

      // Calculate cursor position relative to canvas
      let rect = this.canvas.getBoundingClientRect();
      x = posX-rect.left
      y = posY-rect.top

      // Draw
      this.ctx.lineTo(x,y)
      this.ctx.stroke()
      this.ctx.beginPath()
      this.ctx.moveTo(x,y)
    },
    draw_mouse(e) {
      // Get cursor position and call draw function
      posX = e.clientX
      posY = e.clientY
      this.draw(e, posX, posY)
    },
    draw_touch(e) {
      // Get touch position and call draw function
      posX = e.touches[0].clientX
      posY = e.touches[0].clientY
      this.draw(e, posX, posY)
    },
    clear(e) {
      // Fill canvas with black rectangle
      this.ctx.fillStyle = "black";
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

      // Clear output, set probabilities to zero
      this.output = ''
      this.probs = Array(10).fill(0)
    },
    analyze() {
      uploadFiles = dataURLtoBlob(canvas.toDataURL())
      this.buttonimg = "loading.gif"
      var self = this
      var xhr = new XMLHttpRequest();
      var loc = window.location;
      xhr.open("POST", `${loc.protocol}//${loc.hostname}:${loc.port}/analyze`,
        true);
      xhr.onerror = function() {
        alert('An error occured'+xhr.responseText);
        self.buttonimg = "clear.png"
      };
      xhr.onload = function(e) {
        if (this.readyState === 4) {
          var response = JSON.parse(e.target.responseText);
          self.probs = []
          for (let [key, value] of Object.entries(response.probs)) {
            self.probs.push(value)
          }
          self.output = response.result
          self.buttonimg = "clear.png"
        }
      };

      var fileData = new FormData();
      fileData.append("file", uploadFiles); // [0]
      xhr.send(fileData);
    }
  },
 mounted() {
  this.canvas = document.getElementById("canvas");
  this.ctx = canvas.getContext("2d");  
  this.wrapper = document.getElementById("canvaswrapper");

  // Resize canvas
  this.canvas.width = this.wrapper.offsetWidth;
  this.canvas.height = this.wrapper.offsetHeight;

  // Fill canvas with black background
  this.ctx.fillStyle = "black";
  this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
}
})