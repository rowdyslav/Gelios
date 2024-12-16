FROM node:alpine AS development
ENV NODE_ENV=development
WORKDIR /react-app
COPY ./package*.json /react-app

RUN npm install
RUN npm install -g serve
COPY . .
RUN npm run build

EXPOSE 80
CMD ["serve","-s","build","-p","80"]