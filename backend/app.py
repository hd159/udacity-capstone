import os
from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS

from model import setup_db


load_dotenv()

from src.controller import *
app = Flask(__name__)

setup_db(app)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization,true')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PATCH,POST,DELETE,OPTIONS')
    return response

app.register_blueprint(routes)
@app.route("/")
def hello_world():
    return "<p>Hello, World 222!</p>"

# if __name__ == '__main__':
#     port = int(os.environ.get('PORT', 5000))
#     app.run(host='https://capstone-udacity-ddc.herokuapp.com/')

if __name__ == '__main__':
    app.run(debug=True)