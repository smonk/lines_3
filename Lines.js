//lines_1, see documentation for more detatails
//by emilie bouchard fortier
//edited by scott monk

//sept 15
//removed +/- 180 from start angle/end angle sliders, it is a bit confusing. We now define the axis with Y positive pointing down, so the angle is measured from
//the positive x axis but turns clockwise. 

//made default values more sensible



class Lines {


    constructor(nbLines, startAngle, endAngle, radius, lineWidth, lineLenght, arcSize) {

        this.nbLines = nbLines
        this.startAngle = startAngle
        this.endAngle = endAngle
        this.radius = radius
        this.lineWidth = lineWidth
        this.lineLength = lineLenght
        this.arcSize = arcSize

        this.nbLinesSlider = createSlider(4, 20, 9, 1 )
        this.lineLengthSlider = createSlider(5, 100, 30, 1) 
        this.lineWidthSlider = createSlider(1, 10, 5, 1)
        this.radiusSlider = createSlider(5, 200, 50, 1)
        this.startAngleSlider = createSlider(90, 270, 120, 1)
        this.endAngleSlider = createSlider(270, 450, 420, 1 )
        this.arcSizeSlider = createSlider(20, 250, 120, 1)
        this.lineCap = createCheckbox('Rounded Cap', false)
        
        strokeCap(SQUARE)

                
    }


    displaySliders(){

        fill(0)

        
        this.nbLinesSlider.position(100, 10)
        text('Number of Lines', 5, this.nbLinesSlider.y +10 );
        text(this.nbLinesSlider.value(), this.nbLinesSlider.width + this.nbLinesSlider.x, this.nbLinesSlider.y +10)
        

        this.lineLengthSlider.position(100, 30)
        text('Lines Length', 5, this.lineLengthSlider.y +10 );
        text(this.lineLengthSlider.value(), this.lineLengthSlider.width + this.lineLengthSlider.x , this.lineLengthSlider.y+10)

        this.lineWidthSlider.position(100, 50)
        text('Line Width', 5, this.lineWidthSlider.y +10 );
        text(this.lineWidthSlider.value(), this.lineWidthSlider.width + this.lineWidthSlider.x, this.lineWidthSlider.y+10)

        this.radiusSlider.position(100, 70)
        text('Lines Radius', 5, this.radiusSlider.y +10);
        text(this.radiusSlider.value(), this.radiusSlider.width + this.radiusSlider.x, this.radiusSlider.y+10)


        this.startAngleSlider.position(100, 90)
        text('Start Angle', 5, this.startAngleSlider.y +10 );
        text(this.startAngleSlider.value() , this.startAngleSlider.width + this.startAngleSlider.x, this.startAngleSlider.y+10)

        this.endAngleSlider.position(100, 110)
        text('End Angle', 5, this.endAngleSlider.y +10 );
        text(this.endAngleSlider.value(), this.endAngleSlider.width + this.endAngleSlider.x, this.endAngleSlider.y+10)

 

        this.arcSizeSlider.position(100, 130)
        text('Arc Radius', 5, this.arcSizeSlider.y +10);
        text(this.arcSizeSlider.value()/2, this.arcSizeSlider.width + this.arcSizeSlider.x, this.arcSizeSlider.y+10)

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
        let tempAngle = this.startAngle
        
        
        // These variables depend on the value on the slider
        this.lineLenght = this.lineLengthSlider.value()
        this.radius = this.radiusSlider.value()
        this.nbLines = this.nbLinesSlider.value()
        this.startAngle = this.startAngleSlider.value()
        this.endAngle = this.endAngleSlider.value()
        this.lineWidth = this.lineWidthSlider.value()
       
        this.arcSize = this.arcSizeSlider.value()


        //Determine the size of the angles in between each lines
        let stepAngle = (this.endAngle-this.startAngle)/(this.nbLines-1)

        


        push();
        translate(centerX, centerY +50)
        strokeWeight(3)
        stroke(0)
        //strokeCap(this.cap)
        line( -5, 0, 5, 0)              //Makes a little cross in the middle of the canevas
        line ( 0, -5, 0, 5)



        for(let j = 0; j < this.nbLines; j++ ){
            
            if(this.fill == 0) fill( 0 , 255, 0)
            else fill(255, 204, 0)

            

            let lineP1X = cos(tempAngle) * this.radius
            let lineP1Y = sin(tempAngle) * this.radius
            let lineP2X = cos(tempAngle) * (this.radius + this.lineLenght)
            let lineP2Y = sin(tempAngle) * (this.radius + this.lineLenght)
            strokeWeight(this.lineWidth)
            line(lineP1X, lineP1Y, lineP2X, lineP2Y)
            
            tempAngle += stepAngle

        }

        // Makes the arc 
        noFill()
        strokeWeight(this.lineWidth)
        arc(0, 0, this.arcSize, this.arcSize, this.startAngle, this.endAngle )

        pop();


       

      
    }   

}