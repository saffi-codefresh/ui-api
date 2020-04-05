FROM node:10.15.3
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY myapp/package.json /usr/src/app/
RUN npm install
COPY myapp /usr/src/app
EXPOSE 5000
CMD [ "npm", "start" ]