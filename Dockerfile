FROM node:latest AS build

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:latest

COPY --from=build /usr/src/app/dist/kb_p /usr/share/nginx/html

EXPOSE 80
