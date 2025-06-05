#!/bin/bash
cd "$(dirname $(realpath "$0"))"

# Init env
cp .env-template .env
nano .env

# Init database + working directory
bash ./dal/init.sh
bash ./dal/dev-restore.sh

# Install nodejs
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
\. "$HOME/.nvm/nvm.sh"
nvm install 22
npm config set script-shell /bin/bash

# Install Node.js packages and dependencies
npm i
