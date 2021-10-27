prediction_1 = ""

prediction_2 = ""

Webcam.set({
   width:350 ,
   height:300 ,
   image_format: "png" ,
   png_quality: 90  
});

camera = document.getElementById("camera");

Webcam.attach("#camera") ;

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>' ; 
    });
}

 console.log('ml5 version',ml5.version);

 trained = ml5.imageClassifier("https://storage.googleapis.com/tm-model/dJbd2K0Qz/model.json",Model_Loaded);

 function Model_Loaded(){
     console.log("MODEL LOADED !!!");
 }

 function speak(){
     var synth = window.speechSynthesis  ;
      
     speak_data_1 = "THE 1ST PREDICTION IS" + prediction_1 ;
     speak_data_2 = "THE 2ND PREDICTION IS" + prediction_2 ;

     var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);

     synth.speak(utterThis) ;
 }

 function check(){
     img = document.getElementById("captured_image") ;
     trained.classify(img, gotResult);
 }

 function gotResult(error, results){
    if(error){
    console.error(error);
         }else{     console.log(results);
           document.getElementById("emotion1").innerHTML = results[0].label ;
           document.getElementById("emotion2").innerHTML = results[1].label ;
           
           prediction_1 = results[0].label ;
           prediction_2 = results[1].label ;
           speak() ;

           if(prediction_1 == "HAPPY"){
            document.getElementById("emoji1").innerHTML = "&#128516;"
         }
         if(prediction_1 == "SAD"){
             document.getElementById("emoji1").innerHTML = "&#128546;"
         }
         if(prediction_1 == "ANGRY"){
            document.getElementById("emoji1").innerHTML = "&#128545;"
         }
         if(prediction_1 == "BORED"){
             document.getElementById("emoji1").innerHTML = "&#128529;"
         }

         if(prediction_2 == "HAPPY"){
            document.getElementById("emoji2").innerHTML = "&#128516;"
         }
         if(prediction_2 == "SAD"){
             document.getElementById("emoji2").innerHTML = "&#128546;"
         }
         if(prediction_2 == "ANGRY"){
            document.getElementById("emoji2").innerHTML = "&#128545;"
         }
         if(prediction_2 == "BORED"){
             document.getElementById("emoji2").innerHTML = "&#128529;"
         }
}}