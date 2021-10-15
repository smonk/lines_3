// let line1;
let svgButton

 
let test_s_v;
function setup() {
  createCanvas(600, 650, SVG);        // The P5.svg Library will work only if you specify  the stroke weight and color like bellow
  strokeWeight(1)
  stroke(0);
  frameRate(60)
  // line1 = new Lines_3(400, 200, 7, 10, 100, 2, 4, 2, 95, 10, 120, 420, 2)

  // line2 = new Lines_3(200, 100, 7, 10, 100, 2, 4, 2, 95, 10, 120, 420, 2)

  line1 = new Lines_3b(300, 325, 10, 10, 100, 2, 4, 2, 95, 10, 120, 420, 2)
 

  angleMode(DEGREES)
  slider_list = new master_slider_list(11);
  slider_list.display_sliders();
  slider_list.display_drop_down_menus();
  // test_s_v = new slider_variable(slider_list.slider_array, 0, "test", 1, -50, 50 );

  svgButton = createButton('SVG')
  
  // in affinity teh scale is 72 dpi so 72 pixels = 1 inch

  

}

function draw() {
  
 
  
  background(220);
  

  // test_s_v.display_slider_name();
  // test_s_v.display_slider_value();
  // test_s_v.read_from_slider();
  // test_s_v.clear_display_slider_name();
  line1.show();
  line1.refresh_sliders(slider_list);
  // line2.show();
  // removeElements();
  // line1.displaySliders()

  slider_list.poll_drop_down_menus();
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





