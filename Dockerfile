# Stage 1
FROM node:16 as react-build
WORKDIR /app
COPY . ./
COPY ./prod.env ./.env
RUN yarn
RUN yarn build

# Stage 2 - the production environment
FROM nginx:alpine
COPY --from=react-build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]