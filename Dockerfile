FROM node:7.10.0

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app/
RUN npm install

ENV PORT 4005
EXPOSE 4005
CMD [ "npm", "start" ]