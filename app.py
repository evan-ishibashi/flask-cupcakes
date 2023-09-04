
import os

from flask import Flask, jsonify, request

from models import db, connect_db, Cupcake, DEFAULT_CUPCAKE_URL

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get(
    "DATABASE_URL", 'postgresql:///cupcakes')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

connect_db(app)

@app.get('/api/cupcakes')
def list_all_cupcake_data():
    """Returns JSON data for all cupcakes"""

    cupcakes = Cupcake.query.all()
    serialized = [c.serialize() for c in cupcakes]

    return jsonify(cupcakes=serialized)

@app.get('/api/cupcakes/<int:cupcake_id>')
def list_single_cupcake(cupcake_id):
    """Returns JSON data of single cupcake"""

    cupcake = Cupcake.query.get_or_404(cupcake_id)

    return jsonify(cupcake=cupcake.serialize())

@app.post("/api/cupcakes")
def create_cupcake():
    """Creates a cupcake and returns JSON data of that cupcake"""

    data = request.json

    new_cupcake = Cupcake(flavor=data["flavor"],
                          size=data["size"],
                          rating=data["rating"],
                          image_url=data["image_url"] or DEFAULT_CUPCAKE_URL)

    db.session.add(new_cupcake)
    db.session.commit()

    serialized = new_cupcake.serialize()

    return  (jsonify(cupcake=serialized), 201)