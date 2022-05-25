from pymongo import MongoClient
from pymongo.errors import DuplicateKeyError
import hashlib
from random import choice
from string import ascii_uppercase


class UsersDBManager:
    
    #чтобы работало требуется поставить mongoDB Server
    users = MongoClient(port=27017).officeMap.users

    def __init__(self):
        pass

    def addUser(self, username, password):
        salt = ''.join(choice(ascii_uppercase) for i in range(12))
        try:
            UsersDBManager.users.insert_one({
                "_id": username,
                "password": UsersDBManager.getHashedPassword(password, salt),
                "salt": salt
            })
        except DuplicateKeyError:
            return False
        return True

    def checkUserExist(self, username, password):
        userData = UsersDBManager.users.find_one({
            "_id": username
        })
        if (userData == None):
            return False
        salt = userData["salt"]
        if UsersDBManager.getHashedPassword(password, salt) == userData["password"]:
            return True

        return False

    def getHashedPassword(password, salt):
        return hashlib.md5((password+salt).encode()).hexdigest()
