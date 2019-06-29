FROM continuumio/miniconda3

USER root

ENV API_KEY=$API_KEY
ENV APP_SECRET=$APP_SECRET

RUN pkg install node
COPY ./requirements.txt /var/www/requirements.txt
RUN pip install -r /var/www/requirements.txt

COPY ./Python /Python
COPY ./Node /Node
COPY ./package.json /

RUN sudo npm install
WORKDIR /Python/app

ENTRYPOINT ["python"]
CMD ["trump_api.py"]
