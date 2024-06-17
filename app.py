from flask import Flask
from flask_cors import CORS
from loaders.route_methods import create_routes

app = Flask(__name__)
CORS(app, supports_credentials=True)  # Enable CORS for all routes

routes = [ '/api', '/api/todos' ]
create_routes(app, routes)

if __name__ == '__main__':
    app.run(port=4000, debug=True)
