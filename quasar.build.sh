#!/usr/bin/env bash

quasar build
rm -rf /var/www/app/docs/*
cp -R /var/www/app/dist/spa/* /var/www/app/docs
rm -rf /var/www/app/dist/*
chown 1000:1000 . -R

