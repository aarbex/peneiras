from peneira.perfis.views import perfis
from flask_restful import Api
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
api = Api(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
db = SQLAlchemy(app)

app.register_blueprint(perfis)

db.create_all()
