FROM mysql:latest

ENV MYSQL_DATABASE='Auth'
ENV MYSQL_USER='user'
ENV MYSQL_PASSWORD='password'
ENV MYSQL_ROOT_PASSWORD='password'

#Colocar o script de inicializacao dentro da pasta para o efeito
COPY ./init.sql /docker-entrypoint-initdb.d/