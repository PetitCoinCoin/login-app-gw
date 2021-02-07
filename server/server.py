import sys

from flask import Flask, jsonify, render_template
from flask_cors import CORS, cross_origin
from flask_restful import Api
from flask_jwt_extended import JWTManager

from model import User, db, init_db
import resources

app = Flask(__name__,
  static_folder='../ui/build/static',
  template_folder="../ui/build"
)
api = Api(app)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

app.config['JWT_SECRET_KEY'] = 'plip-plop-ploup'
jwt=JWTManager(app)


@cross_origin
@app.route('/', defaults={'u_path': ''})
@app.route('/<path:u_path>')
def index(u_path=None):
    return render_template("index.html")

api.add_resource(resources.UserSignUp, '/sign-up')
api.add_resource(resources.UserLogin, '/login')

if __name__ == "__main__":
  args = sys.argv[1:]
  if args:
    if 'db' in args:
      init_db()
    
  app.debug = True
  app.run(host='localhost', port=5000)
