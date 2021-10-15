class Dots_1b {


    constructor(xpos, ypos, nbDots, startAngle, endAngle, radius, dotSize, dotContour, fill) {

        this.xpos = xpos;
        this.ypos = ypos;
        this.nbDots = nbDots // numbver of dots around the perimiter
        this.startAngle = startAngle
        this.endAngle = endAngle
        this.radius = radius  //radius of the circly the dots are drawn onto
        this.fill = fill;     // are the dots filled or empty
        this.dotSize = dotSize; // size of the dots themselves
        this.dotContour = dotContour; //thickness of the dot outlines. 

        this.slider_variable_list = [];
        this.slider_variable_list_is_init = 0;

        //print("constructor call, fill = " + this.fill)

        // this.nbDotSlider = createSlider(4, 20, nbDots, 1)
        // this.dotSizeSlider = createSlider(2, 30, dotSize, 1)
        // this.circleSizeSlider = createSlider(20, 200, radius, 1)
        // this.startAngleSlider = createSlider(90, 270, startAngle, 1)
        // this.endAngleSlider = createSlider(270, 450, endAngle, 1)
        // this.dotContourSlider = createSlider(0, 10, dotContour, 1)

        this.fillButton = createCheckbox("Filled", fill)
                
    }

    refresh_sliders(master_slider_list){
        this.master_slider_list = master_slider_list;
        if(this.slider_variable_list_is_init == 0){
            this.slider_variable_list[0] = new slider_variable(master_slider_list, 0, 'Number of Dots', this.nbDots, 4, 20, "int"  );
            this.slider_variable_list[1] = new slider_variable(master_slider_list, 1, 'Start Angle', this.startAngle, 90, 270, "float"   );
            this.slider_variable_list[2] = new slider_variable(master_slider_list, 2, 'End Angle', this.endAngle, 270, 450, "float"  );
            this.slider_variable_list[3] = new slider_variable(master_slider_list, 3, 'Circle Radius', this.radius, 20, 200, "float"  );
            this.slider_variable_list[4] = new slider_variable(master_slider_list, 4, 'Dots Size', this.dotSize, 2, 30, "float"  );
            this.slider_variable_list[5] = new slider_variable(master_slider_list, 5, 'Dot Contour', this.dotContour, 0, 10 , "int"  );
            this.slider_variable_list_is_init = 1;
        }            


        //but then its so nice
        for( let i = 0; i < this.slider_variable_list.length; i++){
            this.slider_variable_list[i].display_slider_name();
            this.slider_variable_list[i].read_from_slider();
            this.slider_variable_list[i].display_slider_value();
            // print(i);
        }
        this.map_slider_values_to_design_parameters();
    

    }


    map_slider_values_to_design_parameters(){
        if(this.slider_variable_list_is_init == 0){
        //just return if the list is not created/initialized yet
            return -1;
        }else{
        //more hard coded crap, must match with hard coded crap in refresh_sliders()
            this.nbDots = this.slider_variable_list[0].variable_value; 
            this.startAngle = this.slider_variable_list[1].variable_value;
            this.endAngle = this.slider_variable_list[2].variable_value;;
            this.radius = this.slider_variable_list[3].variable_value;
            this.dotSize = this.slider_variable_list[4].variable_value;
            this.dotContour = this.slider_variable_list[5].variable_value;

        }

    }

    //depricated/delete
    displaySliders(){

        fill(0)

        
        // this.nbDotSlider.position(100, 10)
        // text('Number of Dots', 5, this.nbDotSlider.y +10 );
        // text(this.nbDotSlider.value(), this.nbDotSlider.width + this.nbDotSlider.x, this.nbDotSlider.y +10)
        

        // this.dotSizeSlider.position(100, 30)
        // text('Dots Size', 5, this.dotSizeSlider.y +10 );
        // text(this.dotSizeSlider.value(), this.dotSizeSlider.width + this.dotSizeSlider.x , this.dotSizeSlider.y+10)

        // this.circleSizeSlider.position(100, 50)
        // text('Circle Size', 5, this.circleSizeSlider.y +10);
        // text(this.circleSizeSlider.value(), this.circleSizeSlider.width + this.circleSizeSlider.x, this.circleSizeSlider.y+10)

        // this.startAngleSlider.position(100, 70)
        // text('Start Angle', 5, this.startAngleSlider.y +10 );
        // text(this.startAngleSlider.value(), this.startAngleSlider.width + this.startAngleSlider.x, this.startAngleSlider.y+10)

        // this.endAngleSlider.position(100, 90)
        // text('End Angle', 5, this.endAngleSlider.y +10 );
        // text(this.endAngleSlider.value(), this.endAngleSlider.width + this.endAngleSlider.x, this.endAngleSlider.y+10)

        // this.dotContourSlider.position(100, 110)
        // text('Dot Contour', 5, this.dotContourSlider.y +10 );
        // text(this.dotContourSlider.value(), this.dotContourSlider.width + this.dotContourSlider.x, this.dotContourSlider.y+10)


    }





    show(){


        let centerX = width/2
        let centerY = height/2
        let tempAngle = this.startAngle
        // These variables depend on the value on the slider
        // this.dotSize = this.dotSizeSlider.value()
        // this.radius = this.circleSizeSlider.value()
        // this.nbDots = this.nbDotSlider.value()
        // this.startAngle = this.startAngleSlider.value()
        // this.endAngle = this.endAngleSlider.value()
        // this.dotContour = this.dotContourSlider.value()


        //Determine the size of the angles in between each dots
        let stepAngle = (this.endAngle-this.startAngle)/(this.nbDots-1)

        if(this.fillButton.checked()){
            //print( "fill box checked")
            this.fill = 1
        }
        else{
           // print( "fill box not checked")
            this.fill = 0
        }

        


        push();
        translate(centerX, centerY)
        strokeWeight(3)
        stroke(0)
        strokeCap(ROUND)
        line( -5, 0, 5, 0)
        line ( 0, -5, 0, 5)
      

        for(let j = 0; j < this.nbDots; j++ ){
            
            if(this.fill == 1) fill( 0 , 0, 0)
            else fill(255, 255, 255)

            

            let dotX = cos(tempAngle) * this.radius
            let dotY = sin(tempAngle) * this.radius
            strokeWeight(this.dotContour)
            circle(dotX, dotY, this.dotSize);
            
            tempAngle += stepAngle;
            



        }

        pop();

      
    }   

}