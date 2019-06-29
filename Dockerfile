FROM continuumio/miniconda3

USER root

ENV API_KEY=$API_KEY
ENV APP_SECRET=$APP_SECRET

RUN apt-get update
RUN apt-get -y install curl gnupg
RUN curl -sL https://deb.nodesource.com/setup_11.x  | bash -
RUN apt-get -y install nodejs

COPY ./requirements.txt /var/www/requirements.txt
RUN pip install -r /var/www/requirements.txt

COPY ./Python /Python
COPY ./Node /Node
COPY ./package.json /
COPY ./run.sh /

RUN npm install

CMD ["/run.sh"]
