import re
from tkinter import E
from bson import ObjectId
from pymongo import MongoClient


class EmployeeService:

    # чтобы работало требуется поставить mongoDB Server
    employee = MongoClient(port=27017).officeMap.employee

    def get_data():
        result_data = []
        for element in EmployeeService.employee.find():
            element["_id"] = str(element["_id"])
            result_data.append(element)
        return result_data

    def set_cabinet(id, cab_number):
        EmployeeService.employee.update_one(
            {"_id": ObjectId(id)}, {"$set": {"cab_number": cab_number}})

    def remove_cabinet(id):
        EmployeeService.employee.update_one(
            {"_id": ObjectId(id)}, {"$unset": {"cab_number": 1}})
