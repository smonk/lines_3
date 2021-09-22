let line1;
let svgButton

 

function setup() {
  createCanvas(600, 650, SVG);        // The P5.svg Library will work only if you specify  the stroke weight and color like bellow
  strokeWeight(1)
  stroke(0);
  frameRate(60)
  line1 = new Lines_3(7, 10, 100, 2, 4, 2, 95, 10, 120, 420, 2)
  angleMode(DEGREES)
  svgButton = createButton('SVG')
  
  

  

}

function draw() {
  
 
  
  background(220);
  line1.show();
  line1.displaySliders()
  svgButton.mousePressed(saveMySVG)
 
  
  


}

function saveMySVG(){

  background(255);
  line1.show();

  save('myLine3Knob')

}

// function mousePressed() {
//   clear();
// }





