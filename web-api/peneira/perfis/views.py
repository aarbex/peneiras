import json
from flask import Blueprint, abort
from flask_restful import Resource, Api, reqparse
from peneira.perfis.models import Perfil
from peneira import api, db


perfis = Blueprint('perfis', __name__)

parser = reqparse.RequestParser()
parser.add_argument('name', type=str)
parser.add_argument('price', type=float)


@perfis.route('/')
@perfis.route('/home')
def home():
    return "Welcome to the Perfil Home."


class PerfilApi(Resource):

    def get(self, id=None, page=1):
        if not id:
            perfis = Perfil.query.paginate(page, 10).items
        else:
            perfis = [Perfil.query.get(id)]
        if not perfis:
            abort(404)
        res = {}
        for perfil in perfis:
            res[perfil.id] = {
                'name': perfil.name
            }
        return json.dumps(res)

    def post(self):
        args = parser.parse_args()
        name = args['name']
        perfil = perfil(name)
        db.session.add(perfil)
        db.session.commit()
        res = {}
        res[product.id] = {
            'name': perfil.name
        }
        return json.dumps(res)


api.add_resource(
    PerfilApi,
    '/api/perfil',
    '/api/perfil/<int:id>',
    '/api/perfil/<int:id>/<int:page>'
)
