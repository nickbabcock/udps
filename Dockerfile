FROM node:8
COPY . /site
WORKDIR /site
RUN npm install && npm run build

FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=0 /site/dist /usr/share/nginx/html
VOLUME /usr/share/nginx/html/data
