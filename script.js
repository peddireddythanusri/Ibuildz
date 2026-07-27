// =====================================
// AI SMART RESCUE DRONE
// JavaScript Functionality
// =====================================


// Get Elements

const startBtn = document.getElementById("startBtn");

const splash = document.getElementById("splash");

const dashboard = document.getElementById("dashboard");



// Start Application

startBtn.addEventListener("click",()=>{


    splash.style.display="none";

    dashboard.style.display="block";


});





// Battery Simulation

let battery = 92;


function updateBattery(){


    battery--;


    if(battery <= 20){

        battery = 100;

    }


    document.getElementById("batteryValue")
    .innerHTML = battery + "%";


}


setInterval(updateBattery,5000);






// AI Victim Detection Simulation


function detectVictims(){


    let victims =
    Math.floor(Math.random()*6);


    document.getElementById("victimCount")
    .innerHTML = victims;



    let alertBox =
    document.getElementById("alert");



    if(victims > 0){


        alertBox.innerHTML =
        "⚠ AI detected "
        + victims +
        " victims. Rescue team notified!";


    }

    else{


        alertBox.innerHTML =
        "✅ No victims detected. Area is safe.";


    }



}



setInterval(detectVictims,4000);







// SOS Emergency Button


const sosBtn =
document.getElementById("sosBtn");



sosBtn.addEventListener("click",()=>{


    document.getElementById("alert")
    .innerHTML =
    "🚨 SOS Activated! Emergency rescue team alerted.";


});







// Live Drone Location


function updateLocation(){


    let latitude =
    (17.3850 +
    Math.random()/100)
    .toFixed(5);



    let longitude =
    (78.4867 +
    Math.random()/100)
    .toFixed(5);



    document.getElementById("location")
    .innerHTML =
    "📍 Drone Location: "
    + latitude +
    ", "
    + longitude;



}



setInterval(updateLocation,3000);
});
