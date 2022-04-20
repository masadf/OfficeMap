import json


class DataManager:

    currentId = 0

    def __init__(self):
        with open("data.json", "r", encoding="utf-8") as read_file:
            self.data = json.load(read_file)
        for element in self.data:
            if element["id"] > DataManager.currentId:
                DataManager.currentId = element["id"]+1

    def saveData(self):
        with open("data.json", "w", encoding="utf-8") as read_file:
            json.dump(self.data, read_file, ensure_ascii=False, indent=3)

    def addElement(self, element):
        element["id"] = DataManager.currentId
        DataManager.currentId += 1
        self.data.append(element)

    def getData(self):
        return self.data

    def getElementById(self, id):
        for element in self.data:
            if element["id"] == id:
                return element
        return None
