FROM  node:10-alpine

RUN apk --update add openssh-client git

# https://www.npmjs.com/package/@vue/cli
# https://www.npmjs.com/package/@vue/cli-init
RUN npm install --global\
 vue-cli\
 @vue/cli@3.7.0\
 @vue/cli-init@3.7.0

# https://www.npmjs.com/package/@quasar/cli
# https://www.npmjs.com/package/http-server
RUN npm install --global\
 @quasar/cli@1.0.0-beta.7\
 http-server@0.11.1

RUN mkdir /home/node/app
USER root

# VOLUME [ "/home/node/app" ]
WORKDIR /home/node/app

CMD /bin/sh
