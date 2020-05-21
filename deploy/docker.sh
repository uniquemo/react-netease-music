#!/bin/sh
CURRENT_VERSION=$(node -p "require('./package.json').version")
PKG_NAME=$(node -p "require('./package.json').name")
IMAGE_NAME="$PKG_NAME:$CURRENT_VERSION"
CONTAINER_NAME="container-$PKG_NAME-$CURRENT_VERSION"
echo $CURRENT_VERSION
echo $PKG_NAME
echo $IMAGE_NAME
echo $CONTAINER_NAME

# 生成docker image
docker image build -t $IMAGE_NAME .

# 停止运行在8080端口的container
# https://stackoverflow.com/questions/56936858/can-i-stop-a-docker-container-by-its-exposed-port
for id in $(docker ps -q)
do
  if [[ $(docker port "${id}") == *"8080"* ]]; then
    echo "stopping container ${id}"
    docker container stop "${id}"
    docker container rm "${id}"
  fi
done

# 运行docker container
docker container run -d --name $CONTAINER_NAME -p 8080:80 $IMAGE_NAME

