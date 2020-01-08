from flask import Flask, request, jsonify
import json
import time
import requests
import threading
from student import Student
from studentList import STUDENTS
from flask_cors import CORS
from datetime import datetime

STUDENTLIST = STUDENTS


app = Flask(__name__)
CORS(app)


def obj_dict(obj):
    return obj.__dict__


@app.route('/')
def getFullList():
    global STUDENTLIST
    return json.dumps(STUDENTLIST, default=obj_dict)


@app.route('/add', methods=["POST"])
def addStudent():
    global STUDENTLIST
    resp = request.json
    now = datetime.now()
    dt_string = now.strftime("%d/%m/%Y %H:%M:%S")
    currentID = len(STUDENTLIST)
    STUDENTLIST.append(Student(currentID+1, resp['firstName'], resp['lastName'], dt_string, dt_string,
                               resp['existingMagicSkills'], resp['desiredMagicSkills'], resp['interestedInCourse']))
    return "works!"


@app.route('/update', methods=["POST"])
def updateStudent():
    global STUDENTLIST
    resp = request.json
    now = datetime.now()
    dt_string = now.strftime("%d/%m/%Y %H:%M:%S")
    for student in STUDENTLIST:
        if student.id == resp['ID']:
            student.lastUpdated=dt_string
            student.desiredMagicSkills=resp['student']['desiredMagicSkills']
            student.interestedInCourse=resp['student']['interestedInCourse']

    return "works"


if __name__ == "__main__":
    threading.Thread(target=app.run).start()
