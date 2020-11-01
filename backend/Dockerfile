FROM node:12-alpine

RUN mkdir -p /home/node/m5server/node_modules && chown -R node:node /home/node/m5server

WORKDIR /home/node/m5server

COPY package*.json ./

# FOR node gyp stuff
#  add libraries; sudo so non-root user added downstream can get sudo
    RUN apk add --no-cache \
        sudo \
        curl \
        build-base \
        g++ \
        libpng \
        libpng-dev \
        jpeg-dev \
        pango-dev \
        cairo-dev \
        giflib-dev \
        python \
        ;

    #  add glibc and install canvas
    RUN apk --no-cache add ca-certificates wget  && \
        wget -q -O /etc/apk/keys/sgerrand.rsa.pub https://alpine-pkgs.sgerrand.com/sgerrand.rsa.pub && \
        wget https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.29-r0/glibc-2.29-r0.apk && \
        apk add glibc-2.29-r0.apk && \
        npm install canvas@2.5.0

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 6464

CMD ["node", "src/app.js"]