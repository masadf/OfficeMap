from flask import Flask
app = Flask(__name__)

@app.route('\main')
def start():
    return "Server started! (or not, I don't know)"

if __name__ == '__main__':
    app.run(debug=True)
