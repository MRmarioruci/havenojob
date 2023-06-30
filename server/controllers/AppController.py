from flask import Blueprint, request, jsonify, request
from dotenv import load_dotenv
from models import AppModel
from .validations import AppValidations
from werkzeug.datastructures import MultiDict
import utils
load_dotenv(dotenv_path="core/.env")
from core.database import Database

model = AppModel()
class AppController:
    def __init__(self) -> None:
        self.app_bp = Blueprint('app_blueprint', __name__)
        self.register_routes()

    def register_routes(self):
        self.app_bp.add_url_rule('/getJobMatch', view_func=self.getJobMatch, methods=['POST'])
        self.app_bp.add_url_rule('/getProfileSummary', view_func=self.getProfileSummary, methods=['POST'])
        self.app_bp.add_url_rule('/getJobSummary', view_func=self.getJobSummary, methods=['POST'])
        self.app_bp.add_url_rule('/preregister', view_func=self.preregister, methods=['POST'])
        self.app_bp.add_url_rule('/generateCoverLetter', view_func=self.generateCoverLetter, methods=['POST'])

    def getJobMatch(self):
        response = utils.getResponseDict()
        form = AppValidations.JobForm(MultiDict(request.json))
        if form.validate():
            candidate_job_title = form.candidate_job_title.data
            candidate_profile = form.candidate_profile.data
            job_title = form.job_title.data
            job_description = form.job_description.data
            summarize_profile = form.summarize_profile.data
            summarize_job = form.summarize_job.data

            print('Received job match request')
            response = model.getJobMatch(candidate_job_title, candidate_profile, job_title, job_description, summarize_profile, summarize_job)
        else:
            response['data'] = form.errors

        return jsonify(response)
    
    def getProfileSummary(self):
        response = utils.getResponseDict()
        form = AppValidations.ProfileForm(MultiDict(request.json))
        if form.validate():
            candidate_job_title = form.candidate_job_title.data
            candidate_profile = form.candidate_profile.data
            print('Received profile request')
            response = model.generateProfileSummary(candidate_job_title, candidate_profile)
        else:
            response['data'] = form.errors

        return jsonify(response)
    
    def getJobSummary(self):
        response = utils.getResponseDict()
        form = AppValidations.JobSummaryForm(MultiDict(request.json))
        if form.validate():
            job_title = form.job_title.data
            job_description = form.job_description.data
            print('Received job summary request')
            response = model.generateJobDescriptionSummary(job_title, job_description)
        else:
            response['data'] = form.errors

        return jsonify(response)

    def preregister(self):
        print('I am here')
        response = utils.getResponseDict()
        form = AppValidations.Preregister(MultiDict(request.json))
        SessionLocal = Database().connect()
        if form.validate():
            email = form.email.data
            response['data'] = True
            response['status'] = 'ok'
        else:
            response['data'] = form.errors

        return jsonify(response)
    
    def generateCoverLetter(self):
        response = utils.getResponseDict()
        form = AppValidations.CoverLetter(MultiDict(request.json))
        if form.validate():
            job_title = form.job_title.data
            company = form.company.data
            candidate_profile = form.candidate_profile.data
            extraInstructions = form.extraInstructions.data
            response = model.generateCoverLetter(job_title, company, candidate_profile, extraInstructions)
        else:
            response['data'] = form.errors

        return jsonify(response)