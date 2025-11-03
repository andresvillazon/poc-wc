# Etapa 1: Construcción de la aplicación Angular
FROM node:18 AS build-stage

ARG CDN_URL=https://keifidev.tressis0.com/ms-front-asesoramiento-propuestas/
ENV CDN_URL=$CDN_URL

WORKDIR /app


COPY package.json ./

RUN npm install --omit=dev

RUN npm install -g @angular/cli
RUN npm install ngx-build-plus --save

COPY . .
RUN npm list ngx-build-plus
RUN npm run build:wc-pdn

RUN npm run postbuild

RUN echo "Verificando contenido del directorio de salida:"
RUN find /app/dist -type f | sort

# Etapa 2: Servir la aplicación con Nginx
FROM nginx:alpine AS runtime-stage
WORKDIR /usr/share/nginx/html

# Copiar los archivos de la aplicación

COPY --from=build-stage /app/dist/bundle /usr/share/nginx/html
RUN chmod -R 755 /usr/share/nginx/html

# Copiar archivo de configuración de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Verificar el contenido del archivo de configuración
RUN cat /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
