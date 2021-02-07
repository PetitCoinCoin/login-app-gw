from lib2to3.refactor import _identity

from flask_restful import Resource, reqparse
from flask_jwt_extended import (
  create_access_token, 
  create_refresh_token, 
  jwt_required, 
  jwt_refresh_token_required,
  get_jwt_identity, get_raw_jwt
)
import hashlib
from model import User, db

parser = reqparse.RequestParser()
parser.add_argument('email', help = 'Email is required', required = True)
parser.add_argument('password', help = 'Password is required', required = True)

class UserSignUp(Resource):
  def post(self):
    try:
      data = parser.parse_args()
      if User.query.filter(User.email==data['email']).first():
        return {"error" : "User already exists"}

      newUser = User(email=data['email'], password=hashlib.md5(data['password'].encode()).hexdigest())
      db.session.add(newUser)
      db.session.commit()

      access_token = create_access_token(identity=data['email'])
      refresh_token = create_refresh_token(identity=data['email'])
      return {
        'email': data['email'],
        'access_token': access_token,
        'refresh_token': refresh_token
      }, 200
    except:
      raise Exception()

class UserLogin(Resource):
  def post(self):
    try:
      data = parser.parse_args()
      current_user = User.query.filter(User.email==data['email']).first()

      if not current_user:
        return {"error":"User not in DB. Please sign up."}

      password = hashlib.md5(data['password'].encode()).hexdigest()
      if current_user.password == password :
        access_token = create_access_token(identity=data['email'])
        refresh_token = create_refresh_token(identity=data['email'])
        return {
          'email': current_user.email,
          'access_token': access_token,
          'refresh_token': refresh_token
        }, 200
      else:
        return {'error': 'Error: please check your password!'}
    except:
      raise Exception("Cannot login user")
