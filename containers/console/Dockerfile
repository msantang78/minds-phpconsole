FROM minds/php:latest

RUN apk update

COPY containers/console/start.sh start.sh
ENTRYPOINT [ "sh", "./start.sh" ]