// AI Smart Rescue Drone App JavaScript

document.addEventListener("DOMContentLoaded", () => {

    const startBtn = document.querySelector("#startBtn");

    if(startBtn){
        startBtn.addEventListener("click", () => {
            alert("Welcome to AI Smart Rescue Drone System 🚁");
            window.location.href = "#dashboard";
        });
    }


    // Drone Status Simulation

    let battery = 92;
    let signal = "Strong";
    let victimsDetected = 3;


    document.getElementById("battery")
    ?.addEventListener("click", () => {

        battery -= 5;

        if(battery < 0){
            battery = 100;
        }

        document.getElementById("batteryValue").innerHTML =
        battery + "%";

    });



    // AI Detection Simulation

    function detectVictims(){

        let count = Math.floor(Math.random()*6);

        document.getElementById("victimCount")
        .innerHTML = count;

        if(count > 0){
            document.getElementById("alert")
            .innerHTML =
            "⚠ Victims detected! Rescue team notified.";
        }
        else{
            document.getElementById("alert")
            .innerHTML =
            "No victims detected.";
        }
    }


    setInterval(detectVictims,5000);



    // Emergency SOS Button

    const sos =
    document.querySelector("#sosBtn");

    sos?.addEventListener("click",()=>{

        document.querySelector("#alert")
        .innerHTML =
        "🚨 SOS Activated! Emergency Response Team Alerted";

    });



    // Live Location

    function updateLocation(){

        let lat =
        (17.3850 + Math.random()/100)
        .toFixed(5);

        let lon =
        (78.4867 + Math.random()/100)
        .toFixed(5);


        document.getElementById("location")
        ?.innerHTML =
        `📍 ${lat}, ${lon}`;

    }


    setInterval(updateLocation,3000);


});
