#!/bin/bash
cd "$(dirname $(realpath "$0"))"
pushd .. > /dev/null 2>&1
source .env
popd > /dev/null 2>&1
