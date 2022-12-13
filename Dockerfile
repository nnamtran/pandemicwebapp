FROM node:alpine
COPY . /client
WORKDIR /client
CMD npm run start:frontend
EXPOSE 3000
