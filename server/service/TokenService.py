from flask import make_response
import jwt
import datetime
from pymongo import MongoClient


from config.Config import ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY


class TokenService:
    tokens = MongoClient(port=27017).officeMap.tokens

    def getTokens(username, isAdmin):
        payload = {
            "username": username,
            "isAdmin": isAdmin,
            "exp": datetime.datetime.now(
            ) - datetime.timedelta(hours=2)
        }
        accessToken = jwt.encode(
            payload, ACCESS_TOKEN_KEY, algorithm="HS256")
        payload["exp"] = datetime.datetime.now() + datetime.timedelta(days=30)
        refreshToken = jwt.encode(
            payload, REFRESH_TOKEN_KEY, algorithm="HS256")
        payload.pop("exp")
        return accessToken, refreshToken

    def removeToken(token):
        TokenService.tokens.delete_one({"token": token})

    def verify_tokens(request):
        access_token = request.headers.get("Authorization")
        if (access_token == None):
            return make_response("Пользователь не авторизирован!", 401)
        try:
            userData = TokenService.check_access_token_signature(access_token)
            if userData != None:
                return make_response({"token": access_token, "username": userData["username"], "isAdmin": userData["isAdmin"]}, 200)
            refresh_token = request.cookies.get("token")
            if (refresh_token == None):
                return make_response("Пользователь не авторизирован!", 401)
            userData = TokenService.check_refresh_token_signature(
                refresh_token)
            if userData != None:
                sessionData = TokenService.tokens.find_one(
                    {"token": refresh_token})
                if (sessionData != None):
                    username = sessionData["username"]
                    new_access_token, new_refresh_token = TokenService.getTokens(
                        username, userData["isAdmin"])
                    TokenService.tokens.update_one({"_id": sessionData["_id"]}, {
                        "$set": {"token": new_refresh_token}})
                    response = make_response(
                        {"username": username, "token": new_access_token,"isAdmin":userData["isAdmin"]}, 200)
                    response.set_cookie("token", refresh_token)
                    return response
                return make_response("Пользователь не авторизирован!", 401)
        except (jwt.InvalidSignatureError, jwt.DecodeError):
            return make_response("Пользователь не авторизирован!", 401)

    def check_refresh_token_signature(token):
        try:
            return jwt.decode(token, REFRESH_TOKEN_KEY, algorithms=["HS256"])
        except jwt.ExpiredSignatureError:
            return None

    def check_access_token_signature(token):
        try:
            return jwt.decode(token, ACCESS_TOKEN_KEY, algorithms=["HS256"])
        except jwt.ExpiredSignatureError:
            return None

    def save_refresh_token(username, token):
        TokenService.tokens.insert_one({
            "username": username,
            "token": token
        })
