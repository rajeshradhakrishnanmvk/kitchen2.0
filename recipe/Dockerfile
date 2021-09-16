### STAGE 1: Build ###
FROM node:alpine AS build
WORKDIR '/app'
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

### STAGE 2: Run ###
FROM nginx:alpine
COPY --from=build /app/dist/ /usr/share/nginx/html

#Copy default nginx configuration
COPY ./nginx.conf /etc/nginx/conf.d/default.conf