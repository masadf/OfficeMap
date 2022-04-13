from flask import Flask
app = Flask(__name__)

@app.route('/')
def start():
    return {'values': ['value1' , 'value2', 'value3']}

if __name__ == '__main__':
    app.run(debug=True)

