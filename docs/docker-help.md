# Asistență în lucrul cu Docker

https://r-future.github.io/post/how-to-fix-redis-warnings-with-docker/


## Erori unhealthy

Dacă ai erori de tipul
ERROR: for redcolectordevel  Container "64467f7e2e99" is unhealthy.
ERROR: Encountered errors while bringing up the project.

Verifică folosind docker-compose ps pentru a vedea starea tuturor containerelor active
Poți investiga fiecare container individual cu:

```bash
docker inspect --format "{{json .State.Health }}" nume_container_sau_id  | jq
```

sau

```bash
docker inspect --format "{{json .State.Health }}" $(docker-compose ps -q) | jq
```

docker-compose up in the first terminal window, and docker-compose logs -f in another. This will display all logs from docker-compose-managed containers.


## Erori de citire

Și dacă ai o eroare de citire de socket:
Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Get http://%2Fvar%2Frun%2Fdocker.sock/v1.24/containers/64467f7e2e99/json: dial unix /var/run/docker.sock: connect: permission denied

Atunci e o groblemă pentru că folosești docker drept root!!!
Vezi: https://docs.docker.com/engine/install/linux-postinstall/
Vezi: https://www.digitalocean.com/community/questions/how-to-fix-docker-got-permission-denied-while-trying-to-connect-to-the-docker-daemon-socket

```bash
sudo groupadd docker
groupadd: group 'docker' already exists

sudo usermod -aG docker $USER
```

## Multistage build

https://docs.docker.com/develop/develop-images/multistage-build/

```bash
docker-compose up -d
docker-compose down
```

## Șterge și volumele
docker-compose down -v

## Cand modifici lucruri în aplicație trebuie să reconstruiești imaginea
docker-compose up --buid -d

## pornește doar aplicația node fără dependințe

docker compose -f docker-compose.yml up -d --no-deps redcolector
sau
docker compose -f docker-compose.yml up -d --no-deps redcolectordevel

## Ridică două instanțe ale aplicației

#docker compose -f docker-compose.yml up -d redcolectordevel=2

## Cand modifici aplicatia sau configurările, pentru a nu mai face docker-compose down, apoi build

docker-compose -f docker-compose.yml up -d --build -V redcolectordevel=2

-V este pentru a șterge volumele anonime in care sunt, de fapt `node_modules`

## Dacă ai modificări doar pe un anumit serviciu, nu-i nevoie sa dai comanda pentru build toate imaginile. Poți doar pentru respectivul serviciu

docker-compose -f docker-compose.yml up -d --build --no-deps -V nume_serviciu

## Push doar pentru un singur serviciu

docker-compose -f docker-compose.yml push nume_serviciu

## Pull imagine

docker-compose -f docker-compose.yml pull

Nu uita că în momentul în care docker-compose simte o noua imagine, va recrea containerul în baza acesteia

## Pull doar pentru un anumit serviciu, nu pentru toate serviciile/serverele

docker-compose -f docker-compose.yml pull --no-deps nume_serviciu

## Pentru că în timp se acumulează volumele anonime necesare Node.js, va trebui să pornești serviciile și în spate

docker-compose volume prune 

Atenție, va șterge toate volumele care nu sunt în uz!!! ATENȚIE MARE!!!

## Conectarea la baza de date direct

docker run -p "27017:27017" -d --name mongo mongo
docker-compose exec mongo redcolector

## Desfacerea serviciilor

docker-compose -f docker-compose.yml -f docker-compose-development.yml down -v --remove-orphans

## Ridicarea serviciilor

docker-compose -f docker-compose.yml -f docker-compose-development.yml up -d --build

## Urmărește loguri

docker-compose logs -f

docker-compose logs -f nume_serviciu

## REMOVE ALL

docker system prune -a

https://www.digitalocean.com/community/tutorials/how-to-remove-docker-images-containers-and-volumes
https://docs.docker.com/compose/startup-order/

## Console in container

docker exec -it nginx /bin/bash

## Tatarea erorilor

### WARNING: Host is already in use by another container

Vezi care sunt containerele deja în sistem

docker ps -a

Apoi le elimini cu

docker rm nume_container

Dacă nu merge, alegi eliminarea forțată 

docker rm -f nume_container

Sau poți folosi și 

docker container prune -f