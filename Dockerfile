# Force rebuild - version2
FROM node:20-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine
# Changement ici pour casser le cache : on définit le port AVANT de copier les fichiers
RUN sed -i 's/listen  80;/listen 8080;/g' /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]