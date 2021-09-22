//lines_3, see documentation for more detatails
//by emilie bouchard fortier
//and scott monk


class Lines_3 {


    constructor(nbRadialMarkers, radialLineLength, radialLineStartRadius, nbLinesPerMarker, radialLinesOffset, nbConcentricLines, concentricLineInnerRadius, concentricLinesOffset, concentricStartAngle, concentricEndAngle, lineWidth ) {

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

        this.nbRadialMarkersSlider = createSlider(2, 20, nbRadialMarkers, 1 );
        this.radialLineLengthSlider = createSlider(4, 100, radialLineLength, 1 );
        this.radialLineStartRadiusSlider = createSlider(5, 200, radialLineStartRadius, 1 );
        this.nbLinesPerMarkerSlider = createSlider(1, 5, nbLinesPerMarker, 1 );
        this.radialLinesOffsetSlider = createSlider(1, 20, radialLinesOffset, 1 );
        this.nbConcentricLinesSlider = createSlider(1, 5, nbConcentricLines, 1 );
        this.concentricLineInnerRadiusSlider = createSlider(5, 200, concentricLineInnerRadius, 1 );
        this.concentricLinesOffsetSlider = createSlider(1, 20, concentricLinesOffset, 1 );
        this.concentricStartAngleSlider = createSlider(90, 270, concentricStartAngle, 1 );
        this.concentricEndAngleSlider = createSlider(270, 450, concentricEndAngle, 1 );
        this.lineWidthSlider = createSlider(1, 10, lineWidth, 1 );


        const slider_array = [ 
            [this.nbRadialMarkersSlider, "nb radial markers"],
            [this.radialLineLengthSlider, "radial line length"],
            [this.radialLineStartRadiusSlider, "radial line inner radius"],
            [this.nbLinesPerMarkerSlider, "lines per marker"],
            [this.radialLinesOffsetSlider, "radial line offset"],
            [this.nbConcentricLinesSlider, "nb concentric lines"],
            [this.concentricLineInnerRadiusSlider, "inner radius concentric"],
            [this.concentricLinesOffsetSlider, "concentric line offset"],
            [this.concentricStartAngleSlider, "concentric start angle"],
            [this.concentricEndAngleSlider, "concentric end angle"],           
            [this.lineWidthSlider, "line width"]

        ]

        this.slider_list = slider_array;

        this.lineCap = createCheckbox('Rounded Cap', false)
        strokeCap(SQUARE)

                
    }


    displaySliders(){

        fill(0)

        for(let i = 0; i < this.slider_list.length; i++){

            this.slider_list[i][0].position(130, 10 + (i  * 20) );
            text(this.slider_list[i][1], 5, this.slider_list[i][0].y + 10);
            text(this.slider_list[i][0].value(), this.slider_list[i][0].width + this.slider_list[i][0].x, this.slider_list[i][0].y +10)


        }


        //Display the checkbox to change the line cap

        this.lineCap.changed(toggleCap)

        function toggleCap(){
            if(this.checked()) strokeCap(ROUND)
            else strokeCap(SQUARE)

        }


    }





    show(){


        let centerX = width/2
        let centerY = height/2
    
        push();
        translate(centerX, centerY +50)
        strokeWeight(3)
        stroke(0)
        //strokeCap(this.cap)
        line( -5, 0, 5, 0)              //Makes a little cross in the middle of the canevas
        line ( 0, -5, 0, 5)

        this.nbRadialMarkers = this.nbRadialMarkersSlider.value();        
        this.radialLineLength = this.radialLineLengthSlider.value();
        this.radialLineStartRadius = this.radialLineStartRadiusSlider.value();
        this.nbLinesPerMarker =  this.nbLinesPerMarkerSlider.value() ;
        this.radialLinesOffset = this.radialLinesOffsetSlider.value();
        this.nbConcentricLines = this.nbConcentricLinesSlider.value();
        this.concentricLineInnerRadius = this.concentricLineInnerRadiusSlider.value(); 
        this.concentricLinesOffset = this.concentricLinesOffsetSlider.value();
        this.concentricStartAngle = this.concentricStartAngleSlider.value() ;
        this.concentricEndAngle = this.concentricEndAngleSlider.value() ;
        this.lineWidth = this.lineWidthSlider.value() ;

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
            arc( 0, 0, (this.concentricLineInnerRadius + j*this.concentricLinesOffset)*2, (this.concentricLineInnerRadius + j*this.concentricLinesOffset)*2, this.concentricStartAngle + 10*j, this.concentricEndAngle+ 10*j )
            // arc(0, 0, this.arcSize, this.arcSize, this.startAngle, this.endAngle )
        }




        // for(let j = 0; j < this.nbLines; j++ ){
            
        //     if(this.fill == 0) fill( 0 , 255, 0)
        //     else fill(255, 204, 0)

            

        //     let lineP1X = cos(tempAngle) * this.radius
        //     let lineP1Y = sin(tempAngle) * this.radius
        //     let lineP2X = cos(tempAngle) * (this.radius + this.lineLenght)
        //     let lineP2Y = sin(tempAngle) * (this.radius + this.lineLenght)
        //     strokeWeight(this.lineWidth)
        //     line(lineP1X, lineP1Y, lineP2X, lineP2Y)
            
        //     tempAngle += stepAngle

        // }

        // // Makes the arc 
        // noFill()
        // strokeWeight(this.lineWidth)
        // arc(0, 0, this.arcSize, this.arcSize, this.startAngle, this.endAngle )

        pop();


       

      
    }   

}