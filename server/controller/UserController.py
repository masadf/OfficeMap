from service.TokenService import TokenService
from service.UserService import UsersService
from flask import make_response


class UserController:

    def login(username, password):
        try:
            UsersService.checkUserExist(username, password)
        except ValueError:
            return make_response({"msg": "Пароль или логин неверен!"}, 400)
        return UserController._get_token_response(username)

    def registration(username, password):
        try:
            UsersService.saveUser(username, password)
        except ValueError:
            return make_response({"msg": "Логин занят!"}, 400)
        return UserController._get_token_response(username)

    def logout(token):
        TokenService.removeToken(token)
        response = make_response({"msg": "Вы вышли из сессии!"}, 200)
        response.set_cookie("token", token, max_age=0)
        return response

    def _get_token_response(username):
        access_token, refresh_token = TokenService.getTokens(username)
        response = make_response(
            {"username": username, "token": access_token}, 200)
        TokenService.save_refresh_token(username, refresh_token)
        response.set_cookie("token", refresh_token,
                            max_age=60*60*24*30, samesite='None', secure=True)
        return response
