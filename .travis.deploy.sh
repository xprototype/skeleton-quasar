#!/usr/bin/env bash

cd ${TRAVIS_BUILD_DIR}

cp .env.js.develop .env.js
quasar build
rm -rf ./docs/*
cp -R ./dist/spa/* ./docs
