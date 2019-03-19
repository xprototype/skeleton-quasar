#!/bin/bash

if [ ! -d /var/www/app/node_modules ]; then
  echo "~> installing dependencies"
  if npm install 2>/dev/null; then
     npm install
  else
     yarn install
fi

if [ ! -f /home/node/bin/node ]; then
  echo "~> export bin"
  cp /usr/local/bin/node /home/node/bin/node
  echo "~> fix permissions"
  chown -R node:node .
fi

echo "Details: '$(pwd)' | '$(quasar -v)'"

echo "~> starting dev"
quasar $(cat /var/www/app/quasar.sh.env)
