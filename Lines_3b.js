//lines_3b, see documentation for more detatails
//by emilie bouchard fortier
//and scott monk



class Lines_3b {


    constructor(xpos, ypos, nbRadialMarkers, radialLineLength, radialLineStartRadius, nbLinesPerMarker, radialLinesOffset, nbConcentricLines, concentricLineInnerRadius, concentricLinesOffset, concentricStartAngle, concentricEndAngle, lineWidth ) {
        //constructor takes what was passed, this is fine. 
        
        this.xpos = xpos;
        this.ypos = ypos;
        this.nbRadialMarkers = nbRadialMarkers;        
        this.radialLineLength = radialLineLength;
        this.radialLineStartRadius =radialLineStartRadius;
        this.nbLinesPerMarker = nbLinesPerMarker;
        this.radialLinesOffset = radialLinesOffset;
        this.nbConcentricLines = nbConcentricLines;
        this.concentricLineInnerRadius = concentricLineInnerRadius;
        this.concentricLinesOffset = concentricLinesOffset;
        this.concentricStartAngle = concentricStartAngle;
        this.concentricEndAngle = concentricEndAngle;
        this.lineWidth = lineWidth;


        this.slider_variable_list = [];
        this.slider_variable_list_is_init = 0;

        // this.slider_list = slider_array;

        this.lineCap = createCheckbox('Rounded Cap', false)
        strokeCap(SQUARE)

                
    }

    refresh_sliders(master_slider_list){
        this.master_slider_list = master_slider_list;
        if(this.slider_variable_list_is_init == 0){

            //this is the real hardcoded crap
        
            this.slider_variable_list[0] = new slider_variable(master_slider_list, 0, "nb radial markers", this.nbRadialMarkers, 2, 20, "int"  );
            this.slider_variable_list[1] = new slider_variable(master_slider_list, 1, "radial line length", this.radialLineLength, 4, 100, "float"  );
            this.slider_variable_list[2] = new slider_variable(master_slider_list, 2, "radial line inner radius", this.radialLineStartRadius, 5, 200, "float"  );
            this.slider_variable_list[3] = new slider_variable(master_slider_list, 3, "lines per marker", this.nbLinesPerMarker, 1, 5, "int"   );
            this.slider_variable_list[4] = new slider_variable(master_slider_list, 4, "radial line offset", this.radialLinesOffset, 1, 20, "float"  );
            this.slider_variable_list[5] = new slider_variable(master_slider_list, 5, "nb concentric lines", this.nbConcentricLines, 1, 5 , "int"  );
            this.slider_variable_list[6] = new slider_variable(master_slider_list, 6, "inner radius concentric", this.concentricLineInnerRadius, 5, 200, "float"  );
            this.slider_variable_list[7] = new slider_variable(master_slider_list, 7, "concentric line offset", this.concentricLinesOffset, 1, 20, "float"  );
            this.slider_variable_list[8] = new slider_variable(master_slider_list, 8, "concentric start angle", this.concentricStartAngle, 90, 270, "float"  );
            this.slider_variable_list[9] = new slider_variable(master_slider_list, 9, "concentric end angle", this.concentricEndAngle, 270, 450, "float"  );
            this.slider_variable_list[10] = new slider_variable(master_slider_list, 10, "line width", this.lineWidth, 1, 10, "float"  );           
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
            this.nbRadialMarkers = this.slider_variable_list[0].variable_value; 
            this.radialLineLength = this.slider_variable_list[1].variable_value;
            this.radialLineStartRadius = this.slider_variable_list[2].variable_value;;
            this.nbLinesPerMarker = this.slider_variable_list[3].variable_value;
            this.radialLinesOffset = this.slider_variable_list[4].variable_value;
            this.nbConcentricLines = this.slider_variable_list[5].variable_value;
            this.concentricLineInnerRadius = this.slider_variable_list[6].variable_value;
            this.concentricLinesOffset = this.slider_variable_list[7].variable_value;
            this.concentricStartAngle = this.slider_variable_list[8].variable_value;
            this.concentricEndAngle = this.slider_variable_list[9].variable_value;
            this.lineWidth = this.slider_variable_list[10].variable_value;

        }

    }
    //old/depricated
    displaySliders(){

        // fill(0);

        // for(let i = 0; i < this.slider_list.length; i++){

        //     this.slider_list[i][0].position(130, 10 + (i  * 20) );
        //     text(this.slider_list[i][1], 5, this.slider_list[i][0].y + 10);
        //     text(this.slider_list[i][0].value(), this.slider_list[i][0].width + this.slider_list[i][0].x, this.slider_list[i][0].y +10)


        // }


        // //Display the checkbox to change the line cap

        // this.lineCap.changed(toggleCap)

        // function toggleCap(){
        //     if(this.checked()) strokeCap(ROUND)
        //     else strokeCap(SQUARE)

        // }


    }





    show(){


        let centerX = this.xpos;
        let centerY = this.ypos;
    
        push();
        translate(centerX, centerY +50)
        strokeWeight(3)
        stroke(0)
        //strokeCap(this.cap)
        line( -5, 0, 5, 0)              //Makes a little cross in the middle of the canevas
        line ( 0, -5, 0, 5)

        //radial line loop

        //we need 2 angles, the angles between radial lines of the sam marker (if any) and the distance between groups of radial lines

        var angle_sum_of_radial_markers = (this.nbLinesPerMarker - 1) * this.radialLinesOffset * this.nbRadialMarkers;
        var total_arc_angle = this.concentricEndAngle - this.concentricStartAngle;
        var inter_marker_angle = (total_arc_angle - angle_sum_of_radial_markers) / ( this.nbRadialMarkers - 1 );


        for( let j = 0; j < this.nbRadialMarkers; j++ ){

            for( let k = 0; k < this.nbLinesPerMarker; k++ ){
                let temp_angle = this.concentricStartAngle + j*inter_marker_angle + k*this.radialLinesOffset + j * this.radialLinesOffset * (this.nbLinesPerMarker - 1) ;
                let lineP1X = cos(temp_angle) * this.radialLineStartRadius;
                let lineP1Y = sin(temp_angle) * this.radialLineStartRadius;
                let lineP2X = cos(temp_angle) * (this.radialLineStartRadius + this.radialLineLength)
                let lineP2Y = sin(temp_angle) * (this.radialLineStartRadius + this.radialLineLength)
                strokeWeight(this.lineWidth)
                line(lineP1X, lineP1Y, lineP2X, lineP2Y)                

            }
        }
        
        //concentric line loop

        for( let j = 0; j < this.nbConcentricLines; j++ ){
            noFill();
            arc( 0, 0, (this.concentricLineInnerRadius + j*this.concentricLinesOffset)*2, (this.concentricLineInnerRadius + j*this.concentricLinesOffset)*2, this.concentricStartAngle, this.concentricEndAngle )
            //for progressive offsets, something for teh future
            // arc( 0, 0, (this.concentricLineInnerRadius + j*this.concentricLinesOffset)*2, (this.concentricLineInnerRadius + j*this.concentricLinesOffset)*2, this.concentricStartAngle + 10*j, this.concentricEndAngle+ 10*j )
            // arc(0, 0, this.arcSize, this.arcSize, this.startAngle, this.endAngle )
        }

        pop();


       

      
    }   

}