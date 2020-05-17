#!/bin/sh

# Author: unique.mo

echo "Start to deploy react-netease-music"

yarn build
cp -r ./dist/** /usr/share/nginx/html

echo "Successfully deploy react-netease-music"
