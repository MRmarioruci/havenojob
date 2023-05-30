from flask import Blueprint, request, jsonify, request
from dotenv import load_dotenv
from models import AppModel
from .validations import AppValidations
from werkzeug.datastructures import MultiDict
import utils
load_dotenv(dotenv_path="core/.env")

model = AppModel()
class AppController:
    def __init__(self) -> None:
        self.app_bp = Blueprint('app_blueprint', __name__)
        self.register_routes()

    def register_routes(self):
        self.app_bp.add_url_rule('/getJobMatch', view_func=self.getJobMatch, methods=['POST'])

    def getJobMatch(self):
        response = utils.getResponseDict()
        form = AppValidations.JobForm(MultiDict(request.json))
        if form.validate():
            candidate_job_title = form.candidate_job_title.data
            candidate_profile = form.candidate_profile.data
            job_title = form.job_title.data
            job_description = form.job_description.data
            print('Received job match request')
            response = model.getJobMatch(candidate_job_title, candidate_profile, job_title, job_description)
        else:
            response['data'] = form.errors

        return jsonify(response)