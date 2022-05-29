from pymongo import MongoClient
import hashlib
from random import choice
from string import ascii_uppercase

from service.TokenService import TokenService
from pymongo import MongoClient

class UsersService:

    # чтобы работало требуется поставить mongoDB Server
    users = MongoClient(port=27017).officeMap.users
    tokenManager = TokenService()

    def saveUser(username, password):
        if (UsersService.users.find_one({"username": username}) != None):
            raise ValueError("Логин занят!")
        salt = ''.join(choice(ascii_uppercase) for i in range(12))
        UsersService.users.insert_one({
            "username": username,
            "password": UsersService.getHashedPassword(password, salt),
            "salt": salt
        })

    def checkUserExist(username, password):
        userData = UsersService.users.find_one({
            "username": username
        })
        if (userData == None):
            raise ValueError("Пароль или логин неверен!")
        salt = userData["salt"]
        if UsersService.getHashedPassword(password, salt) != userData["password"]:
            raise ValueError("Пароль или логин неверен!")
        

    def getHashedPassword(password, salt):
        return hashlib.md5((password+salt).encode()).hexdigest()
