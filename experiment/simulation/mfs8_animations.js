// This file contains all the functions used to animate the images in the experiment.

// This function is a general method used to move images from initial position to final position.
function moveImage(){
        id = setInterval(frame, 5);
        function frame() {
            if(type_of_movement == 0){
                if (initial_top > final_top) {
                    clearInterval(id);
                    count++;
                } else {
                    initial_top+=step_top; 
                    initial_left+=step_left;
                    elem.style.top = initial_top + 'px'; 
                    elem.style.left = initial_left + 'px';
                }
            }
            else if(type_of_movement == 1){
                if (initial_top < final_top) {
                    clearInterval(id);
                    count++;
                } else {
                    initial_top+=step_top; 
                    initial_left+=step_left;
                    elem.style.top = initial_top + 'px'; 
                    elem.style.left = initial_left + 'px'; 
                }
            }
        } 
}

//To disable and enable the cursor pointers on elements.
function cursorPointers(id1, id2){
    document.getElementById(id1).style.cursor = "default";
    document.getElementById(id2).style.cursor = "pointer";
}

// This is the function called when flask is clicked. It moves the flask from the shelf to the table.
function moveFlask(){
        if(step_no == 0){
            if(sol_name == undefined)
            {
              alert("First select the solvent from the solvent selection bar");
            }
            else{
            // Get image
            elem = document.getElementById("round-bottom-flask");
            //Detect thecurrent position of the flask.
            initial_top = Math.round($('#round-bottom-flask').position().top);
            initial_left = Math.round($('#round-bottom-flask').position().left);
            // Initialise all the values for the motion of the images.
            final_top = 286;
            step_top = 1;
            step_left = 0.4;
            type_of_movement = 0;
            // Move the flask image to desired position.
            moveImage();
            // Change to next intsruction to be followed.
            document.getElementById("solution_name").style.visibility ="hidden";
            document.getElementById("slider").disabled = true;
            document.getElementById("slider").style.opacity = "0.4";   
            document.getElementById("demo").innerHTML = "Step-No 3:Click on the quartz cuvette (path length 1x1cm) to take it to the instrument table. Quartz cuvettes for spectrophotometric measurements are transparent only on two opposite sides, unlke the  all-side transparent quartz cuvettes used for flourescence measurements.";
            step_no++;
            cursorPointers('round-bottom-flask', 'quartz_cuvette');
          }
      }
}

/* This is the function called when cuvette is clicked. 
// It moves the cuvette from the shelf to the table when it is clicked for the first time.
// When it is called for the second time it is moved to the spectrometer along with reference cuvette 
   and the cuvettes gets hidden. */
function moveCuvette(){
        if ( step_no == 1 && count == 1){
            // get the image 
            elem = document.getElementById("quartz_cuvette"); 
            // Move the cuvette from the shelf to the table
            // Detect the current position of the cuvette.
            initial_top = Math.round($('#quartz_cuvette').position().top);
            initial_left = Math.round($('#quartz_cuvette').position().left);
            // Initialise all the values for the motion of the images.
            final_top = 338;
            step_top = 1;
            step_left = -0.2;
            type_of_movement = 0;
            // Move it to the table.
            moveImage();
            // Change the next instruction to be followed.
            document.getElementById("demo").innerHTML = "Step-No 4: click on the 5mL capacity pipette to collect 3mL of the expeimental solution which will be transferred into the quartz cuvette. In real operation, one has to set the volume to 3mL in the pipette and an appropriate tip should be attatched prior to dipping it in the solution";
            step_no++;
            cursorPointers('quartz_cuvette', 'pipette');
        }
        else if(step_no == 9){
            // Depending on the cuvette choosen get images accordingly.
            elem = document.getElementById("quartz_cuvette"); 
            // Move the cuvette from the table to the socket in the spectrophotmeter.
            // Detect the current position of the flask.
            initial_top = Math.round($('#quartz_cuvette').position().top);
            initial_left = Math.round($('#quartz_cuvette').position().left);
            // Initialise all the values for the motion of the images.
            final_top = 221;
            step_top = -0.5;
            step_left = -1.87;
            type_of_movement = 1;
            // Move it to a position over the spectrophotometer.
            moveImage();
            // After 1200ms call moveDown() method.
            setTimeout("moveDown()",1500);
            step_no++;
            cursorPointers('quartz_cuvette', 'spectrolid_trans_button1');
        }
        else if(step_no == 20){
            // get the image of the shelf
            elem = document.getElementById("cuvette"); 
            // Move the cuvette from the shelf to the table
            // Detect the current position of the flask.
            initial_top = Math.round($('#cuvette').position().top);
            initial_left = Math.round($('#cuvette').position().left);
            // Initialise all the values for the motion of the images.
            final_top = 334;
            step_top = 1;
            step_left = -0.25;
            type_of_movement = 0;
            // Move it to the table.
            moveImage();
        
            setTimeout(function(){
                quartz = $("#quartz_cuvette");
                quartz.animate({top:"317px"},
                    function(){
                        var angle=0;
                        var id = setInterval(function(){
                        angle+=1;
                        if(angle>=40){
                            clearInterval(id);
                            if(sol_name == 0||sol_name ==1){
                                elem.src="images/cuvette-with-sol.png";
                                quartz.attr("src", "../../common_images/quartz-cuvette.png");
                            }
                        }
                        $("#quartz_cuvette").rotate(angle);
                        },10); 
                    });
            }
            ,1500);

            setTimeout(function(){
                quartz.rotate(0);
                quartz.animate({top:"331px"});
            }, 3000);

            setTimeout(function(){
                $("#cuvette").animate({left:'-152px',top:'280px'},3000,function(){
                    this.remove();
                    count++;
                });
            }, 4500);

            // Change the next instruction to be followed.
            document.getElementById("demo").innerHTML = "Step-No 20: Close the sample chamber lid by clicking on it.";
            step_no++;
            cursorPointers('quartz_cuvette', 'spectrolid_trans_button1');
        }
}

// This method is used to move the cuvette downwards into the spectrophotometer.
function moveDown(){
        // Detect the current position of the flask.
        initial_top = Math.round($('#quartz_cuvette').position().top);
        initial_left = Math.round($('#quartz_cuvette').position().left);
        // Initialise all the values for the motion of the images.
        final_top = 282;
        step_top = 3;
        step_left = 0;
        type_of_movement = 0;
        // Move it into the spectrophotometer.
        moveImage();
        // Call extraCuvette() method which moves the reference cuvette into the spectrophotometer.
        setTimeout("extraCuvette()",1000);
        document.getElementById("demo").innerHTML = "Step-No 11: close the chamber by clicking on lid;"
}

// This method is used to move the reference cuvette into the spectrophotometer. 
function extraCuvette(){
        /*Get the transparent image and replace it with a reference cuvette image and move it down into the
         spectrophotometer.*/
        $('#ref_cuvette').attr('src', '../../common_images/quartz-cuvette.png'); 
        document.getElementById("reference").style.visibility ="visible";
        elem = document.getElementById("ref_cuvette"); 
        // Detect the current position of the flask.
        initial_top = Math.round($('#ref_cuvette').position().top);
        initial_left = Math.round($('#ref_cuvette').position().left);
        // Initialise all the values for the motion of the images.
        final_top = 61;
        step_top = 1;
        step_left = -2.25;
        type_of_movement = 0;
        // Move it into the spectrophotometer.
        moveImage();
        /* After 1000ms make the sample cuvette and the referance cuvette hidden and replace the spectrophotometer with an 
        image that has cuvette within them. */
        setTimeout(function(){
            $("#reference").remove();
            $("#quartz_cuvette, #ref_cuvette").hide();
            count++;
        },800);
}
    
/*This method is called whan the pipette is clicked.
//when it is clicked for the first time it is moved from the shelf to the flask on the table.
//When it is called for the second time pipette extracts the solution from the flask.
//when it is called for the third time pipettte is moved out of the flask to the cuvette.
//When it is called for the fourth time it tranfers the solution into the cuvette and moves back to the shelf again.*/
function movePipette() {
        if(step_no == 2 && count == 2){
            // Get image
            elem = document.getElementById("pipette"); 
            //Rotate the pipette from its initial position
            var angle=0;
            var id = setInterval(function(){
            angle+=1;
            if(angle>=1){
                clearInterval(id);
            }
            $("#pipette").rotate(angle);
            },10);
            //Detect thecurrent position of the pipette.
            initial_top = Math.round($('#pipette').position().top);
            initial_left = Math.round($('#pipette').position().left);
            // Initialise all the values for the motion of the images.
            final_top = 221;
            step_top = 1;
            step_left = -0.12;
            type_of_movement = 0;
            // Move the pipette image to desired position.
            moveImage();
            // Change to next intsruction to be followed.
            document.getElementById("demo").innerHTML = "Step-No 5: Click on the pipette to draw solution into it.";
            step_no++;
        }
        else if(step_no==3 && count == 3){
            if(sol_name == 0||sol_name == 1){
                elem.src = "images/pipette-with-solution.png";
                $("#round-bottom-flask").attr("src", "images/half-filled-sol.png");
            }
            // Change to next instruction to be followed.
            document.getElementById("demo").innerHTML = "Step-No 6: Click on the pipette to take it out of the volumetric flask.";
            step_no ++;
            setTimeout(function(){ 
                count++; }, 500);
        }
        else if(step_no == 4 && count == 4){
             $("#pipette").animate({ top: '160px'},"slow")
                          .animate({ left:'295px'}, "slow")
                          .animate({ top: '220px'}, "slow");
            // Change to next instruction to be followed.
            document.getElementById("demo").innerHTML = "Step-No 7:Click on the pipette again to transfer the solution into the cuvette ";
            step_no ++;
            setTimeout(function(){ 
                count++; }, 1000);
        }
        else if(step_no == 5 && count == 5){
            if(sol_name == 0||sol_name == 1){
                elem.src = "../../common_images/pipette.png";
                $("#quartz_cuvette").attr("src", "images/quartz-cuv-with-sol.png");
            }
            step_no ++;
            setTimeout(function(){ 
                movebackPipette();
            }, 200);
        }
}

//This function is used to move the pipette back to the shelf. 
function movebackPipette() {
          elem = document.getElementById("pipette");
          // Detect the current position of the pipette.
          initial_top = Math.round($('#pipette').position().top);
          initial_left = Math.round($('#pipette').position().left);
          // Initialise all the values for the motion of the images.
          final_top = 23;
          step_top = -15;
          step_left = -4;
          type_of_movement = 1;
          // Move it to the shelf
          moveImage();
          document.getElementById("demo").innerHTML = "Step-No 8: To start the absorption spectral scan. click on the pop-up 'start Absorption Measurement";
          setTimeout( function(){
            $("#popup, #start").css("visibility", "visible");
          }, 500);
          cursorPointers('pipette', 'start');
}

function changeParameters(){
    $('#table_with_spec').css({"width":"85%"});
    $("#demo").css({"top":"75%"});
    $("#comp_trans_button").css({"left":"48%", "top":"7%"});
    $("#power_trans_button").css({"left":"15.3%", "top":"41%"});
    $("#spectrolid_trans_button").css({"top":"13%"});
    $("#spectrolid_trans_button1").css({"left":"34%", "top":"-3%", "width":"5%"});
}

//This function is used to hide the popup screen.
function hideInstruction() {
       // Make the hidden power button to visible to run the spectrofluorimeter.  
       document.getElementById('power_trans_button').style.visibility = 'visible';
       $("#popup, #start").css("visibility", "hidden");

       if(step_no == 6){
            document.getElementById("demo").innerHTML = 'Step-No 9: Turn on the spectrophotometer by clicking on the power button. In real operation it takes approx.30 min for initialization of the instrument.'
            cursorPointers('start', 'power_trans_button');
            step_no++;
       }
       else if( step_no == 17){
            $("#computerimage").remove();
            images[0] = "../../common_images/spec_fluormeter.png";
            images[1] = "../../common_images/spec_fluormeter.png";
            changeParameters();
            document.getElementById("demo").innerHTML = "Step-No 18: Turn on the spectrofluorimeter by clicking on the power button. In real operation, it takes approx. 30 min for initialization of the instrument. ";
            step_no++;
            cursorPointers('start', 'power_trans_button');
       }
}




