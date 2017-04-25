FROM debian
MAINTAINER 'Martin Roldan Araujo <mroldan@webmonster.mx>'

RUN  apt-get update && \
     apt-get install -y libcairo2-dev libpoppler-qt5-dev curl

RUN curl -sL https://deb.nodesource.com/setup_7.x |  bash - && \
     apt-get install -y nodejs && \
     apt-get install -y build-essential 

WORKDIR /app

COPY . /app

RUN npm i

CMD ["npm", "start"]
 


