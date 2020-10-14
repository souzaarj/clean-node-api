FROM node:12
WORKDIR /usr/src/clean-node-api
COPY ./package.json .
RUN npm install --only=prod
# RUN npm install -g pm2

# removido por utilizar o compose
# COPY ./dist ./dist
# EXPOSE 5000
# CMD npm start