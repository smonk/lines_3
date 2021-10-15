
//this class implements the sharable phtyiscal sliders
//there is no information about name, it jsut knows where they are and how many
//in this class the number of sliders is the global max really. 
class master_slider_list{

    constructor(nb_sliders){
        this.slider_array = [];
        this.nb_sliders = nb_sliders;
        var slider_min = 0;
        var slider_max = 100;
        var slider_default = 50;
        var slider_step = 0;
        this.sel = createSelect();
        for( let i = 0; i < this.nb_sliders; i++){
            this.slider_array[i] = createSlider(this.slider_min, this.slider_max, this.slider_default, this.slider_step );
        }    

    }

    //you can do some math or maybe make this function more parametric. 
    display_sliders(){   
        fill(0)
        for(let i = 0; i < this.nb_sliders; i++){
            this.slider_array[i].position(130, 10 + (i  * 20) );
       }
    }


    //should this be in the master slider list? not really....
    //there needs to be a master knob object list, and this menu should perhaps belong to it
    
    display_drop_down_menus(){
        // textAlign(CENTER);
        background(200);
        // this.sel = createSelect();
        this.sel.position(500, 10);
        this.sel.option('some_option');
        this.sel.option('another');
        this.sel.option('another_one');
        // this.sel.changed( this.change_design_type );
    }
    //fuck
    poll_drop_down_menus(){
        print(this.sel.value());
    }

}





//this class allows some flexibility of the sliders, make alist of these in the graphic classes

class slider_variable{

    constructor( master_slider_list, slider_number, slider_name, default_variable_value, variable_min, variable_max, data_type ){
        this.slider_number = slider_number;     // index in the master list
        this.slider_name = slider_name;         // a  string for better insight
        this.slider_list = master_slider_list;  // the master list
        this.variable_value = default_variable_value;                // the actual value of the variable

        this.variable_max = variable_max;       // max variable value derived from slider 
        this.variable_min = variable_min;       // min variable value derived from slider 
        this.data_type = data_type;             // can be integer or float

        this.slider_value = this.write_to_slider(this.variable_value);      // the position of the dot on the slider ( out of 100 ) NO IT IS NOT??? what is this variable for?

    }

    read_from_slider(){
        let temp = this.slider_list.slider_array[this.slider_number].value();
        // print(temp)
        this.variable_value = ( temp/100.0 )  * ( this.variable_max - this.variable_min ) + this.variable_min;     
        
        if(this.data_type == "int"){
            this.variable_value = round(this.variable_value);
        }
        // print(this.variable_value)
    }

    write_to_slider( variable_value ){
        let temp =  ( this.variable_value - this.variable_min ) /  ( this.variable_max- this.variable_min ) * 100.0 ;
        this.slider_list.slider_array[this.slider_number].value(temp);
    }

    display_slider_name(){
        // print(this.slider_name)
    
        text(this.slider_name, 5, this.slider_list.slider_array[this.slider_number].y + 10);
    }

    //this is experimental, maybe jsut make a general clear function that wipes the whole area
    clear_display_slider_name(){
        
        push();
        fill(220);
        noStroke();
        rect(5, this.slider_list[this.slider_number].y + 10 - 20, 200, 20 );
        pop();
    }

    display_slider_value(){
        push();
        textAlign(LEFT);
        text(this.variable_value, this.slider_list.slider_array[this.slider_number].x + this.slider_list.slider_array[this.slider_number].width + 5, this.slider_list.slider_array[this.slider_number].y + 10);
        // text(this.slider_list[i][0].value(), this.slider_list[i][0].width + this.slider_list[i][0].x, this.slider_list[i][0].y +10)
        pop();
    }



}