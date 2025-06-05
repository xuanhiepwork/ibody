#!/bin/bash
source ./env.rsc

mkdir -p ./workdir
mkdir -p ./workdir/attachments
mkdir -p ./workdir/cache

mkdir -p ./prod
mkdir -p ./dev

# Install mysql
sudo apt -y install mysql-server mysql-client
w