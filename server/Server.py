from crypt import methods
from multiprocessing import managers
import re
from manager.DataManager import DataManager
from flask import Flask,request
from flask_cors import CORS

from manager.AuthorizationManager import AuthorizationManager
app = Flask(__name__)
CORS(app)

authManager=AuthorizationManager()
@app.route('/personData')
def getPersonData():
    manager=DataManager()
    return {"data":manager.getData()}

@app.route('/authorization',methods=["POST"])
def authorization():
    userdata=request.get_json()
    if authManager.checkUserData(userdata):
        return {"success": True,"msg":"Успешно"}, 200
    
    return {"success": False,"msg":"Пароль или логин неверен!"},400
    

if __name__ == '__main__':
    app.run(debug=True)

