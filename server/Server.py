from flask import Flask, request, make_response
from controller.UserController import UserController
from manager.EmployeeDBManager import EmployeeDBManager
from service.EmployeeService import EmployeeService
from service.TokenService import TokenService
app = Flask(__name__)

employeeDBManager = EmployeeDBManager()


@app.route('/login', methods=["POST"])
def login():
    request_data = request.get_json()
    return UserController.login(request_data["username"], request_data["password"])


@app.route('/registration', methods=["POST"])
def registration():
    request_data = request.get_json()
    return UserController.registration(request_data["username"], request_data["password"])


@app.route('/logout', methods=["POST"])
def logout():
    token = request.cookies.get("token")
    return UserController.logout(token)


@app.route('/refresh', methods=["GET"])
def refresh():
    return TokenService.verify_tokens(request)


@app.route('/employee')
def get_employees():
    return make_response({"data": EmployeeService.get_data()}, 200)


@app.route('/employee/set-cab',methods=["POST"])
def set_employee_cab():
    request_data = request.get_json()
    EmployeeService.set_cabinet(request_data["id"], request_data["cabNum"])
    return make_response({"msg": "Успешно!"}, 200)


@app.route('/aboutEmployee', methods=["POST"])
def get_employee_info():
    return {"data": employeeDBManager.getInfoAboutPerson(request.get_json()["_id"])}


@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin',
                         'http://localhost:3000')
    response.headers.add('Access-Control-Allow-Headers',
                         'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods',
                         'GET,PUT,POST,DELETE,OPTIONS')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response


if __name__ == '__main__':
    app.run(debug=True)
