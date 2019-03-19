FROM  node:alpine

RUN apk --update add openssh-client git

# https://www.npmjs.com/package/@vue/cli
# https://www.npmjs.com/package/@vue/cli-init
RUN npm install -g vue-cli && \
    npm install -g @vue/cli@3.4.1 && \
    npm install -g @vue/cli-init@3.4.1

# https://www.npmjs.com/package/@quasar/cli
# https://www.npmjs.com/package/http-server
RUN npm install --global\
 @quasar/cli@1.0.0-beta.3\
 http-server@0.11.1

RUN mkdir /home/node/app
USER root

# VOLUME [ "/home/node/app" ]
WORKDIR /home/node/app

CMD /bin/sh
