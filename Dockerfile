# PATCHUISTE REDIS_UL
# FROM redis:latest as redis
# WORKDIR /redis
# COPY ./assets/redis/redis.conf /usr/local/etc/redis/redis.conf
# COPY ./assets/redis/init.sh ./
# RUN chmod +x init.sh

FROM node:latest as base
#Argument that is passed from docer-compose.yaml file
ARG FRONT_END_PORT

# construiește nivelul de dezvoltare
FROM base as devel
ENV NODE_ENV=development
WORKDIR /redcolector
# USER node
RUN npm install -g npm && npm install -g nodemon
COPY ./package*.json ./
RUN npm install
# USER node
COPY . ./
EXPOSE ${FRONT_END_PORT}

# construiește nivelul de producție
FROM base as prod
ENV NODE_ENV=production
WORKDIR /home/node/redcolector
RUN apt-get update && apt-get install -y git
RUN chown -R node:node /redcolector
# Truc pentru copierea și a lui package-locked
COPY --chown=node:node ./package*.json ./
USER node
COPY --chown=node:node . ./
# folosește `npm ci` pentru a instala pachetele din package-lock.json
RUN npm ci && npm cache clean --force
EXPOSE ${FRONT_END_PORT}
CMD ["npm", "run", "start"]

# https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md
# https://www.freecodecamp.org/news/the-docker-handbook/

# Construieste un container după imagine
# docker run -d --name redcolector nume_imagine_noua

## Sincronizeaza directoarele de lucru folosind un volum bind mount
## docker run -v pathonlocal:pathoncontainer -p 8080:8080 -d name nume_container nume_imagine
# docker run -v /home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector:/var/www/redcolector -p 8080:8080 -d name nume_container nume_imagine
# docker run -v $(pwd):/var/www/redcolector -p 8080:8080 -d name nume_container nume_imagine
## Windows command
# docker run -v %cd%:/var/www/redcolector -p 8080:8080 -d name nume_container nume_imagine
## Windows PowerShell
# docker run -v ${pwd}:/var/www/redcolector -p 8080:8080 -d name nume_container nume_imagine