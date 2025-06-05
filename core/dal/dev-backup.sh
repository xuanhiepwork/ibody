#!/bin/bash
cd "$(dirname $(realpath "$0"))"


bash db_backup_data.sh
bash db_backup_structure.sh
rm -rf ./dev/
cp -rv ./workdir ./dev