/* =====================================
   AI SMART RESCUE DRONE
   MAIN JAVASCRIPT
===================================== */



// ================================
// LOADING SCREEN
// ================================


window.addEventListener("load",()=>{


setTimeout(()=>{


document.getElementById("loader")
.style.display="none";


},2000);


});





// ================================
// LOGIN SYSTEM
// ================================


const loginBtn =
document.getElementById("loginBtn");



loginBtn?.addEventListener("click",()=>{


let email =
document.getElementById("email").value;


let password =
document.getElementById("password").value;



let message =
document.getElementById("loginMessage");



if(email && password){


message.innerHTML =
"✅ Login Successful";


document.getElementById("loginPage")
.style.display="none";



document.querySelectorAll(".hidden")
.forEach(section=>{

section.style.display="block";

});



}


else{


message.innerHTML =
"❌ Enter Email and Password";


}



});







// ================================
// SOS EMERGENCY ALERT
// ================================


const sosBtn =
document.getElementById("sosBtn");



sosBtn?.addEventListener("click",()=>{


alert(

"🚨 EMERGENCY ALERT SENT!\n\nRescue Team Notified"

);


fetch(

"http://127.0.0.1:5000/send-alert",

{

method:"POST",

headers:{

"Content-Type":
"application/json"

},


body:JSON.stringify({

type:"SOS",

message:
"Emergency rescue required",

priority:
"CRITICAL"

})

}

);


});







// ================================
// DRONE STATUS UPDATE
// ================================


function updateDroneStatus(){



fetch(

"http://127.0.0.1:5000/drone-status"

)


.then(response=>response.json())


.then(data=>{


let battery =
document.getElementById(
"batteryValue"
);



if(battery){

battery.innerHTML =
data.battery+"%";

}



});



}



setInterval(

updateDroneStatus,

3000

);







// ================================
// AI DETECTION UPDATE
// ================================


function updateAI(){


fetch(

"http://127.0.0.1:5000/ai-detection"

)


.then(response=>response.json())


.then(data=>{


let victim =
document.getElementById(
"victimCount"
);



if(victim){

victim.innerHTML =
data.victims_detected;

}




let alertBox =
document.getElementById(
"aiAlert"
);



if(alertBox){


alertBox.innerHTML =

"🤖 "
+
data.status
+
"<br>Confidence: "
+
data.confidence
+
"%";


}



});


}



setInterval(

updateAI,

5000

);







// ================================
// LIVE GPS MAP
// ================================



let map;



let droneMarker;




function initializeMap(){



map =
L.map("map")
.setView(

[17.3850,78.4867],

15

);



L.tileLayer(

"https://tile.openstreetmap.org/{z}/{x}/{y}.png"

)

.addTo(map);



droneMarker =

L.marker(

[17.3850,78.4867]

)

.addTo(map);



}



if(
document.getElementById("map")
){

initializeMap();

}







function updateLocation(){


fetch(

"http://127.0.0.1:5000/location"

)


.then(response=>response.json())


.then(data=>{


let position =

[

data.latitude,

data.longitude

];




if(droneMarker){


droneMarker
.setLatLng(position);



map.panTo(position);


}




let locationText =

document.getElementById(
"droneLocation"
);



if(locationText){


locationText.innerHTML =

"🚁 Drone Location : "
+
data.latitude
+
" , "
+
data.longitude;


}



});


}



setInterval(

updateLocation,

3000

);








// ================================
// DARK MODE
// ================================



function enableDarkMode(){


document.body
.classList
.toggle("dark");


}







// ================================
// SMOOTH SCROLL NAVIGATION
// ================================



document.querySelectorAll("nav a")

.forEach(link=>{


link.addEventListener(

"click",

function(e){


e.preventDefault();


let target =

document.querySelector(

this.getAttribute("href")

);



target.scrollIntoView({

behavior:"smooth"

});


});


});







// ================================
// DRONE FLOAT ANIMATION
// ================================



const drone =

document.querySelector(
".drone-image"
);



if(drone){


drone.style.animation =

"floatDrone 4s infinite";


}
