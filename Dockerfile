FROM node:10-alpine

RUN apk add --no-cache python3 python3-dev \
    curl \
    linux-headers build-base bash git ca-certificates && \
    python3 -m ensurepip && \
    rm -r /usr/lib/python*/ensurepip && \
    pip3 install --upgrade pip setuptools==45 && \
    if [ ! -e /usr/bin/pip ]; then ln -s pip3 /usr/bin/pip ; fi && \
    rm -r /root/.cache

RUN pip3 install hestia_earth.utils
RUN pip3 install pandas

ENV API_URL=https://api.hestia.earth
ENV WEB_URL=https://www.hestia.earth

WORKDIR /var/www/hestia
EXPOSE 4000

COPY --chown=nobody:nobody package.json .
COPY --chown=nobody:nobody package-lock.json .

RUN rm -rf node_modules/ && npm i --production

COPY --chown=nobody:nobody . .

CMD [ "/usr/local/bin/npm", \
    "--prefix", \
    "/var/www/hestia", \
    "start" ]



