FROM continuumio/miniconda3

USER root

ENV API_KEY=$API_KEY
ENV APP_SECRET=$APP_SECRET

COPY ./requirements.txt /var/www/requirements.txt
RUN pip install -r /var/www/requirements.txt

COPY ./app /app
WORKDIR /app

RUN export FLASK_APP=trump_api.py

ENTRYPOINT ["python"]
CMD ["trump_api.py"]
