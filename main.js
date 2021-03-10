var SpeechRecognition = window.webkitSpeechRecognition;
var recognition = new SpeechRecognition;

function start() {
    document.getElementById("textbox").innerHTML = "";
    recognition.start();
    recognition.onresult = function (event) {
        console.log(event);
        var content = event.results[0][0].transcript;
        document.getElementById("textbox").innerHTML = content;
        console.log(content);
        if (content == "capture") {
            console.log("Taking Picture ---- ")
        speak();
        }
    }
}

function speak() {
    var synth = window.speechSynthesis;
    var speak_data = "taking picture in 5 seconds"
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
    Webcam.attach(camera);

    setTimeout(function(){
        takeSnapshot();
        save();
    },5000);
Webcam.set({
    width : 500,
    height : 350,
    image_format : jpeg,
    jpeg_quality : 90
});

camera = document.getElementById("camera");

function takeSnapshot() {
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="selfie_img" src = "'+data_uri+'">';
    });
}}

function save() {
    link = document.getElementById("link");
    image = document.getElementById("selfie_img").src;
    link.href = image;
    link.click();
}