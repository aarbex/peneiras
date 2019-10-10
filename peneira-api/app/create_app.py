from flask import Flask
from flask_restful import Resource, Api
from flask_sqlalchemy import SQLAlchemy


def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
    db = SQLAlchemy(app)
    
    class Perfil(db.Model):
        id = db.Column(db.Integer, primary_key=True)
        nome = db.Column(db.String(20), unique=True, nullable=False)
        dtCadastro = db.Column(db.datetime(), unique=True, nullable=False)
        
        def __repr__(self):
            return '<Perfil %r>' % self.nome
        

    return app
