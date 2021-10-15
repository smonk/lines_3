// let line1;
let svgButton

 
let test_s_v;
function setup() {
  createCanvas(600, 650, SVG);        // The P5.svg Library will work only if you specify  the stroke weight and color like bellow
  strokeWeight(1)
  stroke(0);
  frameRate(60)
  // line1 = new Lines_3(400, 200, 7, 10, 100, 2, 4, 2, 95, 10, 120, 420, 2)
//  line2 = new Lines_3(200, 100, 7, 10, 100, 2, 4, 2, 95, 10, 120, 420, 2)

  line1 = new Lines_3b(300, 325, 10, 10, 100, 2, 4, 2, 95, 10, 120, 420, 2)
 
  dots1 = new Dots_1b(300, 325, 10, 120, 420, 35, 5, 10, 1 );


  my_multi = [line1, dots1];
  
  
  angleMode(DEGREES)

  // this creates the list of p5.js slider objects that are shared by all the other graphic design objects.
  slider_list = new master_slider_list(11);
  
  // this method actually lays out the sliders on the screen
  slider_list.display_sliders();

  // this method puts the graphic selector on the screen.
  slider_list.display_drop_down_menus();


  svgButton = createButton('SVG')
  
  // in affinity the scale is 72 dpi so 72 pixels = 1 inch

  

}

function draw() {
  
 
  
  background(220);
  

  // test_s_v.display_slider_name();
  // test_s_v.display_slider_value();
  // test_s_v.read_from_slider();
  // test_s_v.clear_display_slider_name();
  // line1.show();
  // line1.refresh_sliders(slider_list);
  
  // dots1.show();
  // dots1.refresh_sliders(slider_list);
  // line2.show();
  // removeElements();
  // line1.displaySliders()

  temp = slider_list.poll_drop_down_menus();

  if( temp == "line"){
    line1.show();
    line1.refresh_sliders(slider_list);    
  }else if (temp == "dot"){
     
    dots1.show();
    dots1.refresh_sliders(slider_list);
  }
  svgButton.mousePressed(saveMySVG)
  // saveMySVG();
  // noLoop();
  


}

function saveMySVG(){

  background(255);
  line1.show();
  // line2.show();
  save('myLine3Knob')

}

// function mousePressed() {
//   clear();
// }





