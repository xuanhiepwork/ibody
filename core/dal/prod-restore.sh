#!/bin/bash
cd "$(dirname $(realpath "$0"))"

rm -rf ./workdir
cp -rv ./prod/ ./workdir/
bash db_restore_structure.sh
bash db_restore_data.sh