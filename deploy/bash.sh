#!/bin/sh

# Author: unique.mo

echo "Start to deploy react-netease-music"

yarn build
scp -r ./dist/** root@47.115.57.59:/usr/share/nginx/html

echo "Successfully deploy react-netease-music"
