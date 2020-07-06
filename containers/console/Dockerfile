FROM minds/php:7.3

RUN apk update

COPY containers/console/start.sh start.sh
ENTRYPOINT [ "sh", "./start.sh" ]