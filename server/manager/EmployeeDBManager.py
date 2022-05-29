from pymongo import MongoClient

class EmployeeDBManager:
    
    #чтобы работало требуется поставить mongoDB Server
    employee = MongoClient(port=27017).officeMap.employee

    def __init__(self):
        pass

    def getPersonNames(self):
        return list(EmployeeDBManager.employee.find({},{"_id":True}))
    
    def getInfoAboutPerson(self,name):
        return EmployeeDBManager.employee.find_one({"_id":name})
    