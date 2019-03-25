#!/usr/bin/env bash

cd ${TRAVIS_BUILD_DIR}

quasar build
rm -rf ./docs/*
cp -R ./dist/spa/* ./docs
