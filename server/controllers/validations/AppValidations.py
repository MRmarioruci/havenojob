from wtforms import Form, StringField, validators, BooleanField

class JobForm(Form):
    candidate_job_title = StringField('candidate_job_title', validators=[validators.InputRequired()])
    candidate_profile = StringField('candidate_profile', validators=[validators.InputRequired()])
    job_title = StringField('job_title', validators=[validators.InputRequired()])
    job_description = StringField('job_description', validators=[validators.InputRequired()])
    summarize_profile = BooleanField('summarize_profile', validators=[])
    summarize_job = BooleanField('summarize_job', validators=[])

class ProfileForm(Form):
    candidate_job_title = StringField('candidate_job_title', validators=[validators.InputRequired()])
    candidate_profile = StringField('candidate_profile', validators=[validators.InputRequired()])

class JobSummaryForm(Form):
    job_title = StringField('job_title', validators=[validators.InputRequired()])
    job_description = StringField('job_description', validators=[validators.InputRequired()])

class Preregister(Form):
    email = StringField('email', validators=[validators.InputRequired()])

class CoverLetter(Form):
    job_title = StringField('job_title', validators=[validators.InputRequired()])
    company = StringField('company', validators=[validators.InputRequired()])
    candidate_profile = StringField('candidate_profile', validators=[])
    extraInstructions = StringField('extraInstructions', validators=[])