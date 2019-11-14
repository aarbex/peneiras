from peneira import db


class Perfil(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(20))

    def __init__(self, nome):
        self.nome = nome

    def __repr__(self):
        return '<Perfil %d>' % self.nome
