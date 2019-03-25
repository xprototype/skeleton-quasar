#!/usr/bin/env bash

quasar build -m spa
rm -rf ./docs/*
cp -R ./dist/spa/* ./docs
