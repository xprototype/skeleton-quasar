#!/usr/bin/env bash

cd ${TRAVIS_BUILD_DIR}

cp .env.js.stage .env.js
quasar build

cp -R ./dist/spa/* ./

rm -rf ./.bin
rm -rf ./.docker
rm -rf ./.quasar
rm -rf ./dist
rm -rf ./docs
rm -rf ./node_modules
rm -rf ./src
rm -rf ./src-pwa
rm -rf ./test
rm -rf ./.babelrc
rm -rf ./.dockerize
rm -rf ./.editorconfig
rm -rf ./.env.js
rm -rf ./.env.js.develop
rm -rf ./.env.js.production
rm -rf ./.env.js.stage
rm -rf ./.eslintignore
rm -rf ./.eslintrc.js
rm -rf ./.gitignore
rm -rf ./.postcssrc.js
rm -rf ./.stylintrc
rm -rf ./.travis.deploy.sh
rm -rf ./.travis.yml
rm -rf ./babel.config.js
rm -rf ./cypress.json
rm -rf ./docker-compose.yml
rm -rf ./docker-compose.yml.develop
rm -rf ./jest.config.js
rm -rf ./LICENSE
rm -rf ./package.json
rm -rf ./quasar.build.sh
rm -rf ./quasar.conf.js
rm -rf ./quasar.env
rm -rf ./quasar.env.example
rm -rf ./quasar.extensions.json
rm -rf ./quasar.sh
rm -rf ./quasar.testing.json
rm -rf ./README.md
rm -rf ./wallaby.js
rm -rf ./yarn.lock
