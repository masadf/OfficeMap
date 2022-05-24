import json


class AuthorizationManager:

    def __init__(self):
        pass

    def readUserData(self):
        with open("userData.json", "r", encoding="utf-8") as read_file:
            self.data = json.load(read_file)

    def checkUserData(self, userdata):
        self.readUserData()
        for element in self.data:
            if element["login"]==userdata["login"]:
                if element["password"]==userdata["password"]:  
                    return True;
                return False;
        return False;