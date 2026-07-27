from flask import Flask, jsonify, request, Response
from flask_cors import CORS

import cv2
import random
from datetime import datetime
from ultralytics import YOLO


# ==============================
# Flask Configuration
# ==============================

app = Flask(__name__)

CORS(app)



# ==============================
# AI Model
# ==============================

model = YOLO("yolov8n.pt")



# ==============================
# Camera Setup
# ==============================

camera = cv2.VideoCapture(0)



# ==============================
# Data Storage
# ==============================

alerts = []

missions = []

users = []



latitude = 17.3850

longitude = 78.4867





# ==============================
# Home API
# ==============================

@app.route("/")
def home():

    return "AI Smart Rescue Drone Backend Running"





# ==============================
# Drone Status
# ==============================

@app.route("/drone-status")
def drone_status():

    return jsonify({

        "battery":
        random.randint(60,100),

        "signal":
        "Strong",

        "altitude":
        random.randint(50,200),

        "speed":
        random.randint(10,50),

        "status":
        "Active"

    })





# ==============================
# GPS Tracking
# ==============================

@app.route("/location")
def location():

    global latitude, longitude


    latitude += random.uniform(
        -0.0005,
        0.0005
    )


    longitude += random.uniform(
        -0.0005,
        0.0005
    )


    return jsonify({

        "latitude":
        round(latitude,6),

        "longitude":
        round(longitude,6),

        "status":
        "Drone Moving"

    })





# ==============================
# AI Human Detection
# ==============================

@app.route("/ai-detection")
def ai_detection():


    success, frame = camera.read()


    if not success:

        return jsonify({

            "status":
            "Camera Error",

            "victims_detected":
            0,

            "confidence":
            0

        })



    results = model(frame)



    people = 0

    confidence = 0



    for result in results:


        for box in result.boxes:


            class_id = int(
                box.cls[0]
            )


            # Person class

            if class_id == 0:


                people += 1


                confidence = float(
                    box.conf[0]
                )



    return jsonify({

        "status":
        "Scanning Completed",

        "victims_detected":
        people,

        "confidence":
        round(
            confidence*100,
            2
        )

    })






# ==============================
# Live Camera Streaming
# ==============================

def generate_frames():


    while True:


        success, frame = camera.read()


        if not success:

            break



        ret, buffer = cv2.imencode(
            ".jpg",
            frame
        )


        frame = buffer.tobytes()



        yield (

            b"--frame\r\n"

            b"Content-Type: image/jpeg\r\n\r\n"

            + frame +

            b"\r\n"

        )





@app.route("/video")
def video():


    return Response(

        generate_frames(),

        mimetype=
        "multipart/x-mixed-replace; boundary=frame"

    )






# ==============================
# Emergency Alert System
# ==============================

@app.route(
"/send-alert",
methods=["POST"]
)

def send_alert():


    data = request.json



    alert = {


        "type":
        data["type"],


        "message":
        data["message"],


        "priority":
        data["priority"],


        "time":
        datetime.now()
        .strftime("%H:%M:%S")


    }



    alerts.append(alert)



    return jsonify(alert)






@app.route("/alerts")
def get_alerts():


    return jsonify(alerts)






# ==============================
# Mission Management
# ==============================

@app.route(
"/add-mission",
methods=["POST"]
)

def add_mission():


    data=request.json



    mission={


        "name":
        data["name"],


        "location":
        data["location"],


        "priority":
        data["priority"],


        "status":
        "Assigned"


    }



    missions.append(mission)


    return jsonify(mission)





@app.route("/missions")
def get_missions():


    return jsonify(missions)






# ==============================
# User Management
# ==============================

@app.route(
"/add-user",
methods=["POST"]
)

def add_user():


    data=request.json



    user={


        "name":
        data["name"],


        "email":
        data["email"],


        "role":
        data["role"]


    }


    users.append(user)


    return jsonify(user)






@app.route("/users")
def get_users():


    return jsonify(users)






# ==============================
# Run Server
# ==============================

if __name__=="__main__":


    app.run(

        host="0.0.0.0",

        port=5000,

        debug=True

  )
