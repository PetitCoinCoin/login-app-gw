from flask import Flask
from flask_sqlalchemy import SQLAlchemy

import hashlib

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/users.db'
db = SQLAlchemy(app)

def init_db():
  """Set up the database."""
  db.drop_all()
  db.create_all()
  # For testing purpose: add a user
  pwd = hashlib.md5('gr00t'.encode()).hexdigest()
  groot = User(email='groot@yopmail.com', password=pwd)
  db.session.add(groot)
  db.session.commit()


class User(db.Model):
  email = db.Column(db.String(120), primary_key=True)
  password = db.Column(db.String(30), nullable=False)

  def __repr__(self):
    return '<User {}>'.format(self.email)
