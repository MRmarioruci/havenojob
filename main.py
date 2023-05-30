from flask import Flask
""" from flask_socketio import SocketIO """
from flask_cors import CORS
from controllers import AppController

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
""" app.secret_key = 'ASDASD'
app.permanent_session_lifetime = timedelta(days=5)
socketio = SocketIO(app, cors_allowed_origins='*') """

if __name__ == '__main__':
    """ SessionLocal = Database().connect() """
    appController = AppController()
    app.register_blueprint(appController.app_bp, url_prefix='/app')
    app.run(host='127.0.0.1', port=5000, debug=True)
    """ socketio.run(app, host='127.0.0.1', port=5000, debug=False, use_reloader=True) """
