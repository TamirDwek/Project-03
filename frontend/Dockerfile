#packaging a dev env:
# FROM node:22-alpine 

# WORKDIR /app

# COPY ./package*.json ./

# RUN npm install

# COPY ./ ./

# ENV VITE_REST_SERVER_URL=http://host.docker.internal:3000

# CMD ["npm", "run", "dev"]

# CMD npm run dev 

# EXPOSE 3000

#packaging a production env:

FROM node:22-alpine as builder
WORKDIR /app
COPY ./package*.json ./
RUN npm install
COPY ./ ./
RUN npm run build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf *
COPY --from=builder /app/dist .
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
ENTRYPOINT [ "nginx", "-g" , "daemon off;" ]