from flask import Flask
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
@app.route('/')
def start():
    return {'values': ['value1' , 'value2', 'value3']}

if __name__ == '__main__':
    app.run(debug=True)

