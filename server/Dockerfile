FROM python:3.10.6

WORKDIR /havenojob-server
COPY . /havenojob-server

# Install & use pipenv
COPY Pipfile Pipfile.lock ./
RUN python -m pip install --upgrade pip
RUN pip install pipenv && pipenv install --dev --system --deploy

RUN pip install flask

ENV FLASK_APP main.py
EXPOSE 5000
CMD ["python", "main.py"]