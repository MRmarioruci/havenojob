from wtforms import Form, StringField, validators

class JobForm(Form):
    candidate_job_title = StringField('candidate_job_title', validators=[validators.InputRequired()])
    candidate_profile = StringField('candidate_profile', validators=[validators.InputRequired()])
    job_title = StringField('job_title', validators=[validators.InputRequired()])
    job_description = StringField('job_description', validators=[validators.InputRequired()])