FROM minds/php:latest

RUN apk update && apk add --no-cache git && apk add nodejs

COPY containers/console/start.sh start.sh
ENTRYPOINT [ "sh", "./start.sh" ]