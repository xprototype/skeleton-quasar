#!/usr/bin/env bash

echo pwd
quasar build
rm -rf ./docs/*
cp -R ./dist/spa/* ./docs
