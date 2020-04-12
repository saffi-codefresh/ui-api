FROM node:10.15.3
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY myapp/package.json /usr/src/app/
COPY myapp /usr/src/app
RUN yarn install
RUN yarn add jest --ignore-engines
EXPOSE 5000

CMD [ "npm", "start" ]
