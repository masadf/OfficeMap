from crypt import methods
from email import header
from flask_cors import CORS
from manager.DataManager import DataManager
from flask import Flask, request
from manager.UsersDBManager import UsersDBManager
app = Flask(__name__)


CORS(app)

usersDBManager = UsersDBManager()


@app.route('/personData')
def getPersonData():
    manager = DataManager()
    return {"data": manager.getData()}


@app.route('/authorization', methods=["POST"])
def authorization():
    headers = {'Access-Control-Allow-Origin': '*'}
    userdata = request.get_json()
    if usersDBManager.checkUserExist(userdata["login"], userdata["password"]):
        return {"success": True, "msg": "Успешно!"}, 200, headers
    return {"success": False, "msg": "Пароль или логин неверен!"}, 400, headers


@app.route('/registration', methods=["POST"])
def registration():
    headers = {'Access-Control-Allow-Origin': '*'}
    userdata = request.get_json()
    if usersDBManager.addUser(userdata["login"], userdata["password"]):
        return {"success": True, "msg": "Успешно!"}, 200, headers
    return {"success": False, "msg": "Логин занят!"}, 400, headers


if __name__ == '__main__':
    app.run(debug=True)
