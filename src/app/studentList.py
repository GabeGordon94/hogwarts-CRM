from student import Student
from datetime import datetime

now = datetime.now()
dt_string = now.strftime("%d/%m/%Y %H:%M:%S")

STUDENTS = [
    Student(1, 'Gabe', 'Gordon', '08/01/2020 11:04:07', '08/01/2020 11:04:07',
            ['Alchemy'], ['Healing'], ['Dating with magic']),
    Student(2, 'Lex', 'Dubinsky', '08/01/2020 11:04:07', '08/01/2020 11:04:07',
            ['Alchemy'], ['Healing'], ['Dating with magic']),
    Student(3, 'Yinon', 'Vahan', '08/01/2020 11:04:07', '08/01/2020 11:04:07',
            ['Alchemy'], ['Healing'], ['Dating with magic']),
]
