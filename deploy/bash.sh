#!/bin/sh

# Author: unique.mo

echo "Start to deploy react-netease-music"

yarn build
scp -r ./dist/** root@106.52.241.181:/usr/share/nginx/html

echo "Successfully deploy react-netease-music"
