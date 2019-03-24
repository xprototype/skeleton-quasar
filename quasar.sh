#!/bin/bash

if [[ ! -d /var/www/app/node_modules ]]; then
  echo "~> installing dependencies"
  if [[ which yarn ]]; then
     yarn install
  else
    if [[ which npm ]]; then
       npm install
    fi
  fi
fi

if [[ ! -f /home/node/bin/node && -f /usr/local/bin/node ]]; then
  echo "~> expose bin"
  cp /usr/local/bin/node /home/node/bin/node
  echo "~> fix permissions"
  chown -R node:node .
fi

echo "Details: '$(pwd)' | '$(quasar -v)'"

echo "~> starting dev"
quasar $(cat /var/www/app/quasar.env)
