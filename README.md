* touch .env
* cd mysql
* mkdir data
* mkdir initdb.d

* /.env
  * ENV=development

**start project**
* docker-compose up --build
  * swagger documentation = http://localhost:3000/docs/

**compose cmd**
* docker image prune
* docker volume prune
* docker system prune -af