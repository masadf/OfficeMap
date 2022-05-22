from multiprocessing import managers
from manager.DataManager import DataManager
from flask import Flask
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
@app.route('/')
def start():
    manager=DataManager()
    return {"data":manager.getData()}

if __name__ == '__main__':
    app.run(debug=True)

