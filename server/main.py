from flask import Flask
from flask_cors import CORS
from controllers import AppController

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

if __name__ == '__main__':
    appController = AppController()
    app.register_blueprint(appController.app_bp, url_prefix='/app')
    app.run(host='127.0.0.1', port=5000, debug=True)