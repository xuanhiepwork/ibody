#!/bin/bash
cd "$(dirname $(realpath "$0"))"

# Init env
cp .env-template .env
nano .env

# Init database + working directory
bash ./dal/init.sh
bash ./dal/dev-restore.sh
