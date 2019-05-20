#!/bin/bash

if [ ! -d /var/www/app/node_modules ]; then
  echo "~> installing dependencies"
  yarn install
fi

if [ ! -f /var/www/app/.docker/bin/node ]; then
  echo "~> expose bin"
  cp /usr/local/bin/node /var/www/app/.docker/bin/node
fi

echo "~> fix permissions"
chown -R node:node .

echo " :: Details: '$(pwd)' | '$(quasar -v)' :: "

echo "~> starting dev"
quasar dev
