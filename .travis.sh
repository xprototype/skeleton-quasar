#!/usr/bin/env bash

quasar build
rm -rf ./docs/*
cp -R ./dist/spa/* ./docs
